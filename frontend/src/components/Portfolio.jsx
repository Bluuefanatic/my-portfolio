import { useState } from 'react'
import Header from './Header'
import Hero from './Hero'
import Work from './Work'
import About from './About'
import Resume from './Resume'
import Skills from './Skills'
import Experience from './Experience'
import Contact from './Contact'
import Footer from './Footer'
import ProjectModal from './ProjectModal'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const Portfolio = () => {
    const [selectedProjectId, setSelectedProjectId] = useState(null)

    useRevealOnScroll()

    const selectedProject = projects.find((project) => project.id === selectedProjectId) || null

    return (
        <>
            <Header profile={profile} />
            <main>
                <Hero profile={profile} />
                <Work onProjectSelect={setSelectedProjectId} />
                <About />
                <Resume profile={profile} />
                <Skills />
                <Experience />
                <Contact profile={profile} />
            </main>
            <Footer profile={profile} />
            <ProjectModal project={selectedProject} onClose={() => setSelectedProjectId(null)} />
        </>
    )
}

export default Portfolio
