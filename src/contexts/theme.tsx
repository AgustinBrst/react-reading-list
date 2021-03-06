import React, { createContext, useState, useContext } from 'react'
import { Theme } from '../constants'

type ThemeContextValue =
  | [Theme, React.Dispatch<React.SetStateAction<Theme>>]
  | undefined

const ThemeContext = createContext<ThemeContextValue>(undefined)
ThemeContext.displayName = 'ThemeContext'

type Props = {
  children: React.ReactNode
  initialValue?: Theme
}

function ThemeProvider({ children, initialValue = Theme.light }: Props) {
  const [theme, setTheme] = useState(initialValue)

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeProvider, useTheme }
