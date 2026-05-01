const Resume = ({ profile }) => {
    return (
        <section className="section" id="resume">
            <div className="section-title reveal">
                <div>
                    <h2>Resume snapshot</h2>
                    <p>Download the full resume or scan a quick overview below.</p>
                </div>
                <a className="btn ghost" href={profile.resumeUrl} download>Download resume</a>
            </div>
            <div className="resume-grid">
                <div className="resume-card reveal">
                    <h4>Focus areas</h4>
                    <ul>
                        <li>Responsive web development</li>
                        <li>Reusable component design</li>
                        <li>Automated testing & QA</li>
                    </ul>
                </div>
                <div className="resume-card reveal">
                    <h4>Education</h4>
                    <ul>
                        <li>BSc Computer Science</li>
                        <li>ALX Software Engineering</li>
                        <li>Frontend Specialization</li>
                    </ul>
                </div>
                <div className="resume-card reveal">
                    <h4>Technical Skills</h4>
                    <ul>
                        <li>React, Next.js, Tailwind CSS</li>
                        <li>JavaScript, TypeScript</li>
                        <li>Cypress, Appium, JMeter</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Resume
