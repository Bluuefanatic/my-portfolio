# Joel Iziren — Frontend Engineer Portfolio

A fullstack React + Express portfolio website with dark mode, validated contact form, and production-ready deployment. Built with Vite frontend, Express backend, and CSS custom properties for theme support.

## Features

- **Dark Mode Support** – Toggle between light and dark themes with localStorage persistence and system preference detection
- **Responsive Design** – Mobile-first layout with CSS Grid and Flexbox
- **Contact Form** – Backend-driven validation, sanitization, and rate limiting to prevent spam
- **Custom CSS Tokens** – Theme-aware color system using CSS variables
- **Fast Dev Server** – Vite HMR with instant feedback
- **Production Ready** – Single Express server serving frontend static assets + API endpoints
- **Project Showcase** – Interactive work section with modal case studies
- **Accessible** – Semantic HTML, ARIA labels, keyboard navigation

## Project Structure

```
portfolio/
├── frontend/                    # Vite React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx          # Root component
│   │   │   ├── Header.jsx       # Navigation + theme toggle
│   │   │   ├── Hero.jsx
│   │   │   ├── Work.jsx         # Project showcase
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Resume.jsx
│   │   │   └── Contact.jsx      # Contact form with validation
│   │   ├── contexts/
│   │   │   └── ThemeContext.jsx # Theme state management
│   │   ├── hooks/
│   │   │   ├── useRevealOnScroll.js
│   │   │   ├── useEscapeKey.js
│   │   │   └── useCurrentYear.js
│   │   ├── styles/
│   │   │   ├── tokens.css       # Theme variables (light/dark)
│   │   │   └── base.css         # Global baseline styles
│   │   ├── App.jsx
│   │   └── main.jsx             # Entry point with ThemeProvider
│   ├── dist/                    # Build output
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Express API server
│   ├── src/
│   │   ├── index.js             # Express app + routes
│   │   ├── validation.js        # Form validation schema
│   │   ├── sanitization.js      # Input sanitization
│   │   ├── emailAdapter.js      # Email service (Nodemailer)
│   │   └── rateLimiter.js       # Rate limiting config
│   ├── .env.example
│   └── package.json
├── assets/                      # Shared static assets
├── package.json                 # Root monorepo config
└── README.md                    # This file
```

## Tech Stack

**Frontend:**
- React 18 – UI library
- Vite 5.4 – Build tool with HMR
- CSS Custom Properties – Theme tokens
- React Context API – State management

**Backend:**
- Node.js 18+ – Runtime
- Express 4.18 – Web framework
- Nodemailer – Email delivery
- express-rate-limit – Rate limiting
- validator – Input validation & sanitization
- dotenv – Environment configuration

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) SMTP credentials for email notifications

### Installation

Clone and install dependencies:

```bash
git clone https://github.com/Bluuefanatic/my-portfolio.git
cd my-portfolio
npm run install:all
```

### Development

Run frontend and backend together with hot reload:

```bash
npm run dev
```

- **Frontend:** http://localhost:5173 (Vite dev server)
- **Backend:** http://localhost:3000 (Express, auto-restart on file changes)

Or run separately:

```bash
npm run dev:frontend    # Frontend only on 5173
npm run dev:backend     # Backend only on 3000
```

### Production Build

Build both frontend and backend for production:

```bash
npm run build
```

Outputs:
- `frontend/dist/` – Static assets (served by backend)
- Backend source ready for deployment

### Production Start

Run the production server serving frontend + API:

```bash
npm start
```

The app will be available at http://localhost:3000

## Configuration

### Environment Variables

Create `.env` in the `backend/` directory (see `backend/.env.example`):

```bash
# Email service (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SEND_TO=recipient@example.com
SEND_AUTO_REPLY=true

# Server
PORT=3000
NODE_ENV=production
```

For **Gmail**, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

## API Endpoints

### GET `/health`

Health check endpoint.

**Response:**
```json
{ "status": "Backend is running" }
```

### GET `/api/profile`

Fetch profile data (name, role, email, social links).

**Response:**
```json
{
  "name": "Joel Iziren",
  "role": "Frontend Developer · Software Engineer",
  "email": "izirenjoel@gmail.com",
  "linkedin": "https://www.linkedin.com/in/joel-iziren",
  "github": "https://github.com/Bluuefanatic"
}
```

### POST `/api/contact`

Submit contact form with validation and rate limiting.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "type": "Frontend development",
  "budget": "$25k-$50k",
  "message": "I'd like to discuss a project..."
}
```

**Validation Rules:**
- `name`: Required, 2–50 characters
- `email`: Required, valid email format
- `type`: One of: `Frontend development`, `React/Next.js`, `QA & Testing`
- `budget`: One of: `$10k-$25k`, `$25k-$50k`, `$50k-$100k`, `$100k+`
- `message`: 10–5000 characters

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your message! I will respond within 48 hours."
}
```

