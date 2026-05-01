const Work = ({ onProjectClick }) => {
    const projects = [
        {
            id: 1,
            tag: 'Fullstack Web App',
            tagClass: '',
            title: 'Amber Alert PRO',
            description: 'Web application for reporting missing persons and sending real-time alerts.',
            pills: ['React', 'Next.js', 'Node.js'],
            summary: 'Developed a web application for reporting missing persons and sending real-time alerts with location-based features.',
            role: 'Frontend Developer',
            duration: '3 months',
            impact: 'Reduced input errors by 20% with Formik validation and improved UI consistency.',
            highlights: ['React components', 'Formik validation', 'Google Maps API', 'Firebase Auth', 'Tailwind CSS'],
        },
        {
            id: 2,
            tag: 'Portfolio Site',
            tagClass: 'gradient-blue-green',
            title: 'Personal Portfolio',
            description: 'Responsive portfolio website showcasing projects and skills with modern UI.',
            pills: ['JavaScript', 'CSS', 'Responsive design'],
            summary: 'Built a fully responsive portfolio website with smooth animations and interactive UI components.',
            role: 'Frontend Developer',
            duration: '2 weeks',
            impact: 'Clean, maintainable codebase with professional presentation.',
            highlights: ['Vanilla JavaScript', 'CSS animations', 'Form validation', 'Responsive grid'],
        },
        {
            id: 3,
            tag: 'Testing & QA',
            tagClass: 'gradient-pink-red',
            title: 'Automated Testing Suite',
            description: 'End-to-end testing implementation for web and mobile applications.',
            pills: ['Cypress', 'Appium', 'JMeter'],
            summary: 'Implemented automated frontend and backend testing with Cypress, Appium, and JMeter for web and mobile apps.',
            role: 'QA Engineer',
            duration: 'Ongoing',
            impact: 'Improved test coverage and reduced manual testing time.',
            highlights: ['Cypress E2E tests', 'Appium mobile testing', 'Performance testing with JMeter'],
        },
    ]

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
