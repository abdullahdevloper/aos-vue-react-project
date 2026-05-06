# Handoff Context: Vuse Vue Template to React Parallel Rebuild

## اللغة المطلوبة
الردود بالعربية، مختصرة وواضحة.

## المشروع
المشروع الأصلي هو قالب:
Vuse: VueJs CLI Material Admin

المسار:
`/root/frontend-team-backup/vuesConverter/vues_template/demo_extracted/demo`

الغرض:
إنشاء نسخة React موازية للقالب، وليس حذف أو تعديل مشروع Vue.

## القاعدة الذهبية
مشروع Vue الأصلي read-only.

ممنوع تعديل:
- `src/`
- `public/`
- `scripts/`
- `package.json`
- `package-lock.json`
- `babel.config.js`
- `vue.config.js`
- `webpack.config.js`
- `README.md`
- `AGENTS.md`

كل عمل React يجب أن يكون داخل:
`react-dashboard-template/`

كل التقارير داخل:
`migration-docs/`

## الاستراتيجية الجديدة
التحويل لا يتم دفعة واحدة.

يتم التحويل قسمًا قسمًا:
1. UI Components
   - Charts
   - Widgets
   - Vuetify
2. Style & User Interface
3. Pages
4. App Shell / Dashboard Layout

لا ينتقل Codex إلى القسم التالي إلا بعد الاعتماد البصري من المستخدم.

## المشكلة السابقة
Codex أنشأ Prototype React بسيط وادّعى أن 49 مكونًا اكتملت، لكن النتيجة لم تنقل هوية قالب Vuse الأصلية.
المطلوب ليس React/MUI dashboard عادي، بل نقل التصميم الفريد للقالب.

## نمط Vuse المطلوب
يجب الحفاظ على:
- Neumorphic / soft UI
- خلفية فاتحة `#F2F3F7`
- بطاقات مرتفعة بظلال ناعمة `neu-glow`
- active state بشكل inset
- Sidebar بعرض قريب من 280px
- radius عام قريب من 4px
- primary accent قريب من teal/cyan
- section headers في sidebar
- nested expandable groups
- active navigation pills
- circular soft icon buttons
- تصميم قريب جدًا من Vue/Vuetify الأصلي
- عدم استخدام generic MUI styling

## AGENTS.md
تم تعديله ليحتوي على:
- حماية مشروع Vue
- حماية AGENTS.md
- قواعد Vuse Visual Fidelity
- عدم اعتبار القسم مكتملًا إلا بعد اعتماد المستخدم بصريًا

## Codex config
المسار:
`/root/.codex/config.toml`

الإعدادات المهمة:
```toml
model = "gpt-5.5"
model_reasoning_effort = "medium"

sandbox_mode = "workspace-write"
approval_policy = "never"

[sandbox_workspace_write]
network_access = true
```

## تشغيل Vue الأصلي

حدث خطأ مع Node 24 بسبب `fibers@4.0.3`.

الحل الناجح كان استخدام Node 12:

```bash
cd /root/frontend-team-backup/vuesConverter/vues_template/demo_extracted/demo
nvm use 12.22.12
npm run serve -- --host 0.0.0.0 --port 8080
```

Vue يعمل للمقارنة على:

`http://SERVER_IP:8080`

## تشغيل React

```bash
cd /root/frontend-team-backup/vuesConverter/vues_template/demo_extracted/demo/react-dashboard-template
npm run dev -- --host 0.0.0.0 --port 5173
```

React يعمل على:

`http://SERVER_IP:5173`

## الملفات المهمة

- `AGENTS.md`
- `migration-docs/PHASES.md`
- `migration-docs/ui-components-audit.md`
- `migration-docs/progress.md`
- `migration-docs/phase-report.md`
- `react-dashboard-template/`

## Audit الحالي

تم عمل audit لقسم UI Components فقط.

نتائج audit:

UI Components يحتوي:

- Charts
  - Spark Line
  - ChartJS

- Widgets
  - Cards
  - Lists
  - Statistic
  - Chart
  - Document Cards

- Vuetify
  - Api Explorer
  - Alerts
  - Avatars
  - Badges
  - Banners
  - Bars
  - Buttons
  - Form Control
  - Tables
  - Tabs
  - وغيرها

