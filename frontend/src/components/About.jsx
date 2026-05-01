import { about } from '../data/about'
import styles from './About.module.css'

const About = () => {
    return (
        <section className={styles.section} id="about">
            <div className={`${styles.about} reveal`}>
                <div className={styles.sectionTitle}>
                    <div>
                        <h2>About me</h2>
                        <p>Frontend developer focused on building responsive, user-centered web applications with clean code.</p>
                    </div>
                </div>
                <div className={styles.aboutGrid}>
                    {about.map((card) => (
                        <div key={card.id} className={styles.aboutCard}>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About