**Validation Error (400):**
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Please provide a valid email address",
    "message": "Message must be 10-5000 characters"
  }
}
```

**Rate Limits:**
- API: 100 requests per 15 minutes (global)
- Contact form: 5 requests per hour (per IP)

## Dark Mode

The app supports light and dark themes using CSS custom properties.

### Theme Toggle

Click the 🌙/☀️ button in the header to toggle themes. Theme preference is saved to `localStorage` and persists across sessions.

### How It Works

1. **CSS Tokens** – All colors defined in `frontend/src/styles/tokens.css` as custom properties:
   - Light mode: `:root` selector
   - Dark mode: `[data-theme="dark"]` selector

2. **Context Provider** – `ThemeContext` manages theme state and applies `data-theme` attribute to `<html>` element

3. **System Preference** – On first visit, detects `prefers-color-scheme` media query

4. **Persistence** – Theme preference saved to `localStorage` as `"theme"` key

### Adding New Colors

Add variables in both light and dark sections of `tokens.css`:

```css
:root {
  --new-color: #ff6a3d;  /* Light mode */
}

[data-theme="dark"] {
  --new-color: #ff7f52;  /* Dark mode */
}
```

## Contact Form

The contact form is integrated with the backend for secure handling:

1. **Frontend** (`Contact.jsx`) collects user input and submits to `/api/contact`
2. **Backend** (`validation.js`) validates against schema
3. **Sanitization** (`sanitization.js`) escapes HTML and normalizes input
4. **Rate Limiting** (`rateLimiter.js`) prevents spam (5/hour per IP)
5. **Email** (`emailAdapter.js`) sends notification (if SMTP configured) and optional auto-reply

### Testing Contact Form

Frontend integration test:

```bash
node frontend/test-contact-integration.mjs
```

Backend API tests:

```bash
node backend/test-contact.mjs
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Frontend Build:** ~160 KB gzipped (React + app code)
- **CSS:** ~10 KB gzipped (including theme tokens)
- **Lighthouse:** 90+ on desktop

## Development Workflow

### Adding a Feature

1. Create component in `frontend/src/components/`
2. Use CSS modules for scoped styles
3. Leverage `tokens.css` for colors (auto-supports dark mode)
4. Test in dev mode with HMR
5. Run `npm run build` to verify production build

### Making Backend Changes

1. Edit `backend/src/*.js`
2. Server auto-restarts (with `--watch` flag)
3. Test via API client or form submission
4. Verify error handling in `backend/test-contact.mjs`

### Testing Production Locally

Build and serve locally:

```bash
npm run build
npm start
# Open http://localhost:3000
```

Then test:
- Theme toggle (dark/light)
- Form submission and validation
- API endpoints (`/api/profile`, `/api/contact`)
- Mobile responsiveness (DevTools)

## Deployment

### Vercel (Recommended)

Choose your deployment approach:

**Option A: Frontend on Vercel + Backend on Render (RECOMMENDED)** ⭐
- Cleaner separation of concerns
- Better scalability and cost
- Fully free tier supported
- See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) → **Option A**

**Option B: Fullstack on Vercel**
- Single platform deployment
- Both frontend and backend on one Vercel instance
- Limited free tier resources
- See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) → **Option B**

### Quick Start for Vercel

1. **Read the deployment guide:**
   ```bash
   cat VERCEL_DEPLOYMENT.md
   ```

2. **Check the deployment checklist:**
   ```bash
   cat DEPLOYMENT_CHECKLIST.md
   ```

3. **Push to GitHub and deploy:**
   ```bash
   git add .
   git commit -m "chore: prepare for Vercel deployment"
   git push origin main
   ```

### Other Platforms

**Render / Railway / Heroku:**

1. Push to GitHub
2. Connect repository to deployment platform
3. Set `NODE_ENV=production` and email env vars
4. Deploy – platform runs `npm run build` then `npm start`

**Docker:**

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm run install:all && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t portfolio .
docker run -p 3000:3000 -e NODE_ENV=production portfolio
```

## Troubleshooting

### Port Already in Use

Kill the process and restart:

```powershell
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Contact Form Not Sending Email

1. Verify `.env` has correct `SMTP_*` variables
2. Check `NODE_ENV=production` (emails only in production)
3. Gmail users: Use [App Password](https://support.google.com/accounts/answer/185833), not regular password
4. Check backend logs for SMTP errors

### Dark Mode Not Persisting

Clear `localStorage`:

```javascript
// In browser console
localStorage.removeItem('theme');
location.reload();
```

### Build Size Issues

Analyze bundle:

```bash
npm --prefix frontend run build -- --analyze
```

## Resources

- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [Nodemailer Setup](https://nodemailer.com)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## License

© 2026 Joel Iziren. All rights reserved.

## Contact

- **Email:** izirenjoel@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/joel-iziren
- **GitHub:** https://github.com/Bluuefanatic
