import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://yourdomain.com'
        : 'http://localhost:5173'
}))
app.use(express.json())

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

// Contact form endpoint (placeholder for future integration)
app.post('/api/contact', (req, res) => {
    const { name, email, type, budget, message } = req.body

    // Validate input
    if (!name || !email || !type || !budget || !message) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    // TODO: Integrate with email service (Nodemailer, SendGrid, etc.)
    console.log('New contact form submission:', { name, email, type, budget, message })

    res.json({ success: true, message: 'Thank you for your message!' })
})

// Serve static files from frontend build in production
if (process.env.NODE_ENV === 'production') {
    const frontendBuildPath = join(__dirname, '../frontend/dist')
    app.use(express.static(frontendBuildPath))

    // Serve index.html for client-side routing
    app.get('*', (req, res) => {
        res.sendFile(join(frontendBuildPath, 'index.html'))
    })
}

// Start server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})
