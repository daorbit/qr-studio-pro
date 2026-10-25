# qr-studio-pro (QR Studio app)

This is the signed-in QR Studio web app. It started as a Lovable project and uses Vite 5, React 18, TypeScript, Tailwind 3, shadcn/ui (Radix), antd 6, Redux Toolkit and React Query.

## Commands

```bash
npm run dev       # vite on http://localhost:8080
npm run build     # production build to dist/
npm run lint      # eslint
npm run preview
```

Use npm. The repo also has bun lockfiles, but `package-lock.json` is the one to keep in sync. There are no tests.

## API

- `src/lib/api.ts` sets up the shared axios instance. `API_URL` is hardcoded to production (`https://be-qrstudio.daorbit.in/api`). To use the local backend, switch to `http://localhost:3000/api` and don't commit that change.
- The interceptors add `Bearer qc-token` from `localStorage`. They retry 408, 429 and 5xx responses and network errors with exponential backoff, except on sign-in and sign-up. On a 401 they clear auth and redirect to `/sign-in`.
- `src/lib/paymentApi.ts` handles the Razorpay checkout calls.
- Always call the backend through the axios instance in `src/lib/api.ts` or `src/lib/paymentApi.ts`. Don't create new axios or fetch clients.

## Structure

- `src/App.tsx` sets up the providers (Redux, React Query, ThemeProvider, SubscriptionProvider and antd `ConfigProvider` themed from the current theme) and the lazy-loaded routes. Wrap protected pages in `ProtectedRoute` and admin pages in `AdminRoute`.
- `src/pages/` holds the route pages. `pages/redirector/` is the public scan page and has its own `components/`, `hooks/` and `utils/`. `pages/settings/` holds the settings tabs.
- `src/components/`:
  - `ui/`: shadcn primitives. Don't edit them unless you have to. Add new ones with the shadcn CLI (`components.json`).
  - `qr/`: the QR editor (style, colors, shape, logo, frame, templates, preview, content editor)
  - `analytics/`, `dashboard/`, `admin/` (+ `admin/subscription/`), `payment/`, `settings/`, `layout/`, `common/`, `mobile/` (mobile versions of the editor and settings)
- `src/store/` holds the Redux store and typed `useAppDispatch` and `useAppSelector`. The slices are auth, qrCodes, ui, analytics, contacts, qrAnalytics, stats and admin.
- `src/hooks/` holds hooks that wrap the slices and API calls (`useAuth`, `useQRCodes`, `useAnalytics`, `usePayment`, `useAdminData`, ...). Components should use these hooks instead of dispatching thunks directly.
- `src/context/` holds `ThemeContext` (color theme and light/dark/system mode, saved to `localStorage` and the user profile) and `SubscriptionContext` (current plan, limits and trial state).
- `src/lib/`: `qrUtils.ts` and `qrDownload.ts` handle QR rendering and export with `qr-code-styling`, `html-to-image` and `html2canvas`. `utils.ts` has `cn()`. `config.ts` has `getAppOrigin()`.
- `src/utils/` holds formatters for dates, currency and time, plus color and password helpers.
- `src/types/` holds the shared types for `qrcode`, `analytics` and `payment`.

## Conventions

- Use the `@/` alias for `src/`.
- Style with Tailwind and the theme CSS variables in `index.css` and `tailwind.config.ts`. Don't use inline styles. Don't add comments to CSS files.
- Use shadcn components for UI first. antd is used where it already appears (tables, admin, some inputs), and its theme follows the current theme through `ConfigProvider`.
- Look in `components/common`, `hooks/` and `utils/` before you write a new helper.
- Feature gating follows the backend plan features in `be-da-qr-studio/middleware/subscription.js`. Use `SubscriptionContext` and `useLimitReachedDialog` to show limit messages.
- `vercel.json` rewrites every path to `index.html`, so this is a pure SPA.
