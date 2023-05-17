import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches
  const storeDarkMode = localStorage.getItem('darkTheme') === 'true'
  return storeDarkMode || prefersDarkMode
}

export const AppProvider = ({ children }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
	const [searchTerm, setSearchTerm] = useState('office')

	const toggleDarkTheme = () => {
		setIsDarkTheme(!isDarkTheme)
    localStorage.setItem('darkTheme', !isDarkTheme)
	}

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])

	return (
		<AppContext.Provider value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => useContext(AppContext)
