const Skills = () => {
    return (
        <section className="section" id="skills">
            <div className="section-title reveal">
                <div>
                    <h2>Skills & tools</h2>
                    <p>Frontend development, testing, and modern JavaScript frameworks.</p>
                </div>
            </div>
            <div className="grid projects">
                <div className="project-card reveal">
                    <h3>Frontend Development</h3>
                    <p>Building responsive web applications with modern JavaScript frameworks and component libraries.</p>
                    <div className="pill-row">
                        <span className="pill">React</span>
                        <span className="pill">Next.js</span>
                        <span className="pill">Tailwind CSS</span>
                        <span className="pill">TypeScript</span>
                    </div>
                </div>
                <div className="project-card reveal">
                    <h3>Testing & QA</h3>
                    <p>Automated testing for frontend and backend, ensuring quality and reliability.</p>
                    <div className="pill-row">
                        <span className="pill">Cypress</span>
                        <span className="pill">Appium</span>
                        <span className="pill">JMeter</span>
                    </div>
                </div>
                <div className="project-card reveal">
                    <h3>Backend & Tools</h3>
                    <p>Fullstack exposure with Node.js, Express, MongoDB, and version control.</p>
                    <div className="pill-row">
                        <span className="pill">Node.js</span>
                        <span className="pill">Express</span>
                        <span className="pill">MongoDB</span>
                        <span className="pill">Git/GitHub</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills
