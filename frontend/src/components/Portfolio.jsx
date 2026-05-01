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
import { profile } from '../data/profile'

const Portfolio = () => {
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
      <Header profile={profile} />
      <main>
        <Hero profile={profile} />
        <Work onProjectClick={setSelectedProject} />
        <About />
        <Resume profile={profile} />
        <Skills />
        <Experience />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

export default Portfolio
