# Dark Mode Init

Dark Mode Init is a minimal Firefox and Chrome/Chromium extension that toggles a simple dark mode filter on the currently active page.

## Why it uses minimal permissions

This extension follows the standard least-privilege model:

- `activeTab` grants temporary access only to the page the user is actively viewing after they click the extension.
- `scripting` is used to inject or remove the dark mode style on that page.

This avoids broad site access warnings during install.

## Behavior

- Click the extension popup to enable dark mode on the current page.
- Click it again to disable dark mode on the current page.
- The effect applies only to the page the user has explicitly invoked the extension on.
- Restricted browser pages such as `about:` and `chrome://` pages are not supported.

## Tradeoff

Because the extension does not request `"<all_urls>"` host access, it does not automatically persist across every site and navigation. That is an intentional security and UX tradeoff.

If persistent dark mode across all pages is required, the extension would need broader host permissions, which may trigger install warnings.

## Development

### Firefox

1. Open `about:debugging`.
2. Select **This Firefox**.
3. Click **Load Temporary Add-on**.
4. Select `manifest.json` in this directory.

Temporary add-ons are removed when Firefox exits. For a normal permanent install,
the extension must be submitted to Mozilla for signing (either listed on AMO or
signed as an unlisted self-distributed add-on).

When packaging manually, ZIP the files *inside* this directory so that
`manifest.json` is at the root of the ZIP, rather than zipping the directory itself.

### Chrome/Chromium

1. Download / clone repo
2. Open `chrome://extensions`.
3. Enable Developer mode.
4. Click `Load unpacked`.
5. Select this project directory. (darkmodeinit)

## Files

- `manifest.json`: Extension manifest and permissions.
- `popup.html`: Popup UI.
- `popup.js`: Current-page dark mode toggle logic.
