import { sendContactEmail, initializeEmailTransporter, verifyEmailConfiguration } from '../backend/src/emailAdapter.js'
import { validateContactForm } from '../backend/src/validation.js'
import { sanitizeContactForm } from '../backend/src/sanitization.js'

let emailInitAttempted = false

const ensureEmailSetup = async () => {
  if (process.env.NODE_ENV !== 'production' || emailInitAttempted) {
    return
  }

  emailInitAttempted = true
  console.log('📧 Production startup: initializing email transporter and verifying SMTP access')
  initializeEmailTransporter()
  await verifyEmailConfiguration()
}

const parseBody = (req) => {
  if (!req.body) {
    return {}
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  return req.body
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await ensureEmailSetup()

    const rawData = parseBody(req)
    const validation = validateContactForm(rawData)

    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors,
      })
    }

    const sanitizedData = sanitizeContactForm(rawData)

    try {
      await sendContactEmail(sanitizedData)
    } catch (emailError) {
      console.error('Email error:', emailError)
      return res.status(500).json({
        error: 'Failed to process your request',
        message: 'We encountered an error sending your message. Please try again later.',
      })
    }

    console.log('✓ Contact form submitted successfully:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      type: sanitizedData.type,
      budget: sanitizedData.budget,
    })

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will respond within 48 hours.',
    })
  } catch (error) {
    console.error('Contact endpoint error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again later.',
    })
  }
}
