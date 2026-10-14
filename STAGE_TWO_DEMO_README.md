# ProcessPanda employee mobile — Demo Build 2

This is a source-code-only local UI testing build, **not** an APK. It is based on the prior Stage One source archive with an additional, self-contained demo route.

## What changed

- Login screen now includes **ENTER DEMO MODE**. No email/password needed.
- Demo mode provides Home, My Training, Training Detail, Training Record and Profile.
- Sample assigned training includes one initially completed record and four pending records.
- Completion samples persist locally in AsyncStorage and can be reset on the demo Profile screen.
- Demo training and record displays are labelled as simulations; no production or old demonstration APIs are called by the demo screens.
- The Vimeo iframe is a **preview of the existing project's tutorial URL**, not a real assigned training video. The **Simulate video watched** control is not watch-duration validation.
- No real certificates are issued; the training record screen explicitly labels its entries as demo previews.
- Login accent and Home CTA were changed from gold to ProcessPanda green.
- Root navigation declarations were updated for the actual route groups.
- Source package declares SDK 53 compatible baseline packages and includes the `expo-asset` and `query-string` dependencies observed missing during emulator testing.

## Install on Windows

1. **Back up** `C:\Process Panda` before changing it.
2. Extract this archive into a **new** folder, e.g. `C:\Process Panda Demo 2`. Do not copy `android`, `android-old`, `node_modules` or `.expo` folders over from your old build.
3. Open PowerShell in that new folder, ensure Java 17 and ANDROID_HOME are selected as in the previous setup.
4. Run `npm.cmd install`. If npm reports dependency conflicts, stop and provide the full error; do not use `--force`.
5. Run `npx.cmd expo-doctor` and address compatibility problems before building.
6. Run `npx.cmd expo run:android` with the Pixel emulator started. Native build regeneration will occur on the first run.
7. Tap **ENTER DEMO MODE** on the login screen.

## Deliberate limits

This source bundle has not been verified on your local Windows emulator and is not production ready. Real video access, user assignment, actual completion rules, certificates, and backend login remain outside this demo. The original legacy API remains in the non-demo screens. Do not use production credentials in this development build.

### Existing unrelated concerns

Legacy app uses non-secure token storage, hardcoded API base URL and some non-demo navigation paths. A real security and production upgrade will be needed before release. SDK 53 is an interim compatibility choice only.
