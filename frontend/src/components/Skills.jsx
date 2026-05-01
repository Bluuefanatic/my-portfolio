import { skillsCategories } from '../data/skills'
import styles from './Skills.module.css'
import shared from '../styles/shared.module.css'

const Skills = () => {
    return (
        <section className={shared.section} id="skills">
            <div className={`${shared.sectionTitle} reveal`}>
                <div>
                    <h2>Skills & tools</h2>
                    <p>Frontend development, testing, and modern JavaScript frameworks.</p>
                </div>
            </div>
            <div className={`${styles.grid} ${styles.projects}`}>
                {skillsCategories.map((skill) => (
                    <div key={skill.id} className={`${styles.projectCard} reveal`}>
                        <h3>{skill.title}</h3>
                        <p>{skill.description}</p>
                        <div className={shared.pillRow}>
                            {skill.pills.map((pill, idx) => (
                                <span key={idx} className={shared.pill}>{pill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Skills
