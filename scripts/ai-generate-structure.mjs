#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const ANALYSIS_FILE = path.resolve(projectRoot, './ai-analysis/components-analysis.json');
const REACT_OUTPUT_DIR = path.resolve(projectRoot, './src/components');

/**
 * 🏗️ بناء هيكل تطبيق React بناءً على تحليل Vuse
 */

class ReactStructureBuilder {
  constructor(analysisFile) {
    this.analysisFile = analysisFile;
    this.analysis = null;
    this.createdFolders = [];
    this.createdFiles = [];
  }

  /**
   * تحميل البيانات المحللة
   */
  loadAnalysis() {
    if (!fs.existsSync(this.analysisFile)) {
      console.error('❌ لم يتم العثور على ملف التحليل. شغل ai:scan أولاً');
      process.exit(1);
    }

    this.analysis = JSON.parse(fs.readFileSync(this.analysisFile, 'utf-8'));
    console.log('✅ تم تحميل بيانات التحليل\n');
  }

  /**
   * بناء الهيكل
   */
  async build() {
    console.log('🏗️  جاري بناء هيكل React...\n');

    try {
      // إنشاء هيكل المجلدات
      this.createFolderStructure();

      // إنشاء ملفات المكونات
      this.createComponentFiles();

      // إنشاء ملفات الفهرسة
      this.createIndexFiles();

      // إنشاء ملفات الإعدادات
      this.createConfigFiles();

      console.log('\n✅ تم بناء الهيكل بنجاح!\n');
      this.printSummary();

    } catch (error) {
      console.error('❌ خطأ:', error.message);
      process.exit(1);
    }
  }

  /**
   * إنشاء بنية المجلدات
   */
  createFolderStructure() {
    console.log('📁 إنشاء المجلدات...');

    // مجلدات رئيسية
    const mainFolders = [
      'Level1',
      'Level2',
      'Level3',
      'Level4',
      'hooks',
      'context',
      'utils',
      'styles',
      'types'
    ];

    mainFolders.forEach(folder => {
      const folderPath = path.join(REACT_OUTPUT_DIR, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        this.createdFolders.push(folderPath);
        console.log(`  ✓ ${folder}/`);
      }
    });

    // مجلدات فرعية حسب أنواع المكونات
    const componentTypes = new Set();
    this.analysis.components.forEach(comp => {
      const type = this.getComponentType(comp);
      if (type && type !== 'Other') {
        componentTypes.add(type);
      }
    });

    componentTypes.forEach(type => {
      const typeFolder = path.join(REACT_OUTPUT_DIR, 'Shared', type);
      if (!fs.existsSync(typeFolder)) {
        fs.mkdirSync(typeFolder, { recursive: true });
        this.createdFolders.push(typeFolder);
      }
    });
  }

  /**
   * تحديد نوع المكون
   */
  getComponentType(component) {
    const folder = component.folder.toLowerCase();
    
    if (folder.includes('form')) return 'Form';
    if (folder.includes('modal') || folder.includes('dialog')) return 'Modal';
    if (folder.includes('table') || folder.includes('data')) return 'Table';
    if (folder.includes('navigation') || folder.includes('nav')) return 'Navigation';
    if (folder.includes('layout')) return 'Layout';
    if (folder.includes('card')) return 'Card';
    if (folder.includes('widget')) return 'Widget';
    if (folder.includes('list')) return 'List';
    
    return 'Other';
  }

  /**
   * إنشاء ملفات المكونات
   */
  createComponentFiles() {
    console.log('\n📝 إنشاء ملفات المكونات...');

    this.analysis.components.forEach(component => {
      const level = component.level;
      const componentFolder = path.join(
        REACT_OUTPUT_DIR,
        `Level${level}`,
        component.name
      );

      // إنشاء مجلد المكون
      if (!fs.existsSync(componentFolder)) {
        fs.mkdirSync(componentFolder, { recursive: true });
      }

      // إنشاء ملفات المكون
      this.createComponentFile(componentFolder, component);
      this.createStyleFile(componentFolder, component);
      this.createStoryFile(componentFolder, component);
      this.createTestFile(componentFolder, component);
      this.createIndexFile(componentFolder, component);

      console.log(`  ✓ ${component.name}/`);
    });
  }

  /**
   * إنشاء ملف المكون الرئيسي
   */
  createComponentFile(folderPath, component) {
    const propsCode = component.props
      .map(p => `  ${p.name}${p.required ? '' : '?'}: ${p.type}`)
      .join(',\n');

    const code = `import React from 'react';
import PropTypes from 'prop-types';
import styles from './${component.name}.module.scss';

interface ${component.name}Props {
${propsCode}
}

/**
 * ${component.name} Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: ${component.level}
 * 
 * @example
 * <${component.name} />
 */
export const ${component.name}: React.FC<${component.name}Props> = ({
  ${component.props.map(p => p.name).join(', ')}
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

${component.name}.displayName = '${component.name}';

${component.name}.propTypes = {
${component.props.map(p => `  ${p.name}: PropTypes.${p.type.toLowerCase()}`).join(',\n')}
};

export default ${component.name};
`;

    const filePath = path.join(folderPath, `${component.name}.jsx`);
    fs.writeFileSync(filePath, code);
    this.createdFiles.push(filePath);
  }

  /**
   * إنشاء ملف الـ Styling
   */
  createStyleFile(folderPath, component) {
    const code = `/* ${component.name} Component Styles */

.container {
  /* TODO: إضافة التنسيق */
}
`;

    const filePath = path.join(folderPath, `${component.name}.module.scss`);
    fs.writeFileSync(filePath, code);
    this.createdFiles.push(filePath);
  }

  /**
   * إنشاء ملف Storybook
   */
  createStoryFile(folderPath, component) {
    const code = `import { ${component.name} } from './${component.name}';

export default {
  title: 'Components/Level${component.level}/${component.name}',
  component: ${component.name},
  parameters: {
    layout: 'centered',
  },
  argTypes: {
${component.props.map(p => `    ${p.name}: { control: 'text' }`).join(',\n')}
  },
};

export const Default = {
  args: {
${component.props.map(p => `    ${p.name}: ${JSON.stringify(p.default || '')}`).join(',\n')}
  },
};
`;

    const filePath = path.join(folderPath, `${component.name}.stories.jsx`);
    fs.writeFileSync(filePath, code);
    this.createdFiles.push(filePath);
  }

  /**
   * إنشاء ملف الاختبار
   */
  createTestFile(folderPath, component) {
    const code = `import { render, screen } from '@testing-library/react';
import { ${component.name} } from './${component.name}';

describe('${component.name}', () => {
  it('renders without crashing', () => {
    render(<${component.name} />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
`;

    const filePath = path.join(folderPath, `${component.name}.test.jsx`);
    fs.writeFileSync(filePath, code);
    this.createdFiles.push(filePath);
  }

  /**
   * إنشاء ملف الفهرسة
   */
  createIndexFile(folderPath, component) {
    const code = `export { ${component.name}, type ${component.name}Props } from './${component.name}';
export { default } from './${component.name}';
`;

    const filePath = path.join(folderPath, 'index.js');
    fs.writeFileSync(filePath, code);
    this.createdFiles.push(filePath);
  }

  /**
   * إنشاء ملفات الفهرسة الرئيسية
   */
  createIndexFiles() {
    console.log('\n📋 إنشاء ملفات الفهرسة...');

    // index.js رئيسي
    let mainIndex = '// Auto-generated by ai:generate\n\n';
    
    for (let level = 1; level <= 4; level++) {
      mainIndex += `// Level ${level} Components\n`;
      
      const levelComponents = this.analysis.components
        .filter(c => c.level === level)
        .map(c => c.name);

      levelComponents.forEach(name => {
        mainIndex += `export { ${name}, type ${name}Props } from './Level${level}/${name}';\n`;
      });

      mainIndex += '\n';
    }

    const indexPath = path.join(REACT_OUTPUT_DIR, 'index.js');
    fs.writeFileSync(indexPath, mainIndex);
    console.log('  ✓ index.js');
  }

  /**
   * إنشاء ملفات الإعدادات
   */
  createConfigFiles() {
    console.log('\n⚙️  إنشاء ملفات الإعدادات...');

    // ملف JSON للبنية
    const structureFile = {
      generated: new Date().toISOString(),
      totalComponents: this.analysis.components.length,
      levels: this.analysis.structure.levels,
      componentsList: this.analysis.components.map(c => ({
        name: c.name,
        level: c.level,
        props: c.props.length,
        path: `Level${c.level}/${c.name}`
      }))
    };

    const structurePath = path.join(REACT_OUTPUT_DIR, '.structure.json');
    fs.writeFileSync(structurePath, JSON.stringify(structureFile, null, 2));
    console.log('  ✓ .structure.json');

    // ملف dependencies
    const depsFile = this.analysis.dependencies;
    const depsPath = path.join(REACT_OUTPUT_DIR, '.dependencies.json');
    fs.writeFileSync(depsPath, JSON.stringify(depsFile, null, 2));
    console.log('  ✓ .dependencies.json');
  }

  /**
   * طباعة ملخص
   */
  printSummary() {
    console.log('📊 ملخص البناء:');
    console.log(`   ✓ مجلدات تم إنشاؤها: ${this.createdFolders.length}`);
    console.log(`   ✓ ملفات تم إنشاؤها: ${this.createdFiles.length}`);
    console.log(`   ✓ مكونات: ${this.analysis.components.length}`);
    console.log(`\n📁 الموقع: ${REACT_OUTPUT_DIR}`);
  }
}

// تشغيل البناء
const builder = new ReactStructureBuilder(ANALYSIS_FILE);
builder.loadAnalysis();
await builder.build();