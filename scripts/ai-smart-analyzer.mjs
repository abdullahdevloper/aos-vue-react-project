#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const ANALYSIS_FILE = path.resolve(projectRoot, './ai-analysis/components-analysis.json');

/**
 * 🧠 محلل ذكي - يقرأ الملفات الفعلية
 */

class SmartComponentAnalyzer {
  constructor() {
    this.analysis = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf-8'));
    this.detailedComponents = [];
  }

  /**
   * قراءة كل مكون بالتفصيل
   */
  analyzeDetailedComponents() {
    console.log('🔬 تحليل مفصل للمكونات...\n');

    this.analysis.components.forEach(component => {
      try {
        const filePath = path.resolve(
          projectRoot,
          '../demo/src/components',
          component.path
        );

        if (!fs.existsSync(filePath)) {
          console.warn(`⚠️  لم أجد: ${component.name}`);
          return;
        }

        const content = fs.readFileSync(filePath, 'utf-8');
        const detailed = this.deepAnalyze(component, content);
        this.detailedComponents.push(detailed);

        console.log(`✓ ${component.name}`);

      } catch (error) {
        console.error(`✗ خطأ في ${component.name}: ${error.message}`);
      }
    });

    this.saveDetailed();
  }

  /**
   * تحليل عميق للمكون
   */
  deepAnalyze(component, content) {
    return {
      name: component.name,
      path: component.path,
      level: component.level,
      
      // Props المفصلة
      props: this.extractDetailedProps(content),
      
      // Computed
      computed: this.extractComputed(content),
      
      // Methods
      methods: this.extractMethods(content),
      
      // Slots مع أسماء
      slots: this.extractSlots(content),
      
      // Emits مع أوصاف
      emits: this.extractEmits(content),
      
      // الـ Template (الهيكل)
      template: this.extractTemplate(content),
      
      // الـ Style
      style: this.extractStyleDetails(content),
      
      // Dependencies
      imports: this.extractImports(content),
      
      // الملخص
      summary: this.generateSummary(component, content)
    };
  }

  /**
   * استخراج Props مفصل
   */
  extractDetailedProps(content) {
    const propsSection = content.match(/props:\s*{([^}]+?)(?=,\s*(?:computed|data|methods|watch))/s);
    if (!propsSection) return [];

    const propsCode = propsSection[1];
    const props = [];

    // البحث عن كل prop
    const propRegex = /(\w+):\s*{([^}]*?)}/gs;
    let match;

    while ((match = propRegex.exec(propsCode)) !== null) {
      const name = match[1];
      const config = match[2];

      const prop = {
        name,
        type: this.extractType(config),
        required: config.includes('required: true'),
        default: this.extractDefault(config),
        validator: config.includes('validator:'),
        description: this.extractPropDescription(config)
      };

      props.push(prop);
    }

