# React Vuse Migration Handoff

## اللغة المطلوبة
الردود بالعربية، مختصرة وواضحة.

## المشروع
المشروع الأصلي هو قالب:
Vuse: VueJs CLI Material Admin

الغرض:
إنشاء نسخة React موازية للقالب، وليس حذف أو تعديل مشروع Vue الأصلي.

## المسار
/root/frontend-team-backup/vuesConverter/vues_template/demo_extracted/demo

## قاعدة العمل
مشروع Vue الأصلي read-only.

ممنوع تعديل:
- src/
- public/
- scripts/
- package.json
- package-lock.json
- babel.config.js
- vue.config.js
- webpack.config.js
- README.md
- AGENTS.md

كل كود React داخل:
react-dashboard-template/

كل التقارير داخل:
migration-docs/

## الاستراتيجية
العمل يتم Slice by Slice:

Audit → Implementation → Visual Review → Approval → Commit

لا يتم الانتقال لأي Slice قبل اعتماد المستخدم بصرياً.

## قواعد الجودة
يجب مطابقة Vue الأصلي بصرياً وسلوكياً:
- Vuse soft/neumorphic UI
- pale #F2F3F7 background
- soft shadows
- Vue/Vuetify spacing/density
- typography scale
- hover/click/active states
- dropdown/select alignment
- responsive behavior من Vue الأصلي وليس breakpoints عشوائية
- View source behavior
- Invert example color behavior
- كل الأزرار والتفاعلات الظاهرة في Vue

## الحالة المعتمدة

### UI Components
- Charts = Approved
- Widgets = Approved
  - Cards = Approved
  - Lists = Approved
  - Statistic = Approved
  - Chart = Approved
  - Document Cards = Approved

### Global Sidebar
- Global Sidebar Navigation Fidelity = Approved

### Pages
- Pages / Errors = Approved
  - /pages/error/404
  - /pages/error/500
- Pages / Authentication = Approved
  - Login = Approved
  - Signup = Approved
  - Forgot Password = Approved
  - Lock Screen = Approved
- Pages / Coming Soon = Approved
- Pages / Maintenance = Approved
- Pages / Profile = Approved
- Pages section = Approved

### Vuetify
Vuetify متوقف مؤقتاً ولا يتم استكماله إلا بأمر صريح من المستخدم.

المعتمد:
- Api Explorer = Approved
- Alerts = Approved
- Avatars = Approved
- Badges = Approved

غير منفذ:
- Banners = Not started
- Batch B وما بعده = Not started

### Style & User Interface
Audit مكتمل في:
migration-docs/style-ui-audit.md

المعتمد:
- Color = Approved
- Icons = Approved
- Helpers = Approved
- Border Radius = Approved

التالي:
- Text & Typography
- Route: /text-typography

غير منفذ بعد:
- Text & Typography
- Motion
- Programmatic Scrolling
- Forms

## آخر نقطة تنفيذ مؤكدة
آخر Slice معتمد:
Style & User Interface / Border Radius

الخطوة التالية:
Style & User Interface / Text & Typography

## البرومبت التالي المقترح

Start implementing Style & User Interface, slice 5: Text & Typography page only.

Use migration-docs/style-ui-audit.md as the source audit.
Use the running Vue app and Vue source as the visual, behavior, and responsive reference.

Active scope:
- Style & User Interface / Text & Typography only
- Route: /text-typography
- Shared Style docs/example shell only as needed for Text & Typography

Do not implement:
- Motion
- Programmatic Scrolling
- Forms
- Vuetify Banners
- Vuetify Batch B or later
- Pages
- Charts
- Widgets
- Color, Icons, Helpers, or Border Radius except do not break the approved routes

Rules:
- Do not modify protected Vue/root files.
- Do not modify AGENTS.md.
- Work only inside react-dashboard-template/ and migration-docs/.
- Run npm run build only inside react-dashboard-template/.
- Keep Style & User Interface / Text & Typography pending user visual approval after this pass.

Before implementation:
Inspect the original Vue/Vuetify responsive behavior.
Do not impose arbitrary breakpoints.
Find how the Text & Typography page behaves through:
- layout structure
- typography examples
- heading examples
- font weight examples
- text alignment examples
- text transform examples
- markdown/example blocks
- spacing and density
- mobile/tablet/desktop behavior if present

After implementation:
- Run npm run build inside react-dashboard-template.
- Update migration-docs/progress.md and migration-docs/phase-report.md.
- Mark Text & Typography as pending user visual approval.
- Confirm protected files are unchanged.

## تشغيل Vue الأصلي
Vue يحتاج Node 12 بسبب fibers/http_parser:

cd /root/frontend-team-backup/vuesConverter/vues_template/demo_extracted/demo
nvm use 12.22.12
npm run serve -- --host 0.0.0.0 --port 8080

Vue URL:
http://SERVER_IP:8080

## تشغيل React
cd /root/frontend-team-backup/vuesConverter/vues_template/demo_extracted/demo/react-dashboard-template
node -v
npm run dev -- --host 0.0.0.0 --port 5173

React URL:
http://SERVER_IP:5173

## قبل كل commit
نظّف build artifacts:

git restore react-dashboard-template/dist react-dashboard-template/tsconfig.tsbuildinfo
git clean -f react-dashboard-template/dist/assets

ثم commit:

git add migration-docs react-dashboard-template/src
git commit -m "<slice approval message>"

## عند فتح الحساب الجديد
ابدأ بقراءة:
- AGENTS.md
- react-vuse-migration-handoff.md
- migration-docs/progress.md
- migration-docs/phase-report.md
- migration-docs/style-ui-audit.md

ثم تابع من:
Style & User Interface / Text & Typography

ولا تكمل Vuetify إلا إذا طلب المستخدم ذلك صراحة.
