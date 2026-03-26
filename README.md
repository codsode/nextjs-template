# Next.js Production Template

A production-grade Next.js template with modular feature architecture, authentication, responsive design, and testing.

## Tech Stack

- **Next.js 16.2** — App Router, Turbopack
- **React 19.2** — UI library
- **TypeScript 5.8** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **Zustand 5** — State management with persistence
- **React Hook Form + Zod** — Type-safe form validation
- **TanStack React Query** — Server state management
- **Vitest + React Testing Library** — Unit and component testing
- **ESLint + Prettier** — Code quality and formatting
- **Husky + lint-staged** — Pre-commit hooks

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                              # Thin pages — only routing, no logic
│   ├── (auth)/
│   │   ├── layout.tsx                # Uses AuthGuard mode="guest"
│   │   ├── login/page.tsx            # Renders <LoginScreen />
│   │   └── signup/page.tsx           # Renders <SignupScreen />
│   ├── (app)/
│   │   ├── layout.tsx                # Uses AuthGuard mode="protected" + Navbar/Footer
│   │   └── home/page.tsx             # Renders <HomeScreen />
│   ├── layout.tsx                    # Root layout with Providers
│   ├── page.tsx                      # Root redirect
│   ├── error.tsx                     # Error boundary
│   ├── not-found.tsx                 # 404
│   └── globals.css
│
├── features/                         # Business logic — screens, hooks, schemas
│   ├── auth/
│   │   ├── screens/                  # LoginScreen, SignupScreen (full page content)
│   │   ├── components/               # AuthGuard, LoginForm, SignupForm
│   │   ├── hooks/                    # useAuth
│   │   ├── schemas/                  # Zod validation schemas
│   │   └── types/                    # User, Tokens
│   └── home/
│       ├── screens/                  # HomeScreen
│       └── components/               # FeatureCard
│
├── components/                       # Shared UI primitives (no business logic)
│   ├── ui/                           # Button, Card, InputField, LoadingSpinner
│   └── layout/                       # Navbar, Footer
│
├── store/                            # Global state (Zustand)
│   └── slices/                       # Auth slice
├── providers/                        # React providers (Query, Toast)
├── lib/                              # Pure utilities (cn, toast, storage)
├── config/                           # Site config
└── middleware.ts                     # Auth redirects at edge
```

### Architecture Rules

- **`app/` pages are thin** — they import a screen component and render it. No business logic.
- **`features/` owns all logic** — screens, forms, hooks, schemas, types live here.
- **`components/` is pure UI** — reusable primitives with no business logic or store access.
- **Each feature is self-contained** — has its own screens, components, hooks, schemas, types.

## Authentication Flow

| Route     | Access    | Description             |
| --------- | --------- | ----------------------- |
| `/`       | Public    | Redirects based on auth |
| `/login`  | Public    | Login page              |
| `/signup` | Public    | Signup page             |
| `/home`   | Protected | Home dashboard          |

- **Middleware** redirects at the edge
- **AuthGuard** component provides client-side defense-in-depth
- **Cookie sync** keeps middleware and client state aligned

## Available Scripts

```bash
npm run dev           # Dev server (Turbopack)
npm run build         # Production build
npm start             # Production server
npm run lint          # ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Prettier format
npm run format:check  # Check formatting
npm run type-check    # TypeScript check
npm run test          # Run tests
npm run test:watch    # Tests in watch mode
npm run test:coverage # Tests with coverage
```

## Connecting Your API

Replace the demo logic in `src/features/auth/screens/login-screen.tsx`:

```typescript
const onSubmit = async (data: LoginFormData) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await response.json();
  await handleLogin(result.user, result.tokens);
};
```

## Adding a New Feature

```
src/features/my-feature/
├── screens/          # Full page content components
├── components/       # Feature-specific widgets
├── hooks/            # Feature-specific hooks
├── schemas/          # Zod validation schemas
├── types/            # TypeScript types
└── index.ts          # Public API barrel
```

Then create a thin page in `src/app/`:

```tsx
import { MyFeatureScreen } from '@/features/my-feature';

export default function MyFeaturePage() {
  return <MyFeatureScreen />;
}
```

## Responsive Design

Mobile-first with Tailwind breakpoints:

- **Mobile** (default): < 640px
- **Tablet** (`sm:`): 640px+
- **Desktop** (`lg:`): 1024px+
- **Wide** (`xl:`): 1280px+
