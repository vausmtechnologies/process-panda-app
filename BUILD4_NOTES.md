# ProcessPanda Build 4 — Pre-integration test

## Purpose
This is an **interactive local demo**, not a connected employee account. No authentication, assignments, video completions or certificates are written to Azure. Use **ENTER DEMO MODE** at login.

## Changes since Build 3
- Restored persistent bottom navigation: Home, My Videos, Training Record, Profile. Home accessible from all demo screens.
- Improved sample video list cards, with thumbnail support and explicit missing-thumbnail placeholders.
- Added Key Points area corresponding to existing ProcessPanda Description content.
- Added FAQ placeholder (no MCQ behaviour yet).
- Removed the 'Simulate video watched' shortcut. One known Vimeo URL from the supplied admin screenshot is used for Abrasive Wheels; this might not play if Vimeo embedding is restricted. Other records have no verified media URL and cannot be completed.
- Uses Vimeo Player SDK callbacks to unlock a confirmation button only on the player 'ended' event, with client-side forward seek prevention. This is NOT tamperproof; final security/completion validation belongs on the backend.
- Local demo training record displays only explicitly confirmed training. Official PDF generation is not implemented, because the true certificate is server-generated.

## Installation on Windows
Use a **new folder** e.g. `C:\Process Panda 4`; select JDK 17 in the PowerShell session. Start Pixel emulator. Then:
```powershell
npm.cmd install
$env:ANDROID_HOME = 'C:\Users\tarri\AppData\Local\Android\Sdk'
```
Note: the `android` folder doesn't exist before prebuild; easiest reliable procedure:
```powershell
npx.cmd expo prebuild --platform android
('sdk.dir=' + $env:ANDROID_HOME.Replace('\','/')) | Set-Content '.\android\local.properties'
npx.cmd expo run:android
```
Run expo on free port 8081 by stopping old dev server.

## Not yet delivered
- Real login through ProcessPanda Azure/Laravel staging API
- Real assignment filtering and video thumbnails for all video records
- Existing two-page certificate PDF retrieval
- Real progress validation, server completion and MCQs
- Device-verified Android/iOS build
