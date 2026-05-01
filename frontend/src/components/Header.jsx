const Header = ({ profile }) => {
    return (
        <header>
            <nav className="nav">
                <div className="brand">
                    <div className="brand-badge">JI</div>
                    <span>{profile.name}</span>
                </div>
                <div className="nav-links">
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
