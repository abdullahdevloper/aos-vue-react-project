#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const STRUCTURE_FILE = path.resolve(projectRoot, './src/components/.structure.json');

/**
 * 📊 عرض بنية المشروع الحالية
 */

class StructureViewer {
  constructor() {
    this.structure = null;
  }

  load() {
    if (!fs.existsSync(STRUCTURE_FILE)) {
      console.error('❌ لم يتم العثور على ملف البنية. شغل ai:generate أولاً');
      process.exit(1);
    }

    this.structure = JSON.parse(fs.readFileSync(STRUCTURE_FILE, 'utf-8'));
  }

  display() {
    console.clear();
    console.log('📊 بنية تطبيق React\n');
    console.log(`✨ تم الإنشاء: ${this.structure.generated}\n`);

    console.log('📈 الإحصائيات:');
    console.log(`   إجمالي المكونات: ${this.structure.totalComponents}`);
    console.log('\n🏗️  توزيع المستويات:');

    Object.keys(this.structure.levels).sort().forEach(level => {
      console.log(`   Level ${level}: ${this.structure.levels[level]} مكون`);
    });

    console.log('\n📝 المكونات:');
    this.structure.componentsList.forEach(comp => {
      console.log(`   ${comp.name} (${comp.props} props) - ${comp.path}`);
    });

    console.log('\n✅ تم تحديث الهيكل بنجاح');
  }
}

const viewer = new StructureViewer();
viewer.load();
viewer.display();