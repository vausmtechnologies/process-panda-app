# ProcessPanda Mobile — Stage One

## Scope delivered in this source package
- Replaced Vidzpro visible app identity with ProcessPanda in the Expo display name, login/forgot password branding, splash art, app launcher art, and main screens.
- Applied dark navy `#061326`, ProcessPanda green `#36A946`, and yellow `#FFBD0B` accent throughout the original screens.
- Redesigned employee landing view to prioritise opening **My Training**, rather than using the obsolete Vidzpro purchased-plan artwork.
- Renamed primary navigation **Home / My Training / Profile** and increased bottom-navigation touch space.
- Removed prefilled demo email/password from login.
- Existing video, completion and certificate API calls are intentionally untouched for Stage One.

## Important deployment / integration constraints
1. **Not a production-ready APK.** This package contains modified source, not a compiled or device-tested application.
2. The original demonstration backend URL is still hardcoded in `services/api.ts`. Obtain the live ProcessPanda API URL and matching authentication/video/completion/certificate contracts before connecting real accounts.
3. The original Android package ID `com.abc.vidzpro` and EAS project ID are deliberately preserved until app-store ownership, signing and update-path decisions are confirmed. They must not be blindly changed if this replaces an existing app.
4. Original Expo auth/session vulnerabilities and completion validation are not fixed by a visual rebrand. Hardening and end-to-end testing are prerequisites before customer release.
5. The provided logo artwork was extracted from the screenshots. Replace with the approved high-resolution transparent ProcessPanda logo/icon before store submission.
6. The existing application does not implement Evaluation of Effectiveness (MCQ). This is outside Stage One; completing a video must remain consistent with server rules.
7. No product/admin menus from the web screenshots are introduced into this employee app.

## Run
`npm install` then `npx expo start`. Test on iOS and Android after connecting the intended API.
