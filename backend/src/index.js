import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import { apiLimiter, contactLimiter } from './rateLimiter.js'
import { validateContactForm } from './validation.js'
import { sanitizeContactForm } from './sanitization.js'
import { sendContactEmail, initializeEmailTransporter, verifyEmailConfiguration } from './emailAdapter.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
// In production, frontend is served from same origin, so CORS not needed
// In development, allow localhost:5173 (Vite dev server)
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? false  // Disable CORS in production (same origin)
        : 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(apiLimiter)

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Backend is running' })
})

// API routes
app.get('/api/profile', (req, res) => {
    res.json({
        name: 'Joel Iziren',
        role: 'Frontend Developer · Software Engineer',
        email: 'izirenjoel@gmail.com',
        linkedin: 'https://www.linkedin.com/in/joel-iziren',
        github: 'https://github.com/Bluuefanatic',
    })
})

// Contact form endpoint with validation, sanitization, rate limiting, and email
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const rawData = req.body

        // Validate input
        const validation = validateContactForm(rawData)
        if (!validation.isValid) {
            return res.status(400).json({
                error: 'Validation failed',
                details: validation.errors,
            })
        }

        // Sanitize input
        const sanitizedData = sanitizeContactForm(rawData)

        // Send email
        try {
            await sendContactEmail(sanitizedData)
        } catch (emailError) {
            console.error('Email error:', emailError)
            return res.status(500).json({
                error: 'Failed to process your request',
                message: 'We encountered an error sending your message. Please try again later.',
            })
        }

        // Log the submission
        console.log('✓ Contact form submitted successfully:', {
            name: sanitizedData.name,
            email: sanitizedData.email,
            type: sanitizedData.type,
            budget: sanitizedData.budget,
        })

        res.json({
            success: true,
            message: 'Thank you for your message! I will respond within 48 hours.',
        })
    } catch (error) {
        console.error('Contact endpoint error:', error)
        res.status(500).json({
            error: 'Internal server error',
            message: 'An unexpected error occurred. Please try again later.',
        })
    }
})

// Serve static files from frontend build in production
if (process.env.NODE_ENV === 'production') {
    const frontendBuildPath = join(__dirname, '../../frontend/dist')
    app.use(express.static(frontendBuildPath))

    // Serve index.html for client-side routing (SPA fallback)
    app.get('*', (req, res) => {
        res.sendFile(join(frontendBuildPath, 'index.html'))
    })
}

// Start server
app.listen(PORT, async () => {
    console.log(`Backend running on http://localhost:${PORT}`)

    // Initialize and verify email configuration
    if (process.env.NODE_ENV === 'production') {
        initializeEmailTransporter()
        await verifyEmailConfiguration()
    } else {
        console.log('📧 Running in development mode - emails will be logged to console')
    }
})
