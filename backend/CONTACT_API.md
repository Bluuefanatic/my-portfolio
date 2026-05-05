# Backend Contact API Documentation

## Overview
The contact API endpoint handles portfolio contact form submissions with comprehensive validation, sanitization, rate limiting, and email delivery.

## Endpoint

**POST** `/api/contact`

### Request Format

```json
{
  "name": "string (2-100 chars, letters/spaces/hyphens/apostrophes only)",
  "email": "string (valid email format)",
  "type": "string (enum: 'Frontend development', 'React/Next.js', 'QA & Testing')",
  "budget": "string (enum: '$10k-$25k', '$25k-$50k', '$50k-$100k', '$100k+')",
  "message": "string (10-5000 characters)"
}
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Thank you for your message! I will respond within 48 hours."
}
```

### Validation Error Response (400)

```json
{
  "error": "Validation failed",
  "details": {
    "fieldName": "Error message",
    "anotherField": "Another error"
  }
}
```

### Server Error Response (500)

```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred. Please try again later."
}
```

## Features

### 1. Server-Side Validation
- **Name**: 2-100 characters, alphanumeric + spaces/hyphens/apostrophes
- **Email**: Valid email format with pattern matching
- **Type**: Must be one of predefined project types
- **Budget**: Must be one of predefined budget ranges
- **Message**: 10-5000 characters minimum/maximum
- All fields are required

### 2. Input Sanitization
- Escapes HTML special characters to prevent XSS
- Normalizes email addresses (lowercase, trim whitespace)
- Trims whitespace from all fields
- Uses `validator` library for robust sanitization

### 3. Rate Limiting
- **Global**: 100 requests per 15 minutes (all endpoints)
- **Contact Form**: 5 submissions per hour per IP address
- Proxy-aware: Reads `X-Forwarded-For` header
- Disabled in development mode, active in production
- Returns 429 status on rate limit exceeded

### 4. Email Delivery

#### Development Mode
- Logs email details to console (no actual sending)
- Useful for testing without SMTP configuration
- Format: `📧 [TEST MODE] Contact form email: { ... }`

#### Production Mode
- Sends email to portfolio owner via configured SMTP
- Sends optional auto-reply to user
- Uses Nodemailer with email service providers (Gmail, Outlook, etc.)
- Includes HTML formatted email template
- Reply-to address set to user's email

## Environment Variables

```bash
# Email Service Configuration (required for production)
EMAIL_SERVICE=gmail                          # Service provider
EMAIL_USER=your-email@gmail.com             # SMTP email
EMAIL_PASS=your-app-password                # SMTP password or app token

# Email Settings
CONTACT_EMAIL=izirenjoel@gmail.com          # Where to send inquiries
OWNER_NAME=Joel Iziren                       # Name for email signature
SEND_AUTO_REPLY=true                         # Send auto-reply to users
```

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password as `EMAIL_PASS`

## Testing

### Run Validation Tests
```bash
cd backend
node test-contact.mjs
```

### Test Cases Covered
- ✓ Valid submission with all required fields
- ✓ Missing required field validation
- ✓ Invalid email format detection
- ✓ Message length enforcement
- ✓ Project type enum validation
- ✓ Budget range enum validation
- ✓ HTML/special character escaping
- ✓ Email normalization
- ✓ Rate limiting (production mode)

## Error Handling

The API handles multiple error scenarios gracefully:

1. **Validation Errors** (400)
   - Missing or invalid input fields
   - Returns specific error messages for each failed field

2. **Rate Limit Exceeded** (429)
   - Too many requests from same IP
   - Message: "Too many contact form submissions from this IP..."

3. **Email Service Errors** (500)
   - SMTP connection issues
   - Returns generic error message for security

4. **Server Errors** (500)
   - Unexpected internal errors
   - Logged for debugging

## Security Features

✓ Input validation against schema
✓ HTML escaping to prevent XSS
✓ Email normalization
✓ Rate limiting to prevent abuse
✓ Error messages don't leak sensitive info
✓ Proxy-aware IP detection
✓ Field length constraints

## Integration with Frontend

The frontend contact form ([Contact.jsx](../../frontend/src/components/Contact.jsx)) submits directly to the `/api/contact` endpoint:

```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name, email, type, budget, message
  })
})
```

The form maintains UX states throughout the submission:
- **Default**: Empty form with validation rules
- **Sending**: Shows "Sending..." message while awaiting response
- **Success** (200): Shows thank you message, clears form data
- **Validation Error** (400): Shows specific field errors and "Please fix the errors below." message
- **Server Error** (500): Shows "Sorry, something went wrong. Please email me directly."

Expected status codes:
- `200`: Success
- `400`: Validation error (returns field-specific error details)
- `429`: Rate limited
- `500`: Server error
