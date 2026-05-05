# Vercel Deployment Guide

## Quick Summary

This project can be deployed to Vercel in **two ways**:

| Approach | Setup | Cost | Recommendation |
|----------|-------|------|-----------------|
| **Option A: Frontend only on Vercel** (Backend on Render/Railway) | Simpler, cleaner separation | Free tier fully supported | ⭐ **RECOMMENDED** |
| **Option B: Fullstack monorepo on Vercel** (Express + Static) | More complex, serverless conversion | Limited free tier | Advanced |

---

## Option A: Recommended — Frontend on Vercel + Backend Elsewhere ⭐

This is the **cleanest and most reliable** approach.

### Step 1: Deploy Frontend to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New" → "Project"** and select `my-portfolio`
4. Configure:
   - **Framework Preset:** React (Vite)
   - **Root Directory:** `./frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   - **Environment Variables:** Add any needed (none required for frontend-only build)
5. Click **Deploy**

Vercel will serve your frontend at `https://my-portfolio.vercel.app` (auto-generated or custom domain).

### Step 2: Deploy Backend to Render (Free)

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +" → "Web Service"**
4. Connect your GitHub repo
5. Configure:
   - **Name:** `portfolio-backend`
   - **Environment:** Node
   - **Region:** Pick closest to you
   - **Build Command:** `npm --prefix backend install`
   - **Start Command:** `npm --prefix backend run dev` (or create a prod script)
   - **Environment Variables:** Copy from `backend/.env.example`
     - `NODE_ENV=production`
     - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc.
6. Click **Create Web Service**

Your backend will be at `https://portfolio-backend.onrender.com` (free tier, may sleep after 15 min inactivity).

### Step 3: Connect Frontend to Backend

Update `frontend/src/main.jsx` or `frontend/vite.config.js` to use the Render backend URL in production:

**Option 1: Update API calls in Contact.jsx**

```javascript
const API_BASE = import.meta.env.PROD 
  ? 'https://portfolio-backend.onrender.com'
  : 'http://localhost:3000';

fetch(`${API_BASE}/api/contact`, { ... })
```

**Option 2: Configure Vite proxy**

In `frontend/vite.config.js`:

```javascript
export default {
  server: {
    proxy: {
      '/api': {
        target: process.env.PROD 
          ? 'https://portfolio-backend.onrender.com'
          : 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
```

**Step 4: Redeploy Frontend**

Push the changes to GitHub → Vercel auto-redeploys.

---

## Option B: Monorepo on Vercel (Fullstack)

For a **single Vercel deployment** hosting both frontend and backend together.

### Prerequisites

- Vercel project already linked to GitHub

### Configuration Files

✅ Already created:
- `vercel.json` – Build and environment config
- `.vercelignore` – Files to skip during build

### Step-by-Step Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "chore: add Vercel configuration"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Import project from GitHub
   - Select repository: `my-portfolio`

3. **Configure Deployment:**
   - **Framework Preset:** Other / Node.js
   - **Root Directory:** `.` (leave blank, use root)
   - **Build Command:** `npm run build` (already set in vercel.json)
   - **Start Command:** `npm start` (already set in vercel.json)
   - **Environment Variables:**
     - `NODE_ENV`: `production`
     - `SMTP_HOST`: (from Gmail/Outlook)
     - `SMTP_USER`: your-email@gmail.com
     - `SMTP_PASS`: your-app-password
     - `SEND_TO`: izirenjoel@gmail.com
     - `SEND_AUTO_REPLY`: true

4. **Click Deploy**

Your app will run at `https://your-portfolio-project.vercel.app`

### Frontend + Backend on Same Vercel Instance

The `vercel.json` and `package.json` scripts are configured to:
- Build both frontend (Vite) and backend (Express) during build
- Serve frontend static files from `frontend/dist/`
- Route `/api/*` requests to Express backend
- Express listens on port 3000 (Vercel assigns the actual port)

---

## Environment Variables Setup

### For Option A (Vercel Frontend + Render Backend)

**Vercel (Frontend):**
- Usually none needed for frontend build
- Optional: `VITE_API_URL=https://portfolio-backend.onrender.com` (if hardcoding)

**Render (Backend):**
- `NODE_ENV=production`
- `PORT=3000` (Render assigns automatically, but safe to set)
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER=your-email@gmail.com`
- `SMTP_PASS=your-app-password` (Gmail App Password)
- `SEND_TO=izirenjoel@gmail.com`
- `SEND_AUTO_REPLY=true`

### For Option B (Vercel Monorepo)

Add all backend environment variables in Vercel dashboard:
Settings → Environment Variables → Add:

```
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SEND_TO=izirenjoel@gmail.com
SEND_AUTO_REPLY=true
```

---

## Gmail App Password Setup

For email notifications, you need a Gmail App Password (not your regular password):

1. Enable 2-Factor Authentication: https://accounts.google.com/signin/
2. Go to App Passwords: https://myaccount.google.com/apppasswords
3. Select **Mail** and **Windows** (or your device)
4. Google generates a 16-character password
5. Copy and paste into `SMTP_PASS` environment variable

---

## Testing After Deployment

### Option A Test (Frontend on Vercel, Backend on Render)

1. Open `https://my-portfolio.vercel.app`
2. Click theme toggle → works ✅
3. Scroll to Contact → fill form → submit
4. Check Render backend logs for submission ✅
5. Check your email for notification ✅

### Option B Test (Fullstack on Vercel)

1. Open `https://your-project.vercel.app`
2. Homepage loads ✅
3. Theme toggle works ✅
4. Contact form submits to `/api/contact` ✅
5. Email received ✅

---

## Troubleshooting

### "Port already in use" Error

- Vercel assigns a random port; make sure code uses `process.env.PORT` (it does in `backend/src/index.js`)

### Contact Form Not Sending

- Verify `SMTP_*` environment variables are set in Vercel dashboard
- Check Vercel function logs: Dashboard → Project → Deployments → Logs
- Ensure Gmail App Password is correct (not regular password)

### Frontend can't reach backend (CORS error)

**For Option A:** Make sure frontend is calling the Render backend URL, not `localhost:3000`

**For Option B:** Verify CORS is enabled in `backend/src/index.js` for Vercel domain

### Build fails

- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json` and `frontend/package.json` and `backend/package.json`
- Run `npm run build` locally first to verify

---

## Recommendations

| Scenario | Best Option |
|----------|-------------|
| Learning/Testing | Option B (one dashboard) |
| Production/Scaling | Option A (separate services, better resilience) |
| Free tier only | Option A (Render free tier more generous) |
| Single domain needed | Option B (both on vercel.app) |
| Want serverless functions | Option B + refactor backend to `/api` routes |

---

## Next Steps

1. **Choose your approach** (A or B)
2. **Set environment variables** in Vercel/Render dashboard
3. **Test locally:** `npm run build && npm start`
4. **Push to GitHub:** `git push origin main`
5. **Monitor deployment:** Check Vercel/Render dashboards
6. **Verify:** Test contact form, theme toggle, API endpoints

---

## Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Gmail App Passwords](https://myaccount.google.com/apppasswords)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
