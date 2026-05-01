# Portfolio Fullstack Project

A fullstack React portfolio website with Vite frontend and Express backend, preserving the original UI/UX and CSS-based animations.

## Project Structure

```
portfolio/
├── frontend/          # Vite React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/           # Express.js API
│   ├── src/
│   │   └── index.js
│   └── package.json
├── assets/            # Shared static assets
├── package.json       # Root package.json with monorepo scripts
└── README.md
```

## What This Project Includes

- **React Frontend**: Modern React components with Vite for fast development
- **Express Backend**: RESTful API for profile data and contact form handling
- **CSS Animations**: Custom CSS-based motion (no Framer Motion) for optimal performance
- **Responsive Design**: Mobile-first responsive layout
- **Project Showcase**: Case studies with modal interactions
- **Contact Form**: Form validation and Formspree integration
- **Development Scripts**: Unified npm scripts for local development

## Quick Start

Install dependencies for all packages:

```bash
npm run install:all
```

### Development

Run both frontend and backend together:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:frontend    # http://localhost:5173
npm run dev:backend     # http://localhost:3000
```

### Production Build

```bash
npm run build
```

This builds both frontend and backend for production.

## Technology Stack

**Frontend:**
- React 18
- Vite (fast build tool)
- CSS (custom CSS-based animations)

**Backend:**
- Node.js
- Express.js
- CORS enabled

## Requirements

- Node.js 16+
- npm or yarn

## Development Workflow

- **Frontend development**: Hot reload at http://localhost:5173
- **Backend development**: Auto-restart with `--watch` flag
- **API proxy**: Frontend proxies `/api` requests to backend on port 3000
- **Production**: Backend serves frontend static files

## Next Phases

- Phase 2: Component refinement and styling polish
- Phase 3: State management and advanced API integration
- Phase 4: Deployment configuration (Vercel, Render, etc.)
- Phase 5: Additional features (email service, CMS integration, etc.)

On Windows PowerShell, run:

```powershell
node server.js
```

Then open `http://localhost:3000`.

The server listens on `PORT`, defaulting to `3000`.

## How It Works

The page is designed as a static portfolio, but the interaction layer adds a few useful behaviors:

- Profile data is injected into the page from a small object in `main.js`.
- Project cards open a modal with case-study details.
- Sections fade in with an intersection observer as you scroll.
- The contact form validates required fields before sending data to Formspree.
- The footer year updates automatically.

## Deployment Notes

The site is already structured for simple static hosting or GitHub Pages-style deployment, and the metadata in `index.html` points to the published portfolio URL.

If you change the profile, update these places together:

- `index.html`
- `main.js`
- `resume.pdf` and `resume.txt`

## Contact

- Email: izirenjoel@gmail.com
- LinkedIn: https://www.linkedin.com/in/joel-iziren
- GitHub: https://github.com/Bluuefanatic
