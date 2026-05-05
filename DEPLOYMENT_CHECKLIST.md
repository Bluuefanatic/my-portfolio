# Vercel Deployment Checklist

## Pre-Deployment ✅

- [x] Project builds successfully: `npm run build`
- [x] Build outputs are correct:
  - Frontend: `frontend/dist/` with HTML, CSS, JS
  - Backend: Node.js ready in `backend/src/index.js`
- [x] Environment variables configured in `vercel.json` and `backend/.env.example`
- [x] CORS properly configured for both deployment options
- [x] `.vercelignore` created to exclude unnecessary files
- [x] GitHub repository is public and up to date

## Deployment Preset Configuration

### **Option A: Frontend on Vercel (RECOMMENDED)**

**Vercel Project Settings:**
- **Framework Preset:** React (Vite) or Other
- **Root Directory:** `./frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables:** None required (frontend-only build)

### **Option B: Fullstack on Vercel**

**Vercel Project Settings:**
- **Framework Preset:** Node.js or Other
- **Root Directory:** `.` (leave empty)
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Install Command:** `npm run install:all`

**Environment Variables (add these):**
```
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SEND_TO=izirenjoel@gmail.com
SEND_AUTO_REPLY=true
```

## Option A Setup Steps (Recommended)

1. **Deploy Frontend to Vercel:**
   - Go to https://vercel.com → New Project
   - Import `my-portfolio` from GitHub
   - Set Root Directory to `./frontend`
   - Click Deploy
   - **Note the frontend URL:** `https://my-portfolio-XXXXX.vercel.app`

2. **Deploy Backend to Render:**
   - Go to https://render.com → New Web Service
   - Connect GitHub repo
   - Build Command: `cd backend && npm install`
   - Start Command: `npm --prefix backend run dev` (or create a prod script)
   - Add environment variables from `.env.example`
   - **Note the backend URL:** `https://portfolio-backend.onrender.com`

3. **Update Frontend API URL:**
   - Edit `frontend/src/components/Contact.jsx`
   - Find the `fetch('/api/contact'` call
   - Update to: `fetch('https://portfolio-backend.onrender.com/api/contact'`
   - Commit and push → Vercel auto-redeploys

4. **Test:**
   - Visit https://my-portfolio-XXXXX.vercel.app
   - Test theme toggle ✅
   - Submit contact form ✅
   - Check email inbox ✅

## Option B Setup Steps (Monorepo)

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "chore: add Vercel configuration"
   git push origin main
   ```

2. **Go to Vercel Dashboard:**
   - New Project → Import `my-portfolio`
   - Configure as shown above (Node.js, root directory `.`)
   - Add all environment variables
   - Click Deploy

3. **Test:**
   - Visit https://your-project-name.vercel.app
   - Test all features ✅

## Environment Variables for Render (Option A Backend)

Add these in Render dashboard → Environment:

```
NODE_ENV=production
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SEND_TO=izirenjoel@gmail.com
SEND_AUTO_REPLY=true
FRONTEND_URL=https://my-portfolio-XXXXX.vercel.app
```

## Gmail App Password (Required for Email)

1. Go to https://myaccount.google.com/apppasswords
2. Select Mail + Windows (or your device)
3. Copy the 16-character password
4. Paste as `SMTP_PASS` in environment variables
5. **Never use your actual Gmail password**

## Files Modified for Vercel

- ✅ `vercel.json` – Vercel configuration
- ✅ `.vercelignore` – Skip files during build
- ✅ `package.json` – Added `cross-env` for Windows compatibility
- ✅ `backend/src/index.js` – Updated CORS to support `FRONTEND_URL`
- ✅ `backend/.env.example` – Added `FRONTEND_URL` variable
- ✅ `VERCEL_DEPLOYMENT.md` – Full deployment guide

## Troubleshooting

**Contact form not sending?**
- Verify `SMTP_*` variables in environment
- Check email logs in Render/Vercel dashboard
- Use Gmail App Password (not regular password)

**Build fails?**
- Run `npm run build` locally first
- Check Vercel/Render logs for specific error
- Ensure all dependencies are listed in package.json files

**CORS errors?**
- For Option A: Update `FRONTEND_URL` in backend env vars
- For Option B: Frontend and backend on same origin (no CORS needed)

**Frontend can't reach backend?**
- Check hardcoded API URLs (should use env vars)
- Verify backend URL in frontend environment variables
- Disable browser extensions blocking requests

## Deployment Comparison

| Feature | Option A | Option B |
|---------|----------|----------|
| Setup Complexity | Moderate | Simple |
| Free Tier Support | ✅ Full | ⚠️ Limited |
| Independent Scaling | ✅ Yes | ❌ No |
| Same Domain | ❌ No | ✅ Yes |
| Recommended | ⭐⭐⭐ | ⭐⭐ |

## Next: Push to GitHub

```bash
git add .
git commit -m "chore: prepare for Vercel deployment"
git push origin main
```

Then follow Option A or B above in Vercel/Render dashboards.

**Questions?** See `VERCEL_DEPLOYMENT.md` for detailed instructions.
