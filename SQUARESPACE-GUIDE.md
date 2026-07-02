# 🌐 Squarespace Deployment Guide

Complete step-by-step guide to deploy your interactive mirror-breaking invitation on Squarespace.

## 📋 Prerequisites

- Squarespace website (any plan)
- GitHub account (free) OR Netlify account (free)
- Your album artwork ready
- Show details finalized

## 🎯 Recommended Method: GitHub Pages + iframe

This is the easiest and most reliable method for Squarespace integration.

### Step 1: Prepare Your Files

1. **Add your album artwork:**
   - Place your album cover at `assets/album-art.jpg`
   - Recommended: 1000x1000px, JPG or PNG

2. **Configure show details:**
   - Open `mirror-break.js`
   - Find lines 35-40
   - Update with your information:

```javascript
this.config = {
    ticketURL: 'https://your-actual-ticket-link.com',
    showDate: 'Saturday, June 15, 2026',
    showTime: '8:00 PM',
    showVenue: 'The Underground, Brooklyn'
};
```

3. **Test locally:**
   - Open `index.html` in your browser
   - Click through the entire experience
   - Verify everything works

### Step 2: Create GitHub Repository

1. **Install Git** (if not already installed):
   - Mac: Already installed or use Homebrew
   - Windows: Download from [git-scm.com](https://git-scm.com)

2. **Open Terminal/Command Prompt** and navigate to your project:
```bash
cd /path/to/album-preview-invite
```

3. **Initialize Git repository:**
```bash
git init
git add .
git commit -m "Initial commit - Album preview invitation"
```

4. **Create repository on GitHub:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name: `album-preview-invite`
   - Make it **Public**
   - Don't initialize with README (you already have one)
   - Click "Create repository"

5. **Push to GitHub:**
```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/album-preview-invite.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source":
   - Select branch: **main**
   - Select folder: **/ (root)**
   - Click **Save**
5. Wait 1-2 minutes for deployment
6. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/album-preview-invite/
   ```

### Step 4: Embed in Squarespace

1. **Log into Squarespace**
2. **Edit the page** where you want the invitation
3. **Add a Code Block:**
   - Click the **+** to add a block
   - Search for "Code"
   - Select **Code** block

4. **Paste this code:**

```html
<style>
  /* Make iframe responsive */
  .mirror-invite-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 100%; /* 1:1 aspect ratio */
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
      padding-bottom: 120%; /* Slightly taller on mobile */
    }
  }
</style>

<div class="mirror-invite-container">
  <iframe 
    src="https://YOUR-USERNAME.github.io/album-preview-invite/"
    allow="camera; microphone"
    allowfullscreen>
  </iframe>
</div>
```

5. **Replace `YOUR-USERNAME`** with your GitHub username
6. **Save** and **Publish** your Squarespace site

### Step 5: Test on Squarespace

1. Visit your Squarespace page
2. Test the full experience:
   - Click "START EXPERIENCE"
   - Allow/skip camera
   - Tap the mirror multiple times
   - Verify shatter animation
   - Check ticket link works
3. Test on mobile device
4. Test in different browsers

## 🎨 Alternative Method: Netlify

If you prefer not to use GitHub:

### Step 1: Deploy to Netlify

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire `album-preview-invite` folder onto the page
3. Wait for upload to complete
4. You'll get a URL like: `https://random-name-12345.netlify.app`

### Step 2: Custom Domain (Optional)

1. Click "Domain settings" in Netlify
2. Click "Add custom domain"
3. Follow instructions to connect your domain

### Step 3: Embed in Squarespace

Use the same iframe code as above, but replace the GitHub URL with your Netlify URL:

```html
<iframe 
  src="https://your-site.netlify.app/"
  allow="camera; microphone"
  allowfullscreen>
</iframe>
```

## 🔧 Customization Tips

### Change Mirror Size

In the iframe code, adjust `max-width`:

```css
.mirror-invite-container {
  max-width: 600px; /* Smaller */
  /* or */
  max-width: 1000px; /* Larger */
}
```

### Add Padding Around Mirror

```css
.mirror-invite-container {
  padding: 40px 20px; /* Top/bottom, left/right */
}
```

### Center on Page

The code already centers the mirror, but you can adjust:

```css
.mirror-invite-container {
  margin: 60px auto; /* More space above/below */
}
```

## 📱 Mobile Optimization

The experience is already mobile-optimized, but you can fine-tune:

### Adjust Mobile Height

```css
@media (max-width: 768px) {
  .mirror-invite-container {
    padding-bottom: 110%; /* Adjust this percentage */
  }
}
```

### Hide on Mobile (if needed)

```css
@media (max-width: 768px) {
  .mirror-invite-container {
    display: none;
  }
}
```

## 🔒 HTTPS & Camera Access

**Important:** Camera access requires HTTPS.

- ✅ GitHub Pages: Automatic HTTPS
- ✅ Netlify: Automatic HTTPS
- ✅ Squarespace: Automatic HTTPS
- ⚠️ Custom domains: Ensure SSL certificate is active

If camera doesn't work:
1. Check browser console for errors
2. Verify HTTPS is active (look for padlock in address bar)
3. Test in different browser
4. Users can always skip camera and use placeholder

## 🎯 SEO & Social Sharing

### Add Meta Tags

Create a new file `meta-tags.html` in your project:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://your-site.com/invite">
<meta property="og:title" content="Break the Mirror - Exclusive Album Preview">
<meta property="og:description" content="You're invited to an exclusive album preview show. Break the mirror to reveal your invitation.">
<meta property="og:image" content="https://your-site.com/assets/album-art.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://your-site.com/invite">
<meta property="twitter:title" content="Break the Mirror - Exclusive Album Preview">
<meta property="twitter:description" content="You're invited to an exclusive album preview show. Break the mirror to reveal your invitation.">
<meta property="twitter:image" content="https://your-site.com/assets/album-art.jpg">
```

Add these to the `<head>` section of `index.html`.

### Squarespace SEO Settings

1. Go to page settings
2. Set page title: "Exclusive Album Preview Invitation"
3. Set description: "Break the mirror to reveal your exclusive invitation"
4. Add your album artwork as page thumbnail

## 📊 Analytics Integration

### Google Analytics

1. Get your Google Analytics ID
2. Add to `index.html` before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

3. Track events in `mirror-break.js`:

```javascript
// After shatter (add to shatter() function)
if (typeof gtag !== 'undefined') {
    gtag('event', 'mirror_shattered', {
        'event_category': 'engagement',
        'event_label': 'taps_' + this.tapCount
    });
}

// When ticket button clicked
if (typeof gtag !== 'undefined') {
    gtag('event', 'ticket_click', {
        'event_category': 'conversion',
        'event_label': 'get_tickets'
    });
}
```

## 🐛 Common Issues & Solutions

### Issue: Camera permission not showing

**Solution:**
- Ensure HTTPS is active
- Check iframe has `allow="camera"` attribute
- Try in different browser
- Clear browser cache

### Issue: Iframe too small/large

**Solution:**
- Adjust `padding-bottom` percentage in CSS
- Test on actual devices, not just browser resize
- Use browser dev tools to inspect

### Issue: Sounds not playing

**Solution:**
- User must interact first (browser requirement)
- Check device volume
- Test in different browser
- Some browsers block audio in iframes

### Issue: Shards not animating

**Solution:**
- Check browser console for errors
- Reduce number of shards in code
- Test on actual device
- Update browser to latest version

### Issue: Page not updating after changes

**Solution:**
1. Make changes to files
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Update configuration"
git push
```
3. Wait 1-2 minutes for GitHub Pages to rebuild
4. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

## 🔄 Updating Your Site

To make changes after deployment:

1. **Edit files locally**
2. **Test changes** by opening `index.html`
3. **Commit and push:**
```bash
git add .
git commit -m "Description of changes"
git push
```
4. **Wait 1-2 minutes** for GitHub Pages to update
5. **Clear cache** and test on Squarespace

## 📞 Support Checklist

Before asking for help:

- [ ] Tested locally (open `index.html` in browser)
- [ ] Verified album artwork is in correct location
- [ ] Updated show details in `mirror-break.js`
- [ ] Pushed latest changes to GitHub
- [ ] Waited 2+ minutes for GitHub Pages to update
- [ ] Cleared browser cache
- [ ] Tested in different browser
- [ ] Checked browser console for errors (F12)
- [ ] Verified HTTPS is active
- [ ] Tested on actual mobile device

## 🎉 Launch Checklist

Before going live:

- [ ] Album artwork added and looks good
- [ ] Show details updated (date, time, venue)
- [ ] Ticket link tested and working
- [ ] Easter eggs customized (optional)
- [ ] Tested on desktop browser
- [ ] Tested on mobile device
- [ ] Tested camera permission flow
- [ ] Tested with camera allowed
- [ ] Tested with camera denied
- [ ] Verified audio works
- [ ] Checked all animations smooth
- [ ] Tested ticket button link
- [ ] Tested replay button
- [ ] Verified responsive on different screen sizes
- [ ] Checked in multiple browsers
- [ ] Analytics set up (optional)
- [ ] Social sharing tested (optional)

## 🚀 You're Ready!

Your interactive mirror-breaking invitation is now live on Squarespace. Share the link with your fans and watch them break the mirror to reveal their exclusive invitation!

---

**Need help?** Check the main README.md for troubleshooting tips.

Made with 🎸 by Bob