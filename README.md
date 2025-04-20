# OBS Dual‑Layout Countdown Overlay

A self‑contained overlay + control panel that alternates two blurred cross‑fade timers every 2 minutes.

## Quick start

1. **Fork / clone** this repo or create a new one and copy the files.
2. Commit & push to `main`.
3. Enable **GitHub Pages → Build from `/ (root)`**.
4. Your overlay URL will be:

```
https://<USERNAME>.github.io/<REPO>/index.html
```

5. In OBS, add a **Browser Source**  
   * URL: the link above  
   * Size: 1920×1080 (or 2560×1440 for ultrawide)  

6. Open `panel.html` in any browser. Choose UTC *date* & *time*, click **Apply**.  
   The overlay updates live (they share `localStorage` when served from the same origin).

## Files

| path | purpose |
|------|---------|
| `index.html` | overlay displayed in OBS |
| `panel.html` | simple controller UI |
| `style.css` / `script.js` | overlay styling + logic |
| `panel.css` / `panel.js` | panel styling + logic |
| `assets/` | logo + fonts |

No build step, just static hosting.