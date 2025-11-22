# Next.js Template with Auth

A minimal Next.js boilerplate with authentication, protected routes, and Zustand store.

## Features

- ✅ Authentication (Login/Signup)
- ✅ Protected Routes
- ✅ Zustand State Management
- ✅ Tailwind CSS
- ✅ TypeScript
- ✅ Form Validation (Zod)
- ✅ Toast Notifications
- ✅ API Client (Axios)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Test Login
- Route: `/login` - Try the demo login
- Route: `/signup` - Create account
- Route: `/home` - Protected home page (requires login)

## Folder Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth routes
│   ├── (app)/             # Protected routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root redirect
├── components/
│   ├── layout/           # Navbar
│   ├── screen/           # Pages (Login, Signup, Home)
│   └── ui/               # UI Components (Button, Input)
├── api/                  # API config
├── models/               # Data models
├── store/                # Zustand store
├── constants/            # Constants
├── hooks/                # React hooks
└── utils/                # Utilities
```

## Authentication Flow

### Routes
- `/` - Redirects to `/login` or `/home`
- `/login` - Login page
- `/signup` - Signup page
- `/home` - Protected home page

### Protected Route Wrapper
All routes in `(app)` group are protected. If not authenticated, user is redirected to `/login`.

## State Management

### Zustand Store
```typescript
import { useAppStore } from '@/store';

const { user, isAuthenticated, login, logout } = useAppStore();
```

### Available Methods
- `login(user, tokens)` - Login
- `logout()` - Logout
- `setLoading(bool)` - Loading state
- `clearError()` - Clear errors

## Connecting Your API

Edit `src/app/(auth)/login/page.tsx`:

```typescript
const handleLogin = async (email: string, password: string) => {
  // Call your API
  const response = await apiClient.post('/auth/login', { email, password });
  
  // Store user & tokens
  await login(response.data.user, response.data.tokens);
};
```

## Customizing User Model

Edit `src/models/user-modal.ts`:

```typescript
export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  // Add your custom fields
  createdAt: z.date(),
  updatedAt: z.date(),
});
```

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint
```

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Zustand
- Zod
- Axios
- React Toastify

---

Ready to build? Start by editing `/src/app/(auth)/login/page.tsx` to connect your API!
