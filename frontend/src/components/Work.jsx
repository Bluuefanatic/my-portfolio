import { projects } from '../data/projects'

const Work = ({ onProjectClick }) => {

    return (
        <section className="section" id="work">
            <div className="section-title reveal">
                <div>
                    <h2>Selected work</h2>
                    <p>Web applications and projects built with React, Next.js, and modern tools.</p>
                </div>
                <a className="btn ghost" href="#contact">Get in touch</a>
            </div>
            <div className="grid projects">
                {projects.map((project) => (
                    <article key={project.id} className="project-card reveal">
                        <div className="project-tag">
                            <div className={`project-swatch ${project.tagClass}`}></div>
                            {project.tag}
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="pill-row">
                            {project.pills.map((pill, idx) => (
                                <span key={idx} className="pill">{pill}</span>
                            ))}
                        </div>
                        <button
                            className="btn ghost"
                            onClick={() => onProjectClick(project)}
                        >
                            View case
                        </button>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Work
