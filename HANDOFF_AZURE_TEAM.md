# ProcessPanda Mobile — Azure integration handoff (13 Oct 2026)

This archive contains the **latest corrected Build 4 source** with the logo contrast adjustments applied. It is an **Expo SDK 53 / React Native prototype**, not a production-connected Azure client.

## Branding rule
- White/light backgrounds: use navy/dark ProcessPanda logo (`assets/images/processpanda-header-dark-tagline.png`).
- Navy/dark backgrounds: use white/light ProcessPanda logo (`assets/images/processpanda-login-logo.png` or `processpanda-header-light.png`).
- The demo home screen and Forgot Password screen have been adjusted accordingly. Verify contrast for any future screens.

## Notes for the Azure/Laravel team
- `app/demo/*` is **local demo-only**. It must be wired to authorised ProcessPanda staging APIs.
- `services/api.ts` still points to the **legacy Vidzpro demo URL**, not Azure. **Do not send production passwords or customer data to that URL.** Replace with environment-based staging and production ProcessPanda API configuration before login testing.
- No production API integration, server-side video completion protection, real certificates, or MCQs are present.
- `app/demo/[id].tsx` contains the correction for the previous syntax error.
- The approved card updates (assignment/completion timestamps, small red cross/green tick, 16:9 thumbnails) are requirements for the next connected build; **do not assume they are implemented here**.
- Remove any demo mode and test-only code from production releases after integration and testing.
- Coordinate on API ownership, staging test credentials shared securely, and a single maintained repository/codebase.

## For developer setup
Run npm install, use the compatible JDK/Android SDK, and follow BUILD4_NOTES.md. No `.env` credentials or node_modules are included.
