import styles from './Header.module.css'
import { useTheme } from '../contexts/ThemeContext'

const Header = ({ profile }) => {
    const { theme, toggleTheme } = useTheme()

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
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header
