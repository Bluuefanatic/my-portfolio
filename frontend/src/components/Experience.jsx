import { experience } from '../data/experience'
import styles from './Experience.module.css'
import shared from '../styles/shared.module.css'

const Experience = () => {
    return (
        <section className={shared.section} id="experience">
            <div className={`${shared.sectionTitle} reveal`}>
                <div>
                    <h2>Experience</h2>
                    <p>Professional journey building web applications and learning software engineering fundamentals.</p>
                </div>
            </div>
            <div className={styles.timeline}>
                {experience.map((item) => (
                    <div key={item.id} className={`${styles.timelineItem} reveal`}>
                        <h3>{item.title}</h3>
                        <span>{item.period}</span>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Experience
