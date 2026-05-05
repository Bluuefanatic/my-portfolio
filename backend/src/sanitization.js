import validator from 'validator'

const sanitizeContactForm = (data) => {
  return {
    name: validator.trim(validator.escape(data.name || '')),
    email: validator.trim(validator.normalizeEmail(data.email || '')),
    type: validator.trim(data.type || ''),
    budget: validator.trim(data.budget || ''),
    message: validator.trim(validator.escape(data.message || '')),
  }
}

const sanitizeString = (str) => {
  return validator.trim(validator.escape(str || ''))
}

const sanitizeEmail = (email) => {
  return validator.trim(validator.normalizeEmail(email || ''))
}

export { sanitizeContactForm, sanitizeString, sanitizeEmail }
