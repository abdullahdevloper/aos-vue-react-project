# Codex + Gemini AI Team for React Projects

This package creates a lightweight AI execution workflow:

1. Gemini analyzes the React project and produces structured context.
2. Gemini prepares a strict Task Pack.
3. Codex executes the task inside the repository.
4. Tests/build/lint run locally or in CI.
5. Gemini reviews the result against the Task Pack and SRS/source references.

## Install

Copy the `ai/` and `scripts/` folders into the root of your React project.

Then add these scripts to `package.json`:

```json
{
  "scripts": {
    "ai:scan": "node scripts/ai-scan-project.mjs",
    "ai:task": "node scripts/ai-create-task-pack.mjs",
    "ai:codex-prompt": "node scripts/ai-build-codex-prompt.mjs",
    "ai:review": "node scripts/ai-review-result.mjs"
  }
}
```

## Environment

Create `.env.ai` in the project root:

```bash
GEMINI_API_KEY=your_key_here
GEMINI_MODEL_ANALYSIS=gemini-2.5-pro
GEMINI_MODEL_EXTRACTION=gemini-2.5-flash
GEMINI_MODEL_REVIEW=gemini-2.5-pro
```

## Recommended Flow

```bash
npm run ai:scan
npm run ai:task
npm run ai:codex-prompt
```

Then pass the generated prompt in `ai/tasks/codex-execution-prompt.md` to Codex CLI or Codex Cloud.

After Codex changes the code:

```bash
npm run build
npm test
npm run ai:review
```

## Team Roles

- Gemini Pro: requirements understanding, task pack approval, final review.
- Gemini Flash: extraction and high-volume analysis.
- Codex: code implementation, refactor, tests, PR.
- CI/CD: hard quality gate.

# Codex Generation Task

## مهمة: توليد مكونات React

### المستوى: Level 2
### عدد المكونات: 5

### المكونات:
```json
[
  {
    "name": "FooterSettings",
    "props": [],
    "slots": [],
    "emits": []
  },
  {
    "name": "HeaderSettings",
    "props": [],
    "slots": [],
    "emits": []
  },
  {
    "name": "Index",
    "props": [
      "maxWidth: unknown"
    ],
    "slots": [],
    "emits": []
  },
  {
    "name": "LanguageSelection",
    "props": [],
    "slots": [],
    "emits": []
  },...

🔗 انسخ الـ prompt أدناه والصقه في Codex:

==================================================
# Codex Generation Task

## مهمة: توليد مكونات React

### المستوى: Level 2
### عدد المكونات: 5

### المكونات:
```json
[
  {
    "name": "FooterSettings",
    "props": [],
    "slots": [],
    "emits": []
  },
  {
    "name": "HeaderSettings",
    "props": [],
    "slots": [],
    "emits": []
  },
  {
    "name": "Index",
    "props": [
      "maxWidth: unknown"
    ],
    "slots": [],
    "emits": []
  },
  {
    "name": "LanguageSelection",
    "props": [],
    "slots": [],
    "emits": []
  },
  {
    "name": "SidenavSettings",
    "props": [],
    "slots": [],
    "emits": []
  }
]
```

### التعليمات:

لكل مكون:
1. أنشئ ملف `.jsx` يحتوي على المكون الرئيسي
2. أنشئ ملف `.module.scss` للـ styling
3. أنشئ ملف `.stories.jsx` لـ Storybook
4. أنشئ ملف `.test.jsx` للاختبار

### Format:

```json
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
```

### المتطلبات:
- استخدم TypeScript interfaces
- أضف PropTypes
- اتبع Best Practices
- اترك TODOs للتطبيق الكامل
- بدون شروحات طويلة، فقط الكود

### الملفات المراد إنشاؤها:
- FooterSettings/FooterSettings.jsx, .scss, .stories.jsx, .test.jsx
- HeaderSettings/HeaderSettings.jsx, .scss, .stories.jsx, .test.jsx
- Index/Index.jsx, .scss, .stories.jsx, .test.jsx
- LanguageSelection/LanguageSelection.jsx, .scss, .stories.jsx, .test.jsx
- SidenavSettings/SidenavSettings.jsx, .scss, .stories.jsx, .test.jsx

==================================================