import styles from './Hero.module.css'
import shared from '../styles/shared.module.css'

const Hero = ({ profile }) => {
    return (
        <section className={styles.hero}>
            <div className={`${styles.heroText} reveal`}>
                <p className={shared.pill}>{profile.role}</p>
                <h1>{profile.headline}</h1>
                <p>{profile.intro}</p>
                <div className={shared.heroCta}>
                    <a className={`${shared.btn} ${shared.btnPrimary}`} href="#contact">Start a project</a>
                    <a className={`${shared.btn} ${shared.btnGhost}`} href="#work">View case studies</a>
                </div>
            </div>
            <div className={`${styles.heroCard} reveal`}>
                <div className={styles.stat}>
                    <h3>{profile.statYears}</h3>
                    <span>Professional experience</span>
                </div>
                <div className={styles.stat}>
                    <h3>{profile.statLaunches}</h3>
                    <span>Completed projects</span>
                </div>
                <div className={styles.stat}>
                    <h3>{profile.statTeams}</h3>
                    <span>Team collaborations</span>
                </div>
                <div className={shared.pillRow}>
                    <span className={shared.pill}>React & Next.js</span>
                    <span className={shared.pill}>Tailwind CSS</span>
                    <span className={shared.pill}>Testing</span>
                </div>
            </div>
        </section>
    )
}

export default Hero
