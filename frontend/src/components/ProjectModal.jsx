import { useEffect } from 'react'

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
        <div className={`modal-backdrop ${project ? 'is-open' : ''}`} onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
        }}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <button className="modal-close" type="button" onClick={onClose}>×</button>
                <div>
                    <p className="pill">Case Study</p>
                    <h2 id="modal-title">{project.title}</h2>
                    <p>{project.summary}</p>
                </div>
                <div className="modal-meta">
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
                    <div className="pill-row">
                        {project.highlights.map((highlight, idx) => (
                            <span key={idx} className="pill">{highlight}</span>
                        ))}
                    </div>
                </div>
                <div className="hero-cta">
                    <a className="btn primary" href="#contact">Start a similar project</a>
                    <button className="btn ghost" type="button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal
