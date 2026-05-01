import { skillsCategories } from '../data/skills'

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
                {skillsCategories.map((skill) => (
                    <div key={skill.id} className="project-card reveal">
                        <h3>{skill.title}</h3>
                        <p>{skill.description}</p>
                        <div className="pill-row">
                            {skill.pills.map((pill, idx) => (
                                <span key={idx} className="pill">{pill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Skills
