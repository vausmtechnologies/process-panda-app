# ProcessPanda — Stage One Demo Build 3 (Login Branding)

Changes from Demo Build 2:

- Correct ProcessPanda white/green full logo provided by the customer. Trimmed transparent margins and displayed with `resizeMode="contain"` so the symbol and name fit without cropping.
- Removed duplicate hand-rendered brand name under the symbol in login screen.
- Retained ProcessPanda navy login background and the **green** `#36A946` Login and Enter Demo Mode buttons and Forgot Password link.
- Made Forgot Password back arrow and password-reset action green, rather than gold.
- Included the supplied horizontal light and dark header variants as assets for later screens (not automatically applied).
- Preserved the self-contained demo experience and all previously implemented training flows.

## Running

Extract to a fresh project directory. `npm install`, then `npx expo run:android` with your established Java 17/Android SDK emulator setup. If a native app with the same package is already installed, the build can replace it. Save any old demo state first; native reinstall can remove local test data.

For later JavaScript-only styling updates, Metro fast refresh is often sufficient. Changes to the native icon/splash need a native rebuild.

This source archive is syntax/structure reviewed but has **not** been compiled or run on a local Android emulator in this environment. Production API connection and real completions are not included.
