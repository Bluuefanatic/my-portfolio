import { experience } from '../data/experience'

const Experience = () => {
    return (
        <section className="section" id="experience">
            <div className="section-title reveal">
                <div>
                    <h2>Experience</h2>
                    <p>Professional journey building web applications and learning software engineering fundamentals.</p>
                </div>
            </div>
            <div className="timeline">
                {experience.map((item) => (
                    <div key={item.id} className="timeline-item reveal">
                        <h3>{item.title}</h3>
                        <span>{item.period}</span>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Experience
