import nodemailer from 'nodemailer'

// Initialize email transporter
let transporter = null

const initializeEmailTransporter = () => {
  const emailService = process.env.EMAIL_SERVICE || 'gmail'
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS

  // In development, use test account
  if (process.env.NODE_ENV !== 'production' && !emailUser) {
    return null // Will use test mode
  }

  if (emailUser && emailPass) {
    transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })
  }

  return transporter
}

const sendContactEmail = async (contactData) => {
  // Initialize transporter if not already done
  if (!transporter && process.env.NODE_ENV === 'production') {
    initializeEmailTransporter()
  }

  const { name, email, type, budget, message } = contactData

  // Test mode: log and return success
  if (!transporter || process.env.NODE_ENV !== 'production') {
    console.log('📧 [TEST MODE] Contact form email:', {
      to: process.env.CONTACT_EMAIL || 'izirenjoel@gmail.com',
      from: email,
      subject: `New Project Inquiry from ${name}`,
      data: { name, email, type, budget, message },
    })
    return { success: true, mode: 'test' }
  }

  try {
    // Email to portfolio owner
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || 'izirenjoel@gmail.com',
      replyTo: email,
      subject: `New Project Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Project Type:</strong> ${type}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    // Auto-reply to user (optional)
    if (process.env.SEND_AUTO_REPLY === 'true') {
      await transporter.sendMail({
        from: `${process.env.OWNER_NAME || 'Joel'} <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for your inquiry',
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for reaching out! I've received your message and will get back to you within 48 hours.</p>
          <p>In the meantime, feel free to connect with me on <a href="https://www.linkedin.com/in/joel-iziren">LinkedIn</a>.</p>
          <p>Best regards,<br>${process.env.OWNER_NAME || 'Joel'}</p>
        `,
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    throw new Error('Failed to send email')
  }
}

const verifyEmailConfiguration = async () => {
  if (!transporter) {
    console.warn('⚠️  Email transporter not configured. Contact form will work in test mode.')
    return false
  }

  try {
    await transporter.verify()
    console.log('✓ Email transporter verified successfully')
    return true
  } catch (error) {
    console.error('✗ Email transporter verification failed:', error)
    return false
  }
}

export { sendContactEmail, initializeEmailTransporter, verifyEmailConfiguration }
