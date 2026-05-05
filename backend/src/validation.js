const contactSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    error: 'Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes',
  },
  email: {
    required: true,
    maxLength: 255,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    error: 'Please provide a valid email address',
  },
  type: {
    required: true,
    enum: ['Frontend development', 'React/Next.js', 'QA & Testing'],
    error: 'Project type must be one of: Frontend development, React/Next.js, QA & Testing',
  },
  budget: {
    required: true,
    enum: ['$10k-$25k', '$25k-$50k', '$50k-$100k', '$100k+'],
    error: 'Budget must be one of: $10k-$25k, $25k-$50k, $50k-$100k, $100k+',
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 5000,
    error: 'Message must be 10-5000 characters',
  },
}

const validateContactForm = (data) => {
  const errors = {}

  Object.keys(contactSchema).forEach((field) => {
    const rules = contactSchema[field]
    const value = data[field]

    // Check required
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      return
    }

    // Skip other validations if field is empty and not required
    if (!value) return

    // Check minLength
    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = rules.error
      return
    }

    // Check maxLength
    if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = rules.error
      return
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = rules.error
      return
    }

    // Check enum
    if (rules.enum && !rules.enum.includes(value)) {
      errors[field] = rules.error
      return
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export { contactSchema, validateContactForm }
