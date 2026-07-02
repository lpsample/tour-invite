# 🚀 Deploy Your Mirror Invitation - Step by Step

Your code is ready! Follow these steps to get it live.

## ✅ Step 1: Create GitHub Repository (Do This Now)

1. **Go to GitHub:** https://github.com/new

2. **Fill in the form:**
   - Repository name: `album-preview-invite`
   - Description: `Interactive mirror-breaking invitation for album preview show`
   - Make it **Public** (required for free GitHub Pages)
   - **DO NOT** check "Add a README file" (you already have one)
   - **DO NOT** add .gitignore or license
   - Click **"Create repository"**

## ✅ Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. **Ignore those** and run these instead:

```bash
cd /Users/lindseysample/Documents/GitHub/album-preview-invite
git remote add origin https://github.com/lpsample/album-preview-invite.git
git push -u origin main
```

**If prompted for credentials:**
- Username: `lpsample`
- Password: Use a **Personal Access Token** (not your GitHub password)
  - Get one here: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Give it a name like "album-invite"
  - Check "repo" scope
  - Generate and copy the token
  - Use this as your password

## ✅ Step 3: Enable GitHub Pages

1. Go to your repository: https://github.com/lpsample/album-preview-invite

2. Click **Settings** (top right)

3. Click **Pages** (left sidebar)

4. Under "Source":
   - Branch: Select **main**
   - Folder: Select **/ (root)**
   - Click **Save**

5. Wait 1-2 minutes, then refresh the page

6. You'll see: "Your site is live at https://lpsample.github.io/album-preview-invite/"

## ✅ Step 4: Test Your Live Site

Visit: **https://lpsample.github.io/album-preview-invite/**

Test everything:
- [ ] Click "START EXPERIENCE"
- [ ] Camera permission prompt appears
- [ ] Mirror shows reflection or placeholder
- [ ] Tap the mirror 10-15 times
- [ ] Cracks appear and build up
- [ ] Mirror shatters dramatically
- [ ] Album art appears
- [ ] Show details are correct
- [ ] Ticket button links to Bitter End

## ✅ Step 5: Embed in Squarespace

1. **Log into Squarespace**

2. **Edit your page** where you want the invitation

3. **Add a Code Block:**
   - Click **+** to add content
   - Search for "Code"
   - Select **Code** block

4. **Paste this code:**

```html
<style>
  .mirror-invite-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
    padding-bottom: 100%;
  }
  
  .mirror-invite-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  
  @media (max-width: 768px) {
    .mirror-invite-container {
      padding-bottom: 120%;
    }
  }
</style>

<div class="mirror-invite-container">
  <iframe 
    src="https://lpsample.github.io/album-preview-invite/"
    allow="camera; microphone"
    allowfullscreen>
  </iframe>
</div>
```

5. **Save** and **Publish** your Squarespace site

6. **Test on Squarespace** - visit your page and try the experience

## 🎉 You're Live!

Your interactive mirror invitation is now live at:
- **Direct link:** https://lpsample.github.io/album-preview-invite/
- **Embedded:** On your Squarespace site

Share the link with your fans! 🎸

---

## 🔄 Making Updates Later

If you need to change anything:

1. Edit the files locally
2. Test by opening `index.html` in your browser
3. Commit and push changes:
```bash
cd /Users/lindseysample/Documents/GitHub/album-preview-invite
git add .
git commit -m "Update show details"
git push
```
4. Wait 1-2 minutes for GitHub Pages to update
5. Clear your browser cache and test

---

## 🐛 Troubleshooting

**Can't push to GitHub?**
- Make sure you created the repository first
- Use a Personal Access Token, not your password
- Check your internet connection

**GitHub Pages not working?**
- Wait 2-3 minutes after enabling
- Make sure repository is Public
- Check Settings → Pages shows "Your site is published"

**Camera not working?**
- GitHub Pages uses HTTPS automatically (required for camera)
- Users can skip camera and use placeholder
- Test in different browsers

**Need help?**
- Check the main README.md
- Review SQUARESPACE-GUIDE.md
- Check browser console (F12) for errors

---

**Ready to deploy?** Start with Step 1 above! 🚀