تم الاتفاق أن نبدأ فقط بـ:

`UI Components / Charts`

## حالة Charts

Codex نفذ أول pass لقسم Charts:

- `/charts/chartjs`
- `/charts/spark-line`
- sidebar shell
- ChartJS examples
- SparkLine examples

لكن Charts لم تُعتمد بصريًا بعد.

ثم تم إرسال برومبت visual correction لأن التصميم لم يكن مطابقًا لنمط Vuse.

آخر رسالة من Codex قالت إنه:

- استخدم Vue soft UI tokens
- وجد:
  - `#F2F3F7`
  - neu-glow raised shadows
  - inset active states
  - compact 280px drawer
  - 4px root radius
  - teal primary
  - transparent toolbar + raised avatar
- عدّل 5 ملفات
- شغّل `npm run build`
- build نجح
- كان سيحدّث migration docs

لكن لا يوجد تأكيد نهائي أنه أنهى:

- docs updated
- protected files clean
- Charts pending approval
- Widgets/Vuetify untouched

لذلك المرحلة الحالية هي:

`UI Components / Charts visual correction pending verification`

## ما يجب فعله الآن في الحساب الجديد

أولًا افحص من جذر المشروع:

```bash
cd /root/frontend-team-backup/vuesConverter/vues_template/demo_extracted/demo
git status --short
```

ثم افحص الملفات المحمية:

```bash
git status --short -- src public scripts package.json package-lock.json babel.config.js vue.config.js webpack.config.js README.md AGENTS.md
```

يجب ألا يظهر شيء.

ثم افحص التقرير:

```bash
tail -n 100 migration-docs/phase-report.md
tail -n 100 migration-docs/progress.md
```

ثم شغّل build:

```bash
cd react-dashboard-template
npm run build
npm run dev -- --host 0.0.0.0 --port 5173
```

افتح:

- `http://SERVER_IP:5173/charts/chartjs`
- `http://SERVER_IP:5173/charts/spark-line`

وقارن مع Vue:

- `http://SERVER_IP:8080/charts/chartjs`
- `http://SERVER_IP:8080/charts/spark-line`

## إذا كانت جلسة Codex السابقة انقطعت

أرسل في Codex جلسة جديدة هذا البرومبت:

```text
Continue from the current working tree. The Charts visual correction build already passed or was in progress.

Do not restart from scratch.
Do not recreate existing files unless they are incomplete or incorrect.
Finish only the remaining Charts visual correction work, documentation updates, and protected-files verification.

Active scope:
- UI Components / Charts only
- /charts/chartjs
- /charts/spark-line

Do not implement:
- Widgets
- Vuetify
- Style & User Interface
- Pages

Rules:
- Do not modify protected Vue/root files.
- Do not modify AGENTS.md.
- Work only inside react-dashboard-template/ and migration-docs/.
- Run npm run build only inside react-dashboard-template/.
- Do not run npm commands from the repository root.
- Keep Charts as pending user visual approval after fixes.

Use the Vuse visual tokens already identified:
- #F2F3F7 background
- neu-glow raised shadows
- inset active states
- compact 280px drawer
- 4px root radius
- teal primary
- transparent section toolbar with raised avatar

Tasks:
1. Inspect the current React Charts implementation before editing.
2. Complete any missing Charts visual correction.
3. Update migration-docs/progress.md and migration-docs/phase-report.md.
4. Run npm run build inside react-dashboard-template.
5. Run:
   git status --short -- src public scripts package.json package-lock.json babel.config.js vue.config.js webpack.config.js README.md AGENTS.md
6. If any protected path appears dirty, stop and revert only that accidental change.

At the end report:
- visual fixes completed
- remaining Charts gaps
- build status
- protected files status
- confirmation that Charts remains pending user visual approval
- confirmation that Widgets and Vuetify were not touched
```

## بعد اعتماد Charts بصريًا

اعمل commit:

```bash
git add react-dashboard-template migration-docs
git commit -m "approve ui components charts visual slice"
```

ثم ننتقل إلى:

`UI Components / Widgets`

ولا نبدأ Widgets قبل اعتماد Charts.