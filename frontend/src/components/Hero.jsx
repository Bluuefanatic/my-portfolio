const Hero = ({ profile }) => {
    return (
        <section className="hero">
            <div className="hero-text reveal">
                <p className="pill">{profile.role}</p>
                <h1>{profile.headline}</h1>
                <p>{profile.intro}</p>
                <div className="hero-cta">
                    <a className="btn primary" href="#contact">Start a project</a>
                    <a className="btn ghost" href="#work">View case studies</a>
                </div>
            </div>
            <div className="hero-card reveal">
                <div className="stat">
                    <h3>{profile.statYears}</h3>
                    <span>Professional experience</span>
                </div>
                <div className="stat">
                    <h3>{profile.statLaunches}</h3>
                    <span>Completed projects</span>
                </div>
                <div className="stat">
                    <h3>{profile.statTeams}</h3>
                    <span>Team collaborations</span>
                </div>
                <div className="pill-row">
                    <span className="pill">React & Next.js</span>
                    <span className="pill">Tailwind CSS</span>
                    <span className="pill">Testing</span>
                </div>
            </div>
        </section>
    )
}

export default Hero
