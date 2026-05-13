# Joel Iziren Portfolio

A responsive portfolio site for Joel Iziren, a frontend-focused software engineer. It showcases selected projects, experience, skills, and a validated contact form, with a polished light/dark theme and production deployment on Vercel.

Live demo: https://joel-iziren.vercel.app

## Features

- Dark mode with persistent theme preference
- Responsive single-page layout with smooth section reveals
- Project showcase with modal case studies
- Resume download support
- Contact form with client validation, server validation, sanitization, and rate limiting
- Vercel serverless API routes for production deployment
- Accessible UI with semantic markup and keyboard-friendly interactions

## Tech Stack

- React 18
- Vite 5
- CSS Modules and CSS custom properties
- Vercel serverless functions
- Nodemailer for contact form email delivery
- Express-based backend utilities for validation, sanitization, and mail handling

## Project Structure

```text
portfolio/
├── api/                     # Vercel serverless endpoints
├── assets/                  # Shared static assets
├── backend/                 # Email, validation, sanitization, and local backend helpers
├── frontend/                # Vite React app
├── package.json             # Root scripts
├── vercel.json              # Vercel build and routing config
└── README.md
```

## Installation

### Prerequisites

- Node.js 18 or newer
- npm

### Setup

```bash
git clone https://github.com/Bluuefanatic/my-portfolio.git
cd my-portfolio
npm run install:all
```

If you want to use email delivery locally, create `backend/.env` from `backend/.env.example` and set your email credentials there.

## Usage

### Development

Run the frontend and backend together:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Build

```bash
npm run build
```

### Production

The app is deployed on Vercel and uses serverless API routes under `/api`.

## API

### GET `/api/profile`

Returns the profile data shown in the portfolio.

Example response:

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

Accepts the contact form payload:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "type": "Web application",
  "budget": "$10k-$25k",
  "message": "I'd like to discuss a project."
}
```

Validation is enforced on both the frontend and the server. If the request is valid, the API returns a success message and sends the inquiry by email when mail credentials are configured.

## Configuration

### Vercel environment variables

These are the production variables used by the deployed app:

- `EMAIL_SERVICE`
- `EMAIL_USER`
- `EMAIL_PASS`
- `CONTACT_EMAIL`
- `OWNER_NAME`
- `SEND_AUTO_REPLY`
- `NODE_ENV`

For local development, copy `backend/.env.example` to `backend/.env` and set your own values.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch from `main`.
3. Make your changes and verify the app builds with `npm run build`.
4. Open a pull request with a clear description of the change.

Please keep changes focused, follow the existing code style, and add validation for any user-facing behavior you change.

## License

No license file is currently included in this repository. All rights are reserved unless a license is added later.

## Contact

- Email: izirenjoel@gmail.com
- GitHub: https://github.com/Bluuefanatic
- LinkedIn: https://www.linkedin.com/in/joel-iziren
