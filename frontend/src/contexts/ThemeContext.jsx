import { useEffect, useState, useContext, createContext } from 'react'

const ThemeContext = createContext(undefined)

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get stored theme or detect system preference on first load
    const storedTheme = localStorage.getItem('theme')
    
    let initialTheme
    if (storedTheme) {
      initialTheme = storedTheme
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialTheme = 'dark'
    } else {
      initialTheme = 'light'
    }

    setTheme(initialTheme)
    applyTheme(initialTheme)
    setIsLoading(false)
  }, [])

  const applyTheme = (themeValue) => {
    if (themeValue === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', themeValue)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export { ThemeProvider, useTheme }
