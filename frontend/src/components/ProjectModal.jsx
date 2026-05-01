import { useEffect } from 'react'
import styles from './ProjectModal.module.css'

const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        if (!project) return undefined

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [project, onClose])

    if (!project) return null

    return (
        <div className={`${styles.modalBackdrop} ${project ? styles.isOpen : ''}`} onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
        }}>
            <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <button className={styles.modalClose} type="button" onClick={onClose}>×</button>
                <div>
                    <p className={styles.pill}>Case Study</p>
                    <h2 id="modal-title">{project.title}</h2>
                    <p>{project.summary}</p>
                </div>
                <div className={styles.modalMeta}>
                    <div>
                        <h4>Role</h4>
                        <p>{project.role}</p>
                    </div>
                    <div>
                        <h4>Timeline</h4>
                        <p>{project.duration}</p>
                    </div>
                    <div>
                        <h4>Impact</h4>
                        <p>{project.impact}</p>
                    </div>
                </div>
                <div>
                    <h3>Highlights</h3>
                    <div className={styles.pillRow}>
                        {project.highlights.map((highlight, idx) => (
                            <span key={idx} className={styles.pill}>{highlight}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.heroCta}>
                    <a className={`${styles.btn} ${styles.btnPrimary}`} href="#contact">Start a similar project</a>
                    <button className={`${styles.btn} ${styles.btnGhost}`} type="button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal
