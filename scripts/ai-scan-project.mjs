#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// 🔍 البحث التلقائي عن مجلد components
function findVuseComponentsPath() {
  console.log('🔍 جاري البحث عن مجلد Vuse components...\n');

  try {
    // البحث في المسارات الشائعة
    const commonPaths = [
      path.resolve(projectRoot, '../vuse/src/components'),
      path.resolve(projectRoot, '../vuse-vue/src/components'),
      path.resolve(projectRoot, '../demo/src/components'),
      path.resolve(projectRoot, '../src/components'),
      path.resolve(projectRoot, '../../vuse/src/components'),
      path.resolve(projectRoot, '../../demo/src/components'),
      '/root/frontend-team-backup/vuesConverter/vues_template/demo_extracted/demo/src/components'
    ];

    for (const checkPath of commonPaths) {
      if (fs.existsSync(checkPath)) {
        console.log(`✅ وجدت المسار: ${checkPath}\n`);
        return checkPath;
      }
    }

    // إذا لم نجد، ابحث باستخدام find
    console.log('🔎 البحث في النظام...');
    const result = execSync(`find ${path.resolve(projectRoot, '../..')} -maxdepth 5 -name "components" -type d 2>/dev/null | grep -E "vuse|demo" | head -1`, { encoding: 'utf-8' }).trim();
    
    if (result) {
      console.log(`✅ وجدت المسار: ${result}\n`);
      return result;
    }

    // عرض المسارات المتاحة
    console.log('❌ لم أتمكن من العثور على المجلد تلقائياً');
    console.log('\n📁 المسارات المتاحة:');
    execSync(`find ${path.resolve(projectRoot, '../..')} -maxdepth 4 -name "components" -type d 2>/dev/null | head -10`);
    
    throw new Error('لم يتم العثور على مجلد Vuse components');

  } catch (error) {
    console.error('❌ خطأ في البحث:', error.message);
    process.exit(1);
  }
}

// استخدام المسار المكتشف تلقائياً
const VUSE_PATH = findVuseComponentsPath();
const OUTPUT_DIR = path.resolve(projectRoot, './ai-analysis');

// ... بقية الكود السابق (كما هو)

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

class ComponentScanner {
  constructor(sourcePath) {
    this.sourcePath = sourcePath;
    this.components = [];
    this.structure = {};
    this.dependencies = {};
    this.errors = [];
  }

  async scan() {
    console.log(`📂 فحص: ${this.sourcePath}\n`);
    
    try {
      this.scanDirectory(this.sourcePath, '');
      this.analyzeDependencies();
      this.categorizeComponents();
      this.saveResults();
      
      console.log('✅ تم إنهاء الفحص بنجاح!\n');
      this.printSummary();
      
    } catch (error) {
      this.errors.push(error.message);
      console.error('❌ خطأ:', error.message);
    }
  }

  scanDirectory(dirPath, relativePath) {
    if (!fs.existsSync(dirPath)) {
      console.warn(`⚠️  المجلد غير موجود: ${dirPath}`);
      return;
    }

    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    items.forEach(item => {
      if (item.name.startsWith('.') || item.name === 'node_modules') return;

      const fullPath = path.join(dirPath, item.name);
      const relPath = relativePath ? `${relativePath}/${item.name}` : item.name;

      if (item.isDirectory()) {
        if (!this.structure[relPath]) {
          this.structure[relPath] = {
            type: 'directory',
            children: [],
            level: relPath.split('/').length - 1
          };
        }

        this.scanDirectory(fullPath, relPath);

      } else if (item.isFile()) {
        if (item.name.endsWith('.vue')) {
          this.analyzeVueComponent(fullPath, relPath);
        }
        
        const ext = path.extname(item.name);
        const key = relPath;
        
        if (!this.structure[relPath]) {
          this.structure[relPath] = {
            type: 'file',
            extension: ext,
            size: fs.statSync(fullPath).size,
            path: fullPath
          };
        }
      }
    });
  }

  analyzeVueComponent(filePath, relativePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const componentName = path.basename(filePath, '.vue');
      const folderPath = path.dirname(relativePath);

      const propsMatch = content.match(/props:\s*{([^}]+)}/s);
      const props = propsMatch ? this.extractProps(propsMatch[1]) : [];

