import { useState } from 'react'
import { contactInfo } from '../data/contact'

const Contact = ({ profile }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: '',
        budget: '',
        message: '',
    })

    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(false)

    const validateForm = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Please enter your name.'
        if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Please enter a valid email.'
        if (!formData.type) newErrors.type = 'Please select a project type.'
        if (!formData.budget) newErrors.budget = 'Please select a budget range.'
        if (!formData.message.trim()) newErrors.message = 'Please share a short message.'
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formErrors = validateForm()

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            return
        }

        try {
            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/mdalgraq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSuccessMessage(true)
                setFormData({ name: '', email: '', type: '', budget: '', message: '' })
                setErrors({})
                setTimeout(() => setSuccessMessage(false), 3000)
            }
        } catch (err) {
            console.error('Form submission error:', err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    return (
        <section className="section" id="contact">
            <div className="cta-band reveal">
                <div>
                    <h3>{contactInfo.ctaTitle}</h3>
                    <p>{contactInfo.ctaDescription}</p>
                </div>
                <div className="hero-cta">
                    <a className="btn primary" href={`mailto:${profile.email}`}>Email me</a>
                    <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                        <img src="/linkedin.svg" alt="LinkedIn" className="social-icon" />
                        LinkedIn
                    </a>
                </div>
            </div>
            <div className="contact-grid">
                <div className="contact-card reveal">
                    <h3>{contactInfo.projectIntakeTitle}</h3>
                    <p>{contactInfo.projectIntakeDescription}</p>
                    <div className="pill-row">
                        {contactInfo.projectIntakePills.map((pill, idx) => (
                            <span key={idx} className="pill">{pill}</span>
                        ))}
                    </div>
                </div>
                <div className="contact-card reveal">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className={`field ${errors.name ? 'invalid' : ''}`}>
                            <label htmlFor="name">Full name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Jane Appleseed"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && <span className="error-msg">{errors.name}</span>}
                        </div>
                        <div className={`field ${errors.email ? 'invalid' : ''}`}>
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jane@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>
                        <div className={`field ${errors.type ? 'invalid' : ''}`}>
                            <label htmlFor="type">Project type</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                {contactInfo.projectTypes.map((option, idx) => (
                                    <option key={idx} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {errors.type && <span className="error-msg">{errors.type}</span>}
                        </div>
                        <div className={`field ${errors.budget ? 'invalid' : ''}`}>
                            <label htmlFor="budget">Budget range</label>
                            <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                            >
                                {contactInfo.budgetRanges.map((option, idx) => (
                                    <option key={idx} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {errors.budget && <span className="error-msg">{errors.budget}</span>}
                        </div>
                        <div className={`field ${errors.message ? 'invalid' : ''}`}>
                            <label htmlFor="message">Project details</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Tell me about your goals, timeline, and team."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            {errors.message && <span className="error-msg">{errors.message}</span>}
                        </div>
                        <button className="btn primary" type="submit">Send inquiry</button>
                        {successMessage && (
                            <div className="form-success is-visible" role="status" aria-live="polite">
                                Thanks! Your message has been sent. I will follow up soon.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
