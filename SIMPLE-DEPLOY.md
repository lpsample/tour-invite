# 🚀 Super Simple Deploy Guide

Your code is ready! Just follow these 3 steps.

## Step 1: Create GitHub Repository (Web Browser)

1. Go to: https://github.com/new
2. Repository name: `album-preview-invite`
3. Make it **Public** ✓
4. **DO NOT** check any boxes (no README, no .gitignore)
5. Click **Create repository**

## Step 2: Push Your Code (Terminal - One Time Only)

Copy and paste these commands into Terminal:

```bash
cd /Users/lindseysample/Documents/GitHub/album-preview-invite
git remote add origin https://github.com/lpsample/album-preview-invite.git
git push -u origin main
```

If asked for credentials:
- Username: lpsample
- Password: Use a Personal Access Token from https://github.com/settings/tokens

## Step 3: Enable GitHub Pages (Web Browser)

1. Go to: https://github.com/lpsample/album-preview-invite/settings/pages
2. Under "Source":
   - Branch: Select **main**
   - Folder: **/ (root)**
   - Click **Save**
3. Wait 2 minutes
4. Your site will be live at: https://lpsample.github.io/album-preview-invite/

## 🎉 Done!

Test it at: https://lpsample.github.io/album-preview-invite/

Then embed in Squarespace with this iframe code:

```html
<iframe 
  src="https://lpsample.github.io/album-preview-invite/"
  width="100%" 
  height="800px"
  style="border:none;"
  allow="camera">
</iframe>
```

## Future Updates

After this initial setup, you CAN use GitHub Desktop:
1. File → Add Local Repository
2. Choose: /Users/lindseysample/Documents/GitHub/album-preview-invite
3. Make changes, commit, and push!
