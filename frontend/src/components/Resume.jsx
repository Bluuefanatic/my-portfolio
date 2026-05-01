import { resumeSnapshot } from '../data/resume'
import styles from './Resume.module.css'

const Resume = ({ profile: profileProp }) => {
    return (
        <section className={styles.section} id="resume">
            <div className={`${styles.sectionTitle} reveal`}>
                <div>
                    <h2>Resume snapshot</h2>
                    <p>Download the full resume or scan a quick overview below.</p>
                </div>
                <a className={styles.btnGhost} href={profileProp.resumeUrl} download>Download resume</a>
            </div>
            <div className={styles.resumeGrid}>
                {resumeSnapshot.map((card) => (
                    <div key={card.id} className={`${styles.resumeCard} reveal`}>
                        <h4>{card.title}</h4>
                        <ul>
                            {card.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Resume
