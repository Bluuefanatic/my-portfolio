const About = () => {
    return (
        <section className="section" id="about">
            <div className="about reveal">
                <div className="section-title">
                    <div>
                        <h2>About me</h2>
                        <p>Frontend developer focused on building responsive, user-centered web applications with clean code.</p>
                    </div>
                </div>
                <div className="about-grid">
                    <div className="about-card">
                        <h3>Component-driven</h3>
                        <p>I build reusable, maintainable components with React and Next.js, focusing on clean architecture and consistent UI patterns across applications.</p>
                    </div>
                    <div className="about-card">
                        <h3>Quality-focused</h3>
                        <p>I implement automated testing with Cypress and Appium, ensuring reliability and reducing bugs before they reach production.</p>
                    </div>
                    <div className="about-card">
                        <h3>Team collaboration</h3>
                        <p>Experienced working in team environments, maintaining clean Git workflows, and collaborating on UX improvements and code reviews.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
