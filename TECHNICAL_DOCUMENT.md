# Vidzpro Mobile App — Technical Document

| Field | Value |
|--------|--------|
| **Product name** | Vidzpro |
| **Project folder** | `processpandaapp` |
| **Version** | 1.0.0 |
| **Platforms** | iOS, Android (Expo); web supported via Expo |
| **Document date** | 30 Sep 2026 |
| **Backend (demo)** | `https://demo.vausm.co.in/vidzpro-iso/public/api` |

---

## 1. Overview

Vidzpro is a cross-platform mobile application for **training / compliance video learning**. Users sign in, view their purchased plan on a dashboard, browse assigned videos by category, watch Vimeo-hosted content with progress tracking, mark videos complete, download certificates, and manage their profile.

The app is built with **Expo (SDK 53)** and **Expo Router** (file-based navigation) on **React Native 0.79** / **React 19**.

### Core user journey

```
Launch → Login → Dashboard → My Videos → Video Player
                              ↓              ↓
                           Profile      Mark Complete
                              ↓              ↓
                     Change Password   Generate Certificate
```

---

## 2. Technology Stack

| Layer | Technology | Version / notes |
|--------|------------|-----------------|
| Runtime | Expo | 53.0.19 |
| UI framework | React Native | 0.79.5 |
| UI library | React | 19.0.0 |
| Language | TypeScript | ~5.8.3 |
| Routing | expo-router | ~5.1.3 |
| Navigation | @react-navigation/* | Bottom tabs + native stack (via Expo Router) |
| HTTP client | axios | ^1.4.0 |
| Local storage | AsyncStorage | 2.1.2 |
| Video playback | react-native-webview | Vimeo Player embed |
| Orientation | expo-screen-orientation | Fullscreen video |
| Feedback | react-native-toast-message | Toasts |
| Icons | @expo/vector-icons (Ionicons) | Tab & UI icons |
| Builds | EAS Build | `eas.json` profiles |
| New Architecture | Enabled | `newArchEnabled: true` in `app.json` |

### App identity (`app.json`)

| Key | Value |
|-----|--------|
| name | Vidzpro |
| slug | vidzpro |
| scheme | vidzpro |
| Android package | `com.abc.vidzpro` |
| Orientation | Portrait (default) |
| Splash background | `#033337` |
| EAS projectId | `412f5da7-d078-4977-aea0-0e81ecc6bf7f` |

---

## 3. Project Structure

```
processpandaapp/
├── app/                          # Expo Router screens (file-based routes)
│   ├── _layout.tsx               # Root stack, SafeArea, StatusBar
│   ├── index.tsx                 # Boot redirect (auth gate stub)
│   ├── +not-found.tsx            # 404 screen
│   ├── (auth)/
│   │   ├── _layout.tsx           # Auth stack + Toast host
│   │   ├── Login.tsx
│   │   └── ForgotPassword.tsx
│   └── (app)/
│       ├── (tabs)/
│       │   ├── _layout.tsx       # Bottom tabs
│       │   ├── dashboard/index.tsx
│       │   ├── myvideos/index.tsx
│       │   └── profile/index.tsx
│       ├── myvideos/[videoId].tsx
│       └── profile/change-password.tsx
├── services/
│   └── api.ts                    # All REST API calls
├── components/                   # Mostly Expo template UI helpers
├── hooks/                        # Theme / color-scheme hooks (template)
├── constants/
│   └── Colors.ts                 # Light/dark palette (template)
├── assets/
│   ├── images/                   # logo, splash, dashboard image, icons
│   └── fonts/                    # SpaceMono-Regular.ttf
├── responsive.ts                 # Screen scaling helpers
├── package.json
├── app.json
├── eas.json
├── tsconfig.json                 # Path alias `@/*`
└── eslint.config.js
```

**Path alias:** `@/*` → project root (e.g. `@/services/api`, `@/responsive`).

---

## 4. Architecture

### 4.1 High-level

```
┌─────────────────────────────────────────────┐
│                 Mobile App                  │
│  Expo Router screens → StyleSheet UI        │
│           ↓                                 │
│     services/api.ts (axios)                 │
│           ↓                                 │
│  AsyncStorage (access_token)                │
└──────────────────┬──────────────────────────┘
                   │ HTTPS Bearer token
                   ▼
┌─────────────────────────────────────────────┐
│  Backend API (Laravel-style public/api)     │
│  demo.vausm.co.in/vidzpro-iso/public/api    │
└─────────────────────────────────────────────┘
                   │
                   ▼
            Vimeo (video CDN / player)
```

### 4.2 Design patterns in use

- **File-based routing** via Expo Router route groups `(auth)` and `(app)`
- **Flat service module** — all network I/O in `services/api.ts`
- **Local component state** — `useState` / `useEffect` / `useFocusEffect` (no Redux / Context yet)
- **Token-per-request** — Bearer token from AsyncStorage on authenticated calls
- **Responsive scaling** — dimensions normalized to iPhone X baseline (375×812)

### 4.3 What is not present

- Auth context / session provider
- SecureStore for tokens
- Shared axios instance, interceptors, or 401 handling
- Environment-based config (BASE_URL is hardcoded)
- Automated tests / CI scripts
- Dedicated design-system components (Button, Input, Header)

---

## 5. Navigation & Screens

### 5.1 Route map

| Route | File | Type | Description |
|-------|------|------|-------------|
| `/` | `app/index.tsx` | Redirect | Always → Login (auth check stubbed) |
| `/Login` | `app/(auth)/Login.tsx` | Screen | Email/password login |
| `/ForgotPassword` | `app/(auth)/ForgotPassword.tsx` | Screen | Password reset request |
| `/(app)/(tabs)/dashboard` | `dashboard/index.tsx` | Tab | Purchased plan / entry to videos |
| `/(app)/(tabs)/myvideos` | `myvideos/index.tsx` | Tab | Video list by category |
| `/(app)/(tabs)/profile` | `profile/index.tsx` | Tab | View/edit profile, logout |
| `/(app)/myvideos/[videoId]` | `myvideos/[videoId].tsx` | Stack | Vimeo player + complete |
| `/(app)/profile/change-password` | `change-password.tsx` | Stack | Change password form |

### 5.2 Tab bar

Configured in `app/(app)/(tabs)/_layout.tsx`:

| Order | Tab | Active icon | Inactive icon |
|-------|-----|-------------|---------------|
| 1 | Dashboard | `home` | `home-outline` |
| 2 | My Videos | `videocam` | `videocam-outline` |
| 3 | Profile | `person` | `person-outline` |

- Active tint: `#F9BC11`
- Inactive tint: `#fff`
- Background: `#033337`

### 5.3 Root layout

`app/_layout.tsx` wraps the app in:

- `GestureHandlerRootView`
- `SafeAreaProvider` / `SafeAreaView`
- StatusBar (`#033337`, light content)
- Root `Stack` with `headerShown: false`

---

## 6. Authentication & Session

### 6.1 Login flow

1. User submits email + password on `Login.tsx`
2. `loginUser()` → `POST /login`
3. On `success === 1`, `access_token` is stored in AsyncStorage key `access_token`
4. App navigates with `router.replace("/(app)/(tabs)/dashboard")`

### 6.2 Forgot password

1. User enters email on `ForgotPassword.tsx`
2. `forgotPassword()` → `POST /forgot-password`
3. Toast feedback; user returns to Login

### 6.3 Logout

Implemented on Profile screen (not the shared `logout()` helper):

1. Remove `access_token` from AsyncStorage
2. Navigate back to Login

> **Note:** `services/api.ts` exports a `logout()` that clears keys `token` / `user` (incorrect) and uses React Navigation `reset` (not Expo Router). Prefer the Profile implementation until that helper is fixed.

### 6.4 Session restore (current limitation)

`app/index.tsx` uses a placeholder `useAuth()` with:

```ts
isLoading = false
isLoggedIn = false
```

Cold start **always** redirects to Login even if a token exists. There is **no route guard** on `(app)/*` screens.

---

## 7. Feature Specifications

### 7.1 Dashboard

- Loads purchased plan via `getPurchasedPlan(token)`
- Displays static branding image (`dahsboardImage.png`); API `subscription_image_url` is fetched but not rendered
- Tap navigates to My Videos

### 7.2 My Videos

- Loads categories via `getVideoCategories()` (ToolBox + ISO groups)
- Lists videos via `getVideosByCategory(category, page)` with pagination
- Caches category lists in local state; refreshes on focus (`useFocusEffect`)
- Shows completion badges
- Certificate download modal → `generateCertificate(type)`
- Optional “View Tutorials” WebView (hardcoded Vimeo)

### 7.3 Video detail / player

- Route param: `videoId`
- Loads detail via `getVideoDetail(video_id)`
- Embeds Vimeo in `WebView` with injected JS to discourage seeking ahead
- Tracks playback progress percentage
- Confirm modal → `getVideoWatchedStatus(video_id)` (mark watched/complete)
- Stores local acknowledgement flag `video_acknowledged_*` in AsyncStorage
- Uses `expo-screen-orientation` for fullscreen landscape

### 7.4 Profile

- Loads user via `getUserDetails(token)`
- Editable: first name, last name, phone
- Read-only: email
- Update via `updateUserProfile`
- Link to Change Password
- Logout with short delay before navigation

### 7.5 Change password

- Fields: current, new, confirm
- Client validation (e.g. min length 6, match confirm)
- `changePassword()` → `POST /change-password`

---

## 8. API Layer

**File:** `services/api.ts`  
**Base URL:** `https://demo.vausm.co.in/vidzpro-iso/public/api` (hardcoded)

### 8.1 Endpoints

| Function | Method | Path | Auth | Purpose |
|----------|--------|------|------|---------|
| `loginUser` | POST | `/login` | No | Authenticate; store token |
| `forgotPassword` | POST | `/forgot-password` | No | Send reset link |
| `getUserDetails` | POST | `/user-details` | Bearer | Profile data |
| `getPurchasedPlan` | POST | `/user/purchased-plan` | Bearer | Dashboard plan |
| `getVideoCategories` | POST | `/get-video-categories` | Bearer | Category lists |
| `getVideosByCategory` | POST | `/videos-by-category?page=` | Bearer | Paginated videos |
| `getVideoDetail` | POST | `/videos` | Bearer | Single video + metadata |
| `getVideoWatchedStatus` | POST | `/videos-watched-status` | Bearer | Mark / get completion |
| `generateCertificate` | POST | `/generate-certificate` | Bearer | Certificate PDF/URL |
| `updateUserProfile` | POST | `/user/update` | Bearer | Update name/phone |
| `changePassword` | POST | `/change-password` | Bearer | Update password |
| `logout` | — | — | Local only | Broken helper (see §6.3) |

### 8.2 Auth header

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### 8.3 Response conventions (inconsistent)

| Pattern | Used by |
|---------|---------|
| `success: 1 \| 0` | Login, Forgot password, Change password |
| `status: "1" \| "0"` | User details, Video detail, Watched status, Update profile |
| `status: number` / string | Purchased plan, categories, videos list, certificate |

Clients must handle each function’s shape individually.

### 8.4 Key TypeScript types (exported)

- `VideoCategory`, `VideoCategoryResponse`
- `Video`, `VideosByCategoryResponse`
- `VideoDetailResponse`, `VideoWatchedStatusResponse`
- `UpdateUserProfileResponse`, `ChangePasswordResponse`

---

## 9. UI, Theming & Responsiveness

### 9.1 Brand colors (in use)

| Role | Hex |
|------|-----|
| Primary / chrome | `#033337` |
| Accent / active | `#F9BC11` / `#fbc511` |
| Content background | White |

Colors are repeated in screen `StyleSheet`s (not centralized in a theme provider).

### 9.2 Responsive helper (`responsive.ts`)

Baseline: **375 × 812**.

| Helper | Behavior |
|--------|----------|
| `responsive.width(n)` | Horizontal scale |
| `responsive.height(n)` | Vertical scale |
| `responsive.fontSize(n)` | Min(width, height) scale |
| `responsive.margin` / `padding` / `borderRadius` | Horizontal scale |

`Dimensions.get('window')` is read once at module load (does not auto-update on rotation).

### 9.3 Fonts

Screens reference **NotoSans** (SemiBold / Medium / Regular), but `assets/fonts/` currently contains only **SpaceMono-Regular.ttf**, and root layout does not load custom fonts via `expo-font`. System fallbacks apply at runtime.

### 9.4 Template leftovers

`components/` and `hooks/` still contain Expo starter pieces (`ThemedText`, `HelloWave`, `ParallaxScrollView`, etc.) that feature screens largely do not use.

---

## 10. Build & Run

### 10.1 Prerequisites

- Node.js (LTS recommended)
- npm
- Expo CLI / `npx expo`
- iOS Simulator and/or Android emulator (or Expo Go / dev client)
- EAS CLI for cloud builds (`eas-cli`)

### 10.2 Local development

```bash
npm install
npx expo start          # or: npm start
npx expo start --android
npx expo start --ios
npx expo start --web
npm run lint
```

### 10.3 EAS build profiles (`eas.json`)

| Profile | Purpose |
|---------|---------|
| `preview` | Android APK |
| `preview2` | Android `:app:assembleRelease` |
| `preview3` | Development client |
| `production` | Production defaults |

Example:

```bash
eas build --profile preview --platform android
eas build --profile production --platform all
```

---

## 11. Data Storage (client)

| Key | Storage | Purpose |
|-----|---------|---------|
| `access_token` | AsyncStorage | API Bearer token |
| `video_acknowledged_*` | AsyncStorage | Local “confirmed watched” flags |

No SecureStore / Keychain / EncryptedSharedPreferences usage today.

---

## 12. Security Considerations

| Topic | Current state | Recommendation |
|-------|---------------|----------------|
| Credentials in client | Demo email/password prefilled in Login | Clear defaults; never ship secrets |
| Token storage | AsyncStorage (plaintext) | Use `expo-secure-store` |
| Session gate | Stubbed; no `(app)` guard | Check token on boot + protected layout |
| API base URL | Hardcoded demo host | Env / `expo-constants` extras |
| 401 handling | None | Axios interceptor → logout |
| WebView | `originWhitelist` permissive on player | Tighten if possible |
| Logout helper | Wrong storage keys | Align with `access_token` + Expo Router |

---

## 13. Known Limitations & Tech Debt

1. Auth session restore not implemented (`app/index.tsx`)
2. No authenticated route protection
3. Hardcoded demo login credentials
4. Dashboard ignores API subscription image
5. Certificate category string mismatch risk (`iso 9001` vs `isovideos`)
6. Shared `logout()` helper inconsistent with Profile logout
7. `updateUserProfile` shadows the `accessToken` argument and re-reads AsyncStorage
8. Toast host not global (mounted mainly under auth / some screens)
9. Branding mismatch: folder name ProcessPanda vs app name Vidzpro; empty `owner` in `app.json`
10. Unused Expo template components and theme hooks
11. No unit/integration tests or typecheck script in `package.json`

---

## 14. Suggested Hardening Roadmap

| Priority | Item |
|----------|------|
| P0 | Implement real token check on boot + `(app)/_layout` redirect |
| P0 | Remove hardcoded credentials; empty login fields |
| P0 | Fix logout helper (keys + Expo Router) |
| P1 | Move token to SecureStore; env-based `BASE_URL` |
| P1 | Shared axios client + 401 interceptor |
| P1 | Fix dashboard image + certificate category mapping |
| P2 | Load brand fonts or remove NotoSans references |
| P2 | Global Toast provider; trim template dead code |
| P2 | Add lint/typecheck/test scripts and basic CI |

---

## 15. Glossary

| Term | Meaning |
|------|---------|
| ToolBox / ISO | Video category groups returned by the categories API |
| Vimeo Player | Embedded HTML5 player loaded inside React Native WebView |
| EAS | Expo Application Services — cloud builds and project config |
| Bearer token | `access_token` sent as `Authorization: Bearer …` |
| Route group | Expo Router folder like `(auth)` / `(app)` that does not appear in the URL path segment |

---

## 16. Document Control

| Version | Date | Notes |
|---------|------|--------|
| 1.0 | 30 Sep 2026 | Initial technical document from codebase review |

*This document describes the application as implemented in the repository at the date above. Backend API contracts may evolve independently of the mobile client.*
