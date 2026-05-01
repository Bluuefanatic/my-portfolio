import styles from './Header.module.css'

const Header = ({ profile }) => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.brand}>
                    <div className={styles.brandBadge}>JI</div>
                    <span>{profile.name}</span>
                </div>
                <div className={styles.navLinks}>
                    <a href="#work">Work</a>
                    <a href="#about">About</a>
                    <a href="#skills">Skills</a>
                    <a href="#experience">Experience</a>
                    <a href="#resume">Resume</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
        </header>
    )
}

export default Header
