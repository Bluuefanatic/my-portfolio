import { useState } from 'react'
import { contactInfo } from '../data/contact'
import styles from './Contact.module.css'

const Contact = ({ profile }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: '',
        budget: '',
        message: '',
    })

    const [errors, setErrors] = useState({})
    const [statusMessage, setStatusMessage] = useState('')
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validateForm = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Please enter your name.'
        if (!emailPattern.test(formData.email.trim())) newErrors.email = 'Please enter a valid email.'
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
            setStatusMessage('Sending...')
            const payload = new FormData()
            payload.append('name', formData.name)
            payload.append('email', formData.email)
            payload.append('type', formData.type)
            payload.append('budget', formData.budget)
            payload.append('message', formData.message)

            const response = await fetch('https://formspree.io/f/mdalgraq', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: payload,
            })

            if (response.ok) {
                setStatusMessage('Thanks! Your message has been sent. I will follow up soon.')
                setFormData({ name: '', email: '', type: '', budget: '', message: '' })
                setErrors({})
            } else {
                setStatusMessage('Sorry, something went wrong. Please email me directly.')
            }
        } catch (err) {
            setStatusMessage('Sorry, something went wrong. Please email me directly.')
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
        <section className={styles.section} id="contact">
            <div className={`${styles.ctaBand} reveal`}>
                <div>
                    <h3>{contactInfo.ctaTitle}</h3>
                    <p>{contactInfo.ctaDescription}</p>
                </div>
                <div className={styles.heroCta}>
                    <a className={`${styles.btn} ${styles.btnPrimary}`} href={`mailto:${profile.email}`}>Email me</a>
                    <a className={`${styles.btn} ${styles.btnGhost}`} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                        <img src="/linkedin.svg" alt="LinkedIn" className={styles.socialIcon} />
                        LinkedIn
                    </a>
                </div>
            </div>
            <div className={styles.contactGrid}>
                <div className={`${styles.contactCard} reveal`}>
                    <h3>{contactInfo.projectIntakeTitle}</h3>
                    <p>{contactInfo.projectIntakeDescription}</p>
                    <div className={styles.pillRow}>
                        {contactInfo.projectIntakePills.map((pill, idx) => (
                            <span key={idx} className={styles.pill}>{pill}</span>
                        ))}
                    </div>
                </div>
                <div className={`${styles.contactCard} reveal`}>
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className={`${styles.field} ${errors.name ? styles.fieldInvalid : ''}`}>
                            <label htmlFor="name">Full name</label>
                            <input
                                className={styles.input}
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Jane Appleseed"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                        </div>
                        <div className={`${styles.field} ${errors.email ? styles.fieldInvalid : ''}`}>
                            <label htmlFor="email">Email address</label>
                            <input
                                className={styles.input}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jane@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                        </div>
                        <div className={`${styles.field} ${errors.type ? styles.fieldInvalid : ''}`}>
                            <label htmlFor="type">Project type</label>
                            <select
                                className={styles.select}
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
                            {errors.type && <span className={styles.errorMsg}>{errors.type}</span>}
                        </div>
                        <div className={`${styles.field} ${errors.budget ? styles.fieldInvalid : ''}`}>
                            <label htmlFor="budget">Budget range</label>
                            <select
                                className={styles.select}
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
                            {errors.budget && <span className={styles.errorMsg}>{errors.budget}</span>}
                        </div>
                        <div className={`${styles.field} ${errors.message ? styles.fieldInvalid : ''}`}>
                            <label htmlFor="message">Project details</label>
                            <textarea
                                className={styles.textarea}
                                id="message"
                                name="message"
                                placeholder="Tell me about your goals, timeline, and team."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
                        </div>
                        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">Send inquiry</button>
                        {statusMessage && (
                            <div className={styles.formSuccess} role="status" aria-live="polite">
                                {statusMessage}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
