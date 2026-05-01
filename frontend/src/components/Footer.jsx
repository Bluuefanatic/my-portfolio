const Footer = ({ profile }) => {
    return (
        <footer className="footer">
            <span>{profile.location}</span>
            <span>© <span id="year">{new Date().getFullYear()}</span> {profile.name}. All rights reserved.</span>
        </footer>
    )
}

export default Footer
