import { about } from '../data/about'

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
                    {about.map((card) => (
                        <div key={card.id} className="about-card">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About
