# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start dev server (Turbopack, port 3000)
npm run build         # Production build
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier format all files
npm run format:check  # Prettier check only
npm run type-check    # TypeScript check (tsc --noEmit)
npm run test          # Run all tests (vitest run)
npm run test:watch    # Tests in watch mode
npm run test:coverage # Tests with v8 coverage
```

Run a single test file: `npx vitest run src/components/ui/button.test.tsx`

## Architecture

**Next.js 16.2 App Router** with `[locale]` segment for i18n (next-intl). All pages live under `src/app/[locale]/`. The proxy at `src/proxy.ts` handles locale detection (Next.js 16 renamed middleware → proxy).

### Routing Layout

```
src/app/layout.tsx              → Root: html, body, fonts
src/app/[locale]/layout.tsx     → Locale: NextIntlClientProvider + Providers
src/app/[locale]/(auth)/        → Guest-only routes (login, signup) via AuthGuard mode="guest"
src/app/[locale]/(app)/         → Protected routes (home, showcase) via AuthGuard mode="protected"
```

### Feature-Based Modules

Business logic lives in `src/features/{name}/` with this structure:

- `screens/` — full-page components (what pages render)
- `components/` — feature-specific widgets
- `hooks/` — custom hooks (including TanStack Query mutations)
- `schemas/` — Zod validation with `createXxxSchema(messages)` factory pattern
- `services/` — API calls via axios
- `types/` — TypeScript interfaces

**Pages are thin** — they only import and render a screen component. All logic stays in features.

### Theme System

CSS variables defined in `src/app/globals.css`, set at runtime by `ThemeProvider` (`src/providers/theme-provider.tsx`). Three palettes (blue/green/purple) × two modes (light/dark) defined in `src/config/themes/colors.ts`. All components use semantic Tailwind tokens (`bg-primary`, `text-foreground`, `border-border`) — never static color classes.

### State Management

Zustand store at `src/store/` with persist middleware. Auth slice syncs a `auth-token` cookie for the proxy to read.

### i18n

Translations in `translations/{locale}.json` (en, hi). Locales configured in `src/i18n/routing.ts`. Zod validation messages are translated via `getValidationMessages()` helper → `createLoginSchema(messages)` factory pattern.

**Every user-facing string must use `useTranslations()` — no static text in components.**

### API Layer

Axios client at `src/lib/api/client.ts` with auth token interceptor. TanStack React Query for mutations (`useLogin`, `useSignup` hooks). QueryClient factory at `src/lib/api/query-client.ts`.

## Key Conventions

- **Commits**: conventional commits enforced by commitlint (`feat:`, `fix:`, `docs:`, etc.)
- **Pre-commit**: husky runs lint-staged (ESLint + Prettier on staged files)
- **TypeScript**: strict mode, `@typescript-eslint/no-explicit-any` error, `consistent-type-imports` enforced
- **Imports**: use `@/*` path alias (maps to `src/*`)
- **Components**: `src/components/ui/` are pure UI primitives with no store access or business logic
- **Test mocks**: next-intl and next/navigation mocked globally in `src/__tests__/setup.ts`

## Project Rules (MUST FOLLOW)

### 1. No Static Colors — Ever

Never use hardcoded Tailwind color classes like `bg-blue-600`, `text-slate-900`, `border-red-400`, `text-gray-500` etc. Always use semantic theme tokens defined in `globals.css`:

```
✅ bg-primary, text-foreground, border-border, text-muted-foreground, bg-destructive
❌ bg-blue-600, text-slate-900, border-gray-200, text-red-600, bg-white
```

If a new semantic color is needed, add it to `src/config/themes/colors.ts` (all three palettes, both light and dark), map it in `globals.css` via `@theme inline`, then use the token.

### 2. No Static Text — Everything Localized

Never write user-facing text directly in components. Every string must come from `useTranslations()`:

```tsx
// ✅ Correct
const t = useTranslations('myFeature');
<h1>{t('title')}</h1>

// ❌ Wrong
<h1>Welcome Back</h1>
```

When adding new text:

1. Add the key to `translations/en.json` under the appropriate namespace
2. Add the Hindi translation to `translations/hi.json`
3. Use `useTranslations('namespace')` in the component

Zod validation messages must also be localized — use `getValidationMessages(useTranslations('auth.validation'))` with `createXxxSchema(messages)` factory pattern.

### 3. Tests Are Mandatory

Every new component and screen must have a co-located `.test.tsx` file. After writing code:

1. Create the test file next to the source file (e.g., `button.tsx` → `button.test.tsx`)
2. Run `npx vitest run path/to/file.test.tsx` to verify it passes
3. Run `npm run test` to confirm no regressions
4. Run `npm run type-check` to confirm TypeScript is clean

### 4. Reuse Before Creating

Before creating any new UI component:

1. Check `src/components/ui/` — does an existing component already solve this?
2. If a similar component exists, extend it with a new variant/prop instead of creating a duplicate
3. If truly new, follow the same pattern: `forwardRef`, `cn()` for classes, theme tokens, `aria-*` attributes, typed props interface
4. Export from `src/components/ui/index.ts`

### 5. Follow the Established Structure

New features must follow the exact same pattern:

```
src/features/{name}/
├── screens/          → Full page content (what app/ pages render)
│   ├── {name}-screen.tsx
│   └── index.ts
├── components/       → Feature-specific widgets
│   ├── {widget}.tsx
│   └── index.ts
├── hooks/            → Custom hooks, TanStack Query mutations
├── schemas/          → Zod schemas with createXxxSchema(messages) factory
├── services/         → API calls (xxxApi object with typed methods)
├── types/            → TypeScript interfaces
└── index.ts          → Public barrel (only export what outside consumers need)
```

Pages in `src/app/[locale]/` must be thin — import screen, render it, nothing else:

```tsx
import { MyScreen } from '@/features/myFeature';
export default function MyPage() {
  return <MyScreen />;
}
```

### 6. Optimal Code Quality

- Use the most efficient algorithm for the task — prefer O(n) over O(n²), avoid unnecessary re-renders
- Memoize expensive computations when appropriate
- Keep components focused — single responsibility
- Extract shared logic into hooks, not utility functions scattered across files
- Prefer `const` over `let`, never use `var`
- Use strict equality (`===`) always
- Use `type` imports: `import type { X } from 'y'`
- All functions must have explicit return types
- No `any` — use proper generics or `unknown` with type narrowing