      const emitsMatch = content.match(/emits?:\s*\[([^\]]+)\]/s);
      const emits = emitsMatch ? this.extractEmits(emitsMatch[1]) : [];

      const slots = (content.match(/<slot[^>]*>/g) || []).map(slot => {
        const nameMatch = slot.match(/name="([^"]+)"/);
        return nameMatch ? nameMatch[1] : 'default';
      });

      const importedComponents = this.extractImports(content);

      const level = this.determineLevel(componentName, folderPath);

      const component = {
        name: componentName,
        path: relativePath,
        folder: folderPath,
        level,
        props: props.map(p => ({
          name: p.name,
          type: p.type || 'unknown',
          required: p.required || false,
          default: p.default
        })),
        emits,
        slots,
        imports: importedComponents,
        fileSize: fs.statSync(filePath).size,
        hasScoped: content.includes('scoped')
      };

      this.components.push(component);
      console.log(`  ✓ ${componentName} (Level ${level})`);

    } catch (error) {
      this.errors.push(`خطأ في تحليل ${relativePath}: ${error.message}`);
    }
  }

  extractProps(propsString) {
    const props = [];
    const propRegex = /(\w+):\s*{([^}]*?)(?:,\s*(?=\w+:)|$)/gs;
    
    let match;
    while ((match = propRegex.exec(propsString)) !== null) {
      const name = match[1];
      const config = match[2];
      
      const typeMatch = config.match(/type:\s*(\w+)/);
      const requiredMatch = config.match(/required:\s*(true|false)/);
      const defaultMatch = config.match(/default:\s*(.+?)(?=,|\}|$)/);

      props.push({
        name,
        type: typeMatch ? typeMatch[1] : 'unknown',
        required: requiredMatch ? requiredMatch[1] === 'true' : false,
        default: defaultMatch ? defaultMatch[1].trim() : undefined
      });
    }

    return props;
  }

  extractEmits(emitsString) {
    return emitsString
      .split(',')
      .map(e => e.trim().replace(/['"`]/g, ''))
      .filter(e => e.length > 0);
  }

  extractImports(content) {
    const importRegex = /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g;
    const imports = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const modulePath = match[1];
      if (!modulePath.includes('node_modules') && !modulePath.startsWith('@/utils')) {
        imports.push(modulePath);
      }
    }

    return imports;
  }

  determineLevel(componentName, folderPath) {
    const compNameLower = componentName.toLowerCase();
    const folderLower = folderPath.toLowerCase();
    
    if (['button', 'badge', 'icon', 'avatar', 'spinner', 'divider', 'chip', 'typography'].includes(compNameLower)) {
      return 1;
    }

    if (['card', 'modal', 'alert', 'dropdown', 'menu', 'select', 'textfield'].includes(compNameLower)) {
      return 2;
    }

    if (['datatable', 'form', 'calendar', 'datepicker', 'tree'].includes(compNameLower)) {
      return 3;
    }

    if (['dashboard', 'profile', 'chat', 'contacts'].includes(compNameLower)) {
      return 4;
    }

    if (folderLower.includes('card')) return 2;
    if (folderLower.includes('table') || folderLower.includes('data')) return 3;
    if (folderLower.includes('widget')) return 2;
    if (folderLower.includes('application') || folderLower.includes('page')) return 4;

    return 2;
  }

  analyzeDependencies() {
    this.components.forEach(component => {
      this.dependencies[component.name] = {
        imports: component.imports,
        dependsOn: [],
        usedBy: []
      };
    });

    this.components.forEach(component => {
      component.imports.forEach(imp => {
        const depName = this.findComponentByPath(imp);
        if (depName && depName !== component.name) {
          if (!this.dependencies[component.name].dependsOn.includes(depName)) {
            this.dependencies[component.name].dependsOn.push(depName);
          }
          if (!this.dependencies[depName].usedBy.includes(component.name)) {
            this.dependencies[depName].usedBy.push(component.name);
          }
        }
      });
    });
  }

  findComponentByPath(importPath) {
    return this.components.find(comp => 
      importPath.includes(comp.name) || 
      importPath.includes(comp.folder.split('/').pop())
    )?.name;
  }

  categorizeComponents() {
    const levels = {};
    
    this.components.forEach(component => {
      if (!levels[component.level]) {
        levels[component.level] = [];
      }
      levels[component.level].push(component.name);
    });

    this.structure.levels = levels;
  }

  saveResults() {
    const results = {
      timestamp: new Date().toISOString(),
      projectPath: this.sourcePath,
      stats: {
        totalComponents: this.components.length,
        byLevel: {}
      },
      components: this.components,
      structure: this.structure,
      dependencies: this.dependencies,
      errors: this.errors
    };

    this.components.forEach(comp => {
      const level = comp.level;
      if (!results.stats.byLevel[level]) {
        results.stats.byLevel[level] = 0;
      }
      results.stats.byLevel[level]++;
    });

    const outputPath = path.join(OUTPUT_DIR, 'components-analysis.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    
    console.log(`\n📁 تم حفظ التحليل في: ${outputPath}`);
  }

  printSummary() {
    console.log('📊 ملخص الفحص:');
    console.log(`   إجمالي المكونات: ${this.components.length}`);
    
    const levels = {};
    this.components.forEach(comp => {
      levels[comp.level] = (levels[comp.level] || 0) + 1;
    });

    Object.keys(levels).sort().forEach(level => {
      console.log(`   Level ${level}: ${levels[level]} مكون`);
    });

    console.log(`\n⚠️  أخطاء: ${this.errors.length}`);
  }
}

const scanner = new ComponentScanner(VUSE_PATH);
await scanner.scan();