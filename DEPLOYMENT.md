# Deployment Guide - Click Magazine Archive

This guide will help you deploy the Click Magazine Archive website to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed locally
- The click-archive repository

## Method 1: Deploy from Branch (Recommended)

This is the simplest method and uses GitHub's built-in Pages feature.

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
cd /Users/bz0r7y/private/NBR/code/magazine-archive/click-archive
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Click Magazine Archive website"

# Add remote (replace with your GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/click-archive.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll to **Pages** (left sidebar under "Code and automation")
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select:
   - Branch: `main`
   - Folder: `/docs`
6. Click **Save**

### Step 3: Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-3 minutes
- You'll see a green checkmark when it's ready
- Your site will be available at: `https://YOUR_USERNAME.github.io/click-archive/`

## Method 2: GitHub Actions (Advanced)

For automatic rebuilding when you update the Excel file.

### Step 1: Create Workflow File

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './docs'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Step 2: Enable GitHub Actions

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Commit and push the workflow file

## Verifying Deployment

### Check Deployment Status

1. Go to your repository on GitHub
2. Click **Actions** tab
3. You should see your deployment workflow
4. Green checkmark = successful deployment
5. Red X = failed (click to see logs)

### Test Your Website

Visit your site at: `https://YOUR_USERNAME.github.io/click-archive/`

**Test these features:**
- ✅ Magazine covers display in gallery
- ✅ Search bar accepts input
- ✅ Category filters work
- ✅ Clicking a magazine opens the viewer
- ✅ Archive.org viewer loads
- ✅ Issue contents display correctly
- ✅ Back button returns to gallery
- ✅ Mobile responsive design works

## Custom Domain (Optional)

If you have a custom domain:

### Step 1: Add CNAME File

Create `docs/CNAME` with your domain:
```
click-archive.example.com
```

### Step 2: Configure DNS

Add DNS records at your domain provider:

**For subdomain (click-archive.example.com):**
```
Type: CNAME
Name: click-archive
Value: YOUR_USERNAME.github.io
```

**For apex domain (example.com):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### Step 3: Enable Custom Domain in GitHub

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Click **Save**
4. Wait for DNS check (can take up to 48 hours)
5. Enable **Enforce HTTPS** once available

## Updating the Website

### Update Content

```bash
# Make changes to docs/ files or rebuild index
python scripts/build_index.py
cp data/click_index.json docs/

# Commit and push
git add .
git commit -m "Update content"
git push
```

GitHub will automatically redeploy (usually within 1-3 minutes).

### Update Styling

```bash
# Edit docs/styles.css
# Make your changes

# Commit and push
git add docs/styles.css
git commit -m "Update styling"
git push
```

### Update Search Logic

```bash
# Edit docs/app.js
# Make your changes

# Commit and push
git add docs/app.js
git commit -m "Improve search"
git push
```

## Troubleshooting

### Site Not Loading

**Problem**: 404 error when visiting site

**Solution**:
1. Check GitHub Pages is enabled in Settings
2. Verify `/docs` folder is selected
3. Wait a few minutes for deployment
4. Check Actions tab for errors

### Search Not Working

**Problem**: Search returns no results

**Solution**:
1. Open browser DevTools (F12)
2. Check Console for errors
3. Verify `click_index.json` loads successfully
4. Check Network tab for 404 errors

### Hebrew Text Issues

**Problem**: Hebrew text displays incorrectly

**Solution**:
1. Ensure `index.html` has `<html lang="he" dir="rtl">`
2. Verify Google Fonts (Heebo/Rubik) are loading
3. Check browser supports RTL text

### Archive.org Viewer Not Loading

**Problem**: Embedded viewer shows error

**Solution**:
1. Check Archive.org is accessible
2. Verify iframe URL is correct
3. Check browser allows iframe embedding
4. Try opening in different browser

### Slow Loading

**Problem**: Website loads slowly

**Solution**:
1. Images: The site uses minimal images
2. Fonts: Already optimized with Google Fonts
3. JSON: 273 items is small, shouldn't cause issues
4. Check internet connection
5. Clear browser cache

## Performance Optimization

### Enable Caching

Add to `docs/index.html` `<head>`:

```html
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

### Minify Files (Optional)

For production, you can minify:

```bash
# Install terser for JS minification
npm install -g terser

# Minify JS
terser docs/app.js -o docs/app.min.js

# Update index.html to use app.min.js
```

## Security

### Content Security Policy

Add to `docs/index.html` `<head>`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com; 
               frame-src https://archive.org;
               img-src 'self' data:;">
```

## Monitoring

### GitHub Pages Analytics

GitHub doesn't provide built-in analytics. Options:

1. **Google Analytics**: Add tracking code to `index.html`
2. **Plausible**: Privacy-friendly alternative
3. **Simple Analytics**: Another privacy-focused option

### Example: Google Analytics

Add to `docs/index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Backup

### Backup Your Site

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/click-archive.git backup-click-archive

# Or download as ZIP from GitHub
```

### Export Data

```bash
# Backup index data
cp docs/click_index.json ~/backups/click_index_$(date +%Y%m%d).json
```

## Support

For issues:
1. Check this troubleshooting guide
2. Review GitHub Pages documentation
3. Check browser console for errors
4. Verify all files are committed and pushed

## Success Checklist

Before going live:

- [ ] All files committed to GitHub
- [ ] GitHub Pages enabled in Settings
- [ ] Deployment successful (green checkmark)
- [ ] Website loads at GitHub Pages URL
- [ ] Gallery displays all 10 issues
- [ ] Search works in Hebrew and English
- [ ] Category filters work
- [ ] Issue viewer opens correctly
- [ ] Archive.org embed loads
- [ ] Mobile responsive works
- [ ] All links work
- [ ] No console errors

## Next Steps

After deployment:
1. Share the link!
2. Monitor for any issues
3. Consider adding more features
4. Update content as needed
5. Gather user feedback

---

**Congratulations!** 🎉 Your Click Magazine Archive is now live!
