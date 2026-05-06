#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const ANALYSIS_FILE = path.resolve(projectRoot, './ai-analysis/components-analysis.json');
const REACT_OUTPUT_DIR = path.resolve(projectRoot, './src/components');
const STATE_FILE = path.resolve(projectRoot, './ai-analysis/generation-state.json');

// إعدادات
const CHECKPOINT_SIZE = 5; // توقف بعد كل 5 مكونات
const PROMPT_TEMPLATE_FILE = path.resolve(projectRoot, './ai-analysis/prompt-template.md');

/**
 * 🤖 نظام الجيل الذكي مع Claude Code + Codex
 */

class ClaudeIntegratedGenerator {
  constructor() {
    this.analysis = null;
    this.state = this.loadState();
    this.components = [];
    this.currentLevel = 1;
    this.generatedComponents = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * تحميل حالة التقدم
   */
  loadState() {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    }
    return {
      generatedComponents: [],
      currentLevel: 1,
      totalProgress: 0,
      lastUpdated: null,
      checkpoints: {}
    };
  }

  /**
   * حفظ حالة التقدم
   */
  saveState() {
    this.state.lastUpdated = new Date().toISOString();
    fs.writeFileSync(STATE_FILE, JSON.stringify(this.state, null, 2));
  }

  /**
   * تحميل التحليل
   */
  loadAnalysis() {
    if (!fs.existsSync(ANALYSIS_FILE)) {
      console.error('❌ لم يتم العثور على ملف التحليل');
      process.exit(1);
    }
    this.analysis = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf-8'));
  }

  /**
   * السؤال التفاعلي
   */
  async ask(question) {
    return new Promise(resolve => {
      this.rl.question(question, answer => {
        resolve(answer.toLowerCase().trim());
      });
    });
  }

  /**
   * بدء العملية
   */
  async start() {
    console.clear();
    console.log('🤖 نظام الجيل الذكي - Claude Code + Codex Integration\n');
    console.log('=' .repeat(50) + '\n');

    this.loadAnalysis();
    
    // معرفة من أين تبدأ
    console.log(`📊 التقدم الحالي:`);
    console.log(`   Level المكتمل: ${this.state.currentLevel - 1}`);
    console.log(`   مكونات مكتملة: ${this.state.generatedComponents.length}`);
    console.log(`   إجمالي المكونات: ${this.analysis.components.length}\n`);

    const continueFromCurrent = await this.ask('هل تريد الاستمرار من نفس المكان؟ (ن/لا): ');
    
    if (continueFromCurrent === 'لا' || continueFromCurrent === 'no') {
      const resetAnswer = await this.ask('إعادة تعيين من البداية؟ (ن/لا): ');
      if (resetAnswer === 'ن' || resetAnswer === 'yes') {
        this.state = {
          generatedComponents: [],
          currentLevel: 1,
          totalProgress: 0,
          lastUpdated: null,
          checkpoints: {}
        };
      }
    }

    // بدء الجيل
    await this.generateByLevels();
  }

  /**
   * الجيل حسب المستويات
   */
  async generateByLevels() {
    for (let level = this.state.currentLevel; level <= 4; level++) {
      console.log('\n' + '='.repeat(50));
      console.log(`\n🏗️  Level ${level} - المكونات\n`);

      const levelComponents = this.analysis.components
        .filter(c => c.level === level)
        .filter(c => !this.state.generatedComponents.includes(c.name));

      if (levelComponents.length === 0) {
        console.log(`✅ جميع مكونات Level ${level} مكتملة\n`);
        continue;
      }

      console.log(`📝 عدد المكونات: ${levelComponents.length}\n`);

      // معالجة بـ checkpoints
      for (let i = 0; i < levelComponents.length; i += CHECKPOINT_SIZE) {
        const batch = levelComponents.slice(i, i + CHECKPOINT_SIZE);
        await this.processBatch(batch, level, i / CHECKPOINT_SIZE + 1);
      }

      this.state.currentLevel = level + 1;
      this.saveState();
    }

    console.log('\n' + '='.repeat(50));
    console.log('\n🎉 تم إنهاء جيل جميع المكونات!\n');
    this.printFinalSummary();
    this.rl.close();
  }

  /**
   * معالجة دفعة من المكونات
   */
  async processBatch(batch, level, batchNumber) {
    console.log(`\n📦 Checkpoint ${batchNumber}: ${batch.length} مكونات`);
    console.log(`   المكونات: ${batch.map(c => c.name).join(', ')}\n`);

    // خطوة 1: Claude Code - التخطيط
    console.log('🔵 Claude Code - المرحلة الأولى: التخطيط\n');
    await this.claudeCodePlan(batch, level);

    // خطوة 2: موافقة المستخدم
    const approve = await this.ask('\n✅ هل تريد الاستمرار مع Codex؟ (ن/لا): ');
    
    if (approve !== 'ن' && approve !== 'yes') {
      console.log('⏸️  تم الإيقاف المؤقت');
      this.saveState();
      return;
    }

    // خطوة 3: Codex - الكتابة
    console.log('\n🟢 Codex - المرحلة الثانية: كتابة الكود\n');
    await this.generateWithCodex(batch, level);

    // خطوة 4: Validation
    console.log('\n🟡 التحقق من الجودة\n');
    await this.validateGenerated(batch);

    // إضافة للقائمة المكتملة
    batch.forEach(comp => {
      if (!this.state.generatedComponents.includes(comp.name)) {
        this.state.generatedComponents.push(comp.name);
      }
    });

    this.saveState();

    // السؤال عن الاستمرار
    console.log(`\n📊 تم: ${this.state.generatedComponents.length}/${this.analysis.components.length}`);
    const continueQuestion = await this.ask('\nهل تريد الاستمرار للـ checkpoint التالي؟ (ن/لا): ');
    
    if (continueQuestion !== 'ن' && continueQuestion !== 'yes') {
      console.log('\n⏹️  تم الحفظ والتوقف');
      this.saveState();
      this.rl.close();
      process.exit(0);
    }
  }

  /**
   * Claude Code - مرحلة التخطيط
   */
  async claudeCodePlan(batch, level) {
    const plan = {
      timestamp: new Date().toISOString(),
      level,
      components: batch.map(c => ({
        name: c.name,
        props: c.props.length,
        slots: c.slots.length,
        emits: c.emits.length
      })),
      files_to_create: batch.length * 5, // jsx, scss, stories, test, index
      estimated_tokens: batch.length * 1500
    };

    console.log('📋 الخطة:');
    console.log(`   عدد المكونات: ${batch.length}`);
    console.log(`   عدد الملفات: ${plan.files_to_create}`);
    console.log(`   تقدير التوكنز: ${plan.estimated_tokens}`);
    
    // حفظ الخطة
    const planFile = path.join(projectRoot, './ai-analysis', `plan-level${level}-batch${Math.random().toString(36).substr(2, 9)}.json`);
    fs.writeFileSync(planFile, JSON.stringify(plan, null, 2));
    
    console.log(`\n💾 تم حفظ الخطة في: ${planFile}`);
    console.log('\n🔍 في هذه النقطة، Claude Code يفحص الخطة ويتأكد من صحتها');
    console.log('   ⚠️  تحقق من نافذة Claude Code في VS Code');
  }

  /**
   * Codex - مرحلة الكتابة
   */
  async generateWithCodex(batch, level) {
    // إنشاء prompt
    const prompt = this.generatePrompt(batch, level);
    
    // حفظ الـ prompt
    const promptFile = path.join(projectRoot, './ai-analysis', `codex-prompt-${Date.now()}.md`);
    fs.writeFileSync(promptFile, prompt);
    
    console.log('📝 Prompt جاهز:\n');
    console.log(prompt.substring(0, 500) + '...\n');
    
    console.log('🔗 انسخ الـ prompt أدناه والصقه في Codex:\n');
    console.log('=' .repeat(50));
    console.log(prompt);
    console.log('=' .repeat(50) + '\n');
    
    // انتظر إدخال Codex
    const codexResponse = await this.ask('بعد أن ينتج Codex الكود، أدخل المسار أو اضغط Enter للمتابعة: ');
    
    // معالجة الملفات المنشأة
    batch.forEach(comp => {
      this.createComponentStructure(comp, level);
    });
    
    console.log('\n✅ تم إنشاء هيكل المكونات');
  }

  /**
   * إنشاء هيكل المكون
   */
  createComponentStructure(component, level) {
    const componentFolder = path.join(
      REACT_OUTPUT_DIR,
      `Level${level}`,
      component.name
    );

    if (!fs.existsSync(componentFolder)) {
      fs.mkdirSync(componentFolder, { recursive: true });
    }

    // إنشاء الملفات الأساسية
    this.createComponentFiles(componentFolder, component, level);
  }

  /**
   * إنشاء ملفات المكون
   */
  createComponentFiles(folderPath, component, level) {
    const propsCode = component.props
      .map(p => `  ${p.name}${p.required ? '' : '?'}: ${p.type}`)
      .join(',\n');

    const jsxCode = `import React from 'react';
import styles from './${component.name}.module.scss';

interface ${component.name}Props {
${propsCode}
}

export const ${component.name}: React.FC<${component.name}Props> = ({
  ${component.props.map(p => p.name).join(', ')}
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون من Codex */}
    </div>
  );
};

${component.name}.displayName = '${component.name}';
export default ${component.name};
`;

    fs.writeFileSync(path.join(folderPath, `${component.name}.jsx`), jsxCode);
    fs.writeFileSync(path.join(folderPath, `${component.name}.module.scss`), `/* TODO */`);
    fs.writeFileSync(path.join(folderPath, `${component.name}.stories.jsx`), `/* TODO */`);
    fs.writeFileSync(path.join(folderPath, `${component.name}.test.jsx`), `/* TODO */`);
    fs.writeFileSync(path.join(folderPath, 'index.js'), `export { ${component.name} } from './${component.name}';\nexport { default } from './${component.name}';\n`);
  }

  /**
   * التحقق من الجودة
   */
  async validateGenerated(batch) {
    console.log('🔍 التحقق من:\n');
    
    batch.forEach(comp => {
      const folderPath = path.join(REACT_OUTPUT_DIR, `Level${comp.level}`, comp.name);
      const files = fs.readdirSync(folderPath);
      console.log(`   ✓ ${comp.name}: ${files.length} ملفات`);
    });
  }

  /**
   * توليد الـ prompt
   */
  generatePrompt(batch, level) {
    const componentsJson = batch.map(c => ({
      name: c.name,
      props: c.props.map(p => `${p.name}: ${p.type}`),
      slots: c.slots,
      emits: c.emits
    }));

    return `# Codex Generation Task

## مهمة: توليد مكونات React

### المستوى: Level ${level}
### عدد المكونات: ${batch.length}

### المكونات:
\`\`\`json
${JSON.stringify(componentsJson, null, 2)}
\`\`\`

### التعليمات:

لكل مكون:
1. أنشئ ملف \`.jsx\` يحتوي على المكون الرئيسي
2. أنشئ ملف \`.module.scss\` للـ styling
3. أنشئ ملف \`.stories.jsx\` لـ Storybook
4. أنشئ ملف \`.test.jsx\` للاختبار

### Format:

\`\`\`json
{
  "components": {
    "[ComponentName]": {
      "jsx": "...code...",
      "scss": "...code...",
      "stories": "...code...",
      "test": "...code..."
    }
  }
}
\`\`\`

### المتطلبات:
- استخدم TypeScript interfaces
- أضف PropTypes
- اتبع Best Practices
- اترك TODOs للتطبيق الكامل
- بدون شروحات طويلة، فقط الكود

### الملفات المراد إنشاؤها:
${batch.map(c => `- ${c.name}/${c.name}.jsx, .scss, .stories.jsx, .test.jsx`).join('\n')}
`;
  }

  /**
   * ملخص نهائي
   */
  printFinalSummary() {
    console.log('\n📊 ملخص البناء النهائي:');
    console.log(`\n   ✅ إجمالي المكونات المكتملة: ${this.state.generatedComponents.length}`);
    console.log(`   ✅ الملفات المنشأة: ${this.state.generatedComponents.length * 5}`);
    console.log(`\n   📁 الموقع: ${REACT_OUTPUT_DIR}`);
    console.log('\n🎉 تم بنجاح!\n');
  }
}

// التشغيل
const generator = new ClaudeIntegratedGenerator();
await generator.start();