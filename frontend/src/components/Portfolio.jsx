import { useEffect, useState } from 'react'
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

const Portfolio = () => {
    const [profileData, setProfileData] = useState({
        name: 'Joel Iziren',
        role: 'Frontend Developer · Software Engineer',
        headline: 'Building responsive web applications with React, Next.js, and modern tools.',
        intro: "I'm Joel Iziren, a Frontend Developer with hands-on experience building responsive web applications using React, Next.js, and Tailwind CSS. I specialize in reusable component design, form validation, and automated testing. Based in Nigeria, collaborating globally.",
        location: 'Based in Nigeria · Available worldwide',
        statYears: '1+ year',
        statLaunches: '3+ projects',
        statTeams: '2 teams',
        email: 'izirenjoel@gmail.com',
        linkedin: 'https://www.linkedin.com/in/joel-iziren',
        github: 'https://github.com/Bluuefanatic',
        resumeUrl: 'resume.pdf',
    })

    const [selectedProject, setSelectedProject] = useState(null)

    useEffect(() => {
        // Scroll reveal animation
        const revealElements = document.querySelectorAll('.reveal')
        const revealOnIntersect = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        revealElements.forEach((el) => revealOnIntersect.observe(el))

        return () => revealOnIntersect.disconnect()
    }, [])

    return (
        <>
            <Header profile={profileData} />
            <main>
                <Hero profile={profileData} />
                <Work onProjectClick={setSelectedProject} />
                <About />
                <Resume profile={profileData} />
                <Skills />
                <Experience />
                <Contact profile={profileData} />
            </main>
            <Footer profile={profileData} />
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </>
    )
}

export default Portfolio
