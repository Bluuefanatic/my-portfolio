import { projects } from '../data/projects'
import styles from './Work.module.css'

const Work = ({ onProjectClick }) => {
    const swatchClassMap = {
        'gradient-blue-green': styles.gradientBlueGreen,
        'gradient-pink-red': styles.gradientPinkRed,
    }

    return (
        <section className={styles.section} id="work">
            <div className={`${styles.sectionTitle} reveal`}>
                <div>
                    <h2>Selected work</h2>
                    <p>Web applications and projects built with React, Next.js, and modern tools.</p>
                </div>
                <a className={styles.btnGhost} href="#contact">Get in touch</a>
            </div>
            <div className={`${styles.grid} ${styles.projects}`}>
                {projects.map((project) => (
                    <article key={project.id} className={`${styles.projectCard} reveal`}>
                        <div className={styles.projectTag}>
                            <div className={`${styles.projectSwatch} ${swatchClassMap[project.tagClass] || ''}`}></div>
                            {project.tag}
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className={styles.pillRow}>
                            {project.pills.map((pill, idx) => (
                                <span key={idx} className={styles.pill}>{pill}</span>
                            ))}
                        </div>
                        <button
                            className={styles.btnGhost}
                            onClick={() => onProjectClick(project)}
                        >
                            View case
                        </button>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Work