    return props;
  }

  /**
   * استخراج النوع
   */
  extractType(config) {
    const typeMatch = config.match(/type:\s*(\w+)/);
    if (typeMatch) {
      const type = typeMatch[1];
      // تحويل Vue types إلى TypeScript
      const typeMap = {
        'String': 'string',
        'Number': 'number',
        'Boolean': 'boolean',
        'Array': 'any[]',
        'Object': 'Record<string, any>',
        'Function': '(...args: any[]) => void'
      };
      return typeMap[type] || type.toLowerCase();
    }
    return 'any';
  }

  /**
   * استخراج القيمة الافتراضية
   */
  extractDefault(config) {
    const defaultMatch = config.match(/default:\s*(.+?)(?=,|\})/s);
    if (defaultMatch) {
      return defaultMatch[1].trim();
    }
    return null;
  }

  /**
   * استخراج وصف Prop
   */
  extractPropDescription(config) {
    // ابحث عن تعليق قبل الـ prop
    const commentMatch = config.match(/\/\/\s*(.+)/);
    return commentMatch ? commentMatch[1] : '';
  }

  /**
   * استخراج الـ Computed
   */
  extractComputed(content) {
    const computedMatch = content.match(/computed:\s*{([^}]+?)(?=,\s*(?:methods|watch|data))/s);
    if (!computedMatch) return [];

    const computed = [];
    const computedCode = computedMatch[1];

    // استخراج كل computed
    const computedRegex = /(\w+)\s*\(\)\s*{/g;
    let match;

    while ((match = computedRegex.exec(computedCode)) !== null) {
      computed.push({
        name: match[1],
        getter: true
      });
    }

    return computed;
  }

  /**
   * استخراج Methods
   */
  extractMethods(content) {
    const methodsMatch = content.match(/methods:\s*{([^}]+?)(?=,\s*(?:watch|computed|data))/s);
    if (!methodsMatch) return [];

    const methods = [];
    const methodsCode = methodsMatch[1];

    const methodRegex = /(\w+)\s*\(/g;
    let match;

    while ((match = methodRegex.exec(methodsCode)) !== null) {
      methods.push({
        name: match[1],
        isPrivate: match[1].startsWith('_')
      });
    }

    return methods;
  }

  /**
   * استخراج Slots
   */
  extractSlots(content) {
    const templateMatch = content.match(/<template>[\s\S]*?<\/template>/);
    if (!templateMatch) return [];

    const template = templateMatch[0];
    const slots = [];

    // ابحث عن <slot> tags
    const slotRegex = /<slot\s+name="([^"]+)"[^>]*>/g;
    let match;

    while ((match = slotRegex.exec(template)) !== null) {
      slots.push({
        name: match[1],
        default: false
      });
    }

    // تحقق من الـ default slot
    if (template.includes('<slot>') || template.includes('<slot />')) {
      slots.unshift({
        name: 'default',
        default: true
      });
    }

    return slots;
  }

  /**
   * استخراج Emits
   */
  extractEmits(content) {
    const emitsMatch = content.match(/\$emit\(['""]([^'"]+)['""][,)]/g);
    if (!emitsMatch) return [];

    const emits = [];
    const seen = new Set();

    emitsMatch.forEach(match => {
      const eventName = match.match(/['""]([^'"]+)['"]/)[1];
      if (!seen.has(eventName)) {
        emits.push({
          name: eventName,
          args: this.extractEmitArgs(content, eventName)
        });
        seen.add(eventName);
      }
    });

    return emits;
  }

  /**
   * استخراج arguments الـ emit
   */
  extractEmitArgs(content, eventName) {
    const emitRegex = new RegExp(`\\$emit\\(['""]${eventName}['""],\\s*([^)]+)\\)`, 'g');
    const match = emitRegex.exec(content);
    return match ? match[1] : null;
  }

  /**
   * استخراج Template
   */
  extractTemplate(content) {
    const templateMatch = content.match(/<template>[\s\S]*?<\/template>/);
    if (!templateMatch) return null;

    return {
      structure: this.analyzeTemplateStructure(templateMatch[0]),
      hasForm: templateMatch[0].includes('<form'),
      hasTable: templateMatch[0].includes('<table'),
      hasModal: templateMatch[0].includes('modal'),
      complexity: this.calculateComplexity(templateMatch[0])
    };
  }

  /**
   * تحليل هيكل Template
   */
  analyzeTemplateStructure(template) {
    const depth = (template.match(/</g) || []).length;
    const elements = template.match(/<[a-zA-Z]+/g) || [];
    const uniqueElements = new Set(elements.map(e => e.replace(/</, '')));

    return {
      depth,
      elementCount: elements.length,
      uniqueElements: Array.from(uniqueElements)
    };
  }

  /**
   * حساب التعقيد
   */
  calculateComplexity(content) {
    const score =
      (content.match(/v-if/g) || []).length * 2 +
      (content.match(/v-for/g) || []).length * 3 +
      (content.match(/@/g) || []).length +
      (content.match(/v-bind/g) || []).length;

    if (score < 5) return 'simple';
    if (score < 15) return 'medium';
    return 'complex';
  }

  /**
   * استخراج Style Details
   */
  extractStyleDetails(content) {
    const styleMatch = content.match(/<style[\s\S]*?<\/style>/);
    if (!styleMatch) return null;

    const styleContent = styleMatch[0];

    return {
      scoped: styleContent.includes('scoped'),
      lang: styleMatch[0].match(/lang="([^"]+)"/)?.[1] || 'css',
      hasVariables: styleContent.includes('--'),
      lineCount: styleContent.split('\n').length
    };
  }

  /**
   * استخراج Imports
   */
  extractImports(content) {
    const importMatch = content.match(/import[\s\S]*?(?=<template|export)/);
    if (!importMatch) return [];

    const imports = [];
    const importRegex = /import\s+{([^}]+)}[\s\S]*?from\s+['""]([^'"]+)['"]/g;
    let match;

    while ((match = importRegex.exec(importMatch[0])) !== null) {
      imports.push({
        items: match[1].split(',').map(i => i.trim()),
        from: match[2]
      });
    }

    return imports;
  }

  /**
   * توليد ملخص
   */
  generateSummary(component, content) {
    return {
      linesOfCode: content.split('\n').length,
      hasVuex: content.includes('this.$store'),
      hasRouter: content.includes('this.$router'),
      hasI18n: content.includes('this.$t'),
      description: `مكون ${component.name} من مستوى ${component.level}`
    };
  }

  /**
   * حفظ النتائج المفصلة
   */
  saveDetailed() {
    const outputPath = path.resolve(projectRoot, './ai-analysis/detailed-components.json');
    
    fs.writeFileSync(outputPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalComponents: this.detailedComponents.length,
      components: this.detailedComponents
    }, null, 2));

    console.log(`\n✅ تم حفظ التحليل المفصل في: ${outputPath}`);
    
    // عرض ملخص
    this.printSummary();
  }

  /**
   * طباعة ملخص
   */
  printSummary() {
    console.log('\n📊 ملخص التحليل المفصل:');
    console.log(`   إجمالي المكونات: ${this.detailedComponents.length}\n`);

    this.detailedComponents.forEach(comp => {
      console.log(`   ${comp.name}:`);
      console.log(`      Props: ${comp.props.length}`);
      console.log(`      Slots: ${comp.slots.length}`);
      console.log(`      Emits: ${comp.emits.length}`);
      console.log(`      Methods: ${comp.methods.length}`);
    });
  }
}

// التشغيل
const analyzer = new SmartComponentAnalyzer();
analyzer.analyzeDetailedComponents();