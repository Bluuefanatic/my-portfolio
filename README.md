# Joel Iziren Portfolio

This repository contains Joel Iziren's personal portfolio site: a single-page, content-rich frontend portfolio with a custom visual style, project case studies, resume links, and a contact form that submits through Formspree.

## What This Site Shows

- A polished landing page for Joel Iziren, a frontend developer and software engineer.
- Selected projects, including Amber Alert PRO, the portfolio itself, and an automated testing suite.
- A resume snapshot with a downloadable `resume.pdf`.
- A contact section with email, LinkedIn, and a validated inquiry form.
- Animated UI behavior driven by `main.js`, including scroll reveals, modal case studies, and form validation.

## Project Structure

- `index.html` - the primary portfolio markup and styling.
- `main.js` - interaction logic for profile content, animations, modal behavior, and contact form handling.
- `web.js` - generates the HTML served by the Node server.
- `server.js` - lightweight HTTP server for serving the portfolio and static assets.
- `web.sh` - convenience script that starts the site with Node.
- `resume.pdf` - downloadable resume linked from the page.
- `resume.txt` - plain-text resume copy.
- `assets/` - static assets such as the LinkedIn icon and social/OG images.

## Running Locally

You only need Node.js installed.

```bash
./web.sh
```

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
