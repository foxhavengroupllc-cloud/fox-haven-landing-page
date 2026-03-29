# NEW_PROJECT_TEMPLATE

Copy this folder to `src/experience/scenes/[your-project-id]/` to start a new experience.

## Files

| File | What to do |
|------|-----------|
| `manifest.ts` | Fill in EVERY field. Run validator. Set status to 'complete'. |
| `Scene.tsx` | Replace `YourScene` with your scene logic. |
| `Fallback.tsx` | Replace with your CSS-only fallback. |

## Quick start

```bash
# 1. Copy the template
cp -r src/experience/scenes/NEW_PROJECT_TEMPLATE src/experience/scenes/my-project

# 2. Fill in manifest.ts (search for TODO)

# 3. Check completeness (requires ts-node)
npx ts-node -e "
  const { checkExperienceCompleteness, formatCompletenessReport } = require('./src/experience/authoring');
  const { experienceManifest } = require('./src/experience/scenes/my-project/manifest');
  console.log(formatCompletenessReport(checkExperienceCompleteness(experienceManifest)));
"

# 4. Register when complete — in registry.ts:
# import { registerExperience } from '../authoring';
# import { experienceManifest, sceneManifest } from '../scenes/my-project/manifest';
# registerExperience(experienceManifest, sceneManifest);
```

## Rules

- Do not register with `registerScene()` directly — use `registerExperience()`
- Do not set `status: 'complete'` until all narrative fields are authored and reviewed
- Do not set `deliveryStatus: 'delivered'` for assets not in `/public`
- The Fallback must render synchronously and must never throw
- Every `required: true` asset must be `deliveryStatus: 'delivered'` before integration

See `AUTHORING_GUIDE.md` for the full authoring workflow.
