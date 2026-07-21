# GitHub Pages Status Check

## URL
https://kudigotdis.github.io/bwnationalmuseumapp/

## Expected: Botswana National Museum mobile web app

## Check these (in order):

### 1. DNS / HTTP Response
```bash
curl -sI https://kudigotdis.github.io/bwnationalmuseumapp/
```
**Expected:** HTTP/2 **200** OK

### 2. Actions Build Status
Go to: https://github.com/Kudigotdis/bwnationalmuseumapp/actions
Look for **"pages build and deployment"** workflow — should have a green checkmark

### 3. Browser Test (incognito/private window)
- Open URL in **incognito/private** window (avoids cache)
- Expected: Botswana National Museum app should load
- If blank: open DevTools (F12) → **Console** tab → look for errors
- If 404: hard refresh with Ctrl+Shift+R

### 4. If still not working
- Go to repo **Settings** → **Pages**
- Verify: Source = **"Deploy from a branch"**
- Branch = **main**
- Folder = **/ (root)**
- Click **Save** to retrigger deployment if needed

### 5. Hard Reset (if all else fails)
Delete the existing Pages config, re-save it, then trigger a new push:
```bash
git commit --allow-empty -m "Trigger Pages rebuild"
git push
```

## Notes
- First deployment: 2026-07-21
- Main file renamed: `museum_app_unified.html` → `index.html`
- First GitHub Pages deployment can take 10-30 minutes for CDN propagation
- If DNS resolves but connection times out, it's still propagating
