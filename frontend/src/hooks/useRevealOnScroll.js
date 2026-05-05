import { useEffect } from 'react'

const useRevealOnScroll = (selector = '.reveal', threshold = 0.15) => {
  useEffect(() => {
    const revealElements = document.querySelectorAll(selector)
    const observer = new IntersectionObserver(
      (entries, intersectionObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            intersectionObserver.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [selector, threshold])
}

export default useRevealOnScroll
