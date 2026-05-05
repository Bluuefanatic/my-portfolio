import styles from './Footer.module.css'
import useCurrentYear from '../hooks/useCurrentYear'

const Footer = ({ profile }) => {
    const currentYear = useCurrentYear()

    return (
        <footer className={styles.footer}>
            <span>{profile.location}</span>
            <span>© <span id="year">{currentYear}</span> {profile.name}. All rights reserved.</span>
        </footer>
    )
}

export default Footer
