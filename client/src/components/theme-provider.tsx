// import { createContext, useContext, useEffect, useState } from "react"

// type Theme = "dark" | "light" | "system"

// type ThemeProviderProps = {
//   children: React.ReactNode
//   defaultTheme?: Theme
//   storageKey?: string
// }

// type ThemeProviderState = {
//   theme: Theme
//   setTheme: (theme: Theme) => void
// }

// const initialState: ThemeProviderState = {
//   theme: "system",
//   setTheme: () => null,
// }

// const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// export function ThemeProvider({
//   children,
//   defaultTheme = "system",
//   storageKey = "vite-ui-theme",
//   ...props
// }: ThemeProviderProps) {
//   const [theme, setTheme] = useState<Theme>(
//     () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
//   )

//   useEffect(() => {
//     const root = window.document.documentElement

//     root.classList.remove("light", "dark")

//     if (theme === "system") {
//       const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
//         .matches
//         ? "dark"
//         : "light"

//       root.classList.add(systemTheme)
//       return
//     }

//     root.classList.add(theme)
//   }, [theme])

//   const value = {
//     theme,
//     setTheme: (theme: Theme) => {
//       localStorage.setItem(storageKey, theme)
//       setTheme(theme)
//     },
//   }

//   return (
//     <ThemeProviderContext.Provider {...props} value={value}>
//       {children}
//     </ThemeProviderContext.Provider>
//   )
// }

// export const useTheme = () => {
//   const context = useContext(ThemeProviderContext)

//   if (context === undefined)
//     throw new Error("useTheme must be used within a ThemeProvider")

//   return context
// }

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light", // Default fallback
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    getSystemTheme()
  )

  // Function to get system theme
  function getSystemTheme(): ResolvedTheme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    let actualTheme: ResolvedTheme
    if (theme === "system") {
      actualTheme = getSystemTheme()
    } else {
      actualTheme = theme as ResolvedTheme
    }

    // Set the resolved theme state
    setResolvedTheme(actualTheme)
    
    // Apply theme to DOM
    root.classList.add(actualTheme)

    // Listen for system theme changes when in system mode
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      
      const updateSystemTheme = (e: MediaQueryListEvent) => {
        const newSystemTheme: ResolvedTheme = e.matches ? "dark" : "light"
        setResolvedTheme(newSystemTheme)
        root.classList.remove("light", "dark")
        root.classList.add(newSystemTheme)
      }
      
      mediaQuery.addEventListener("change", updateSystemTheme)
      return () => mediaQuery.removeEventListener("change", updateSystemTheme)
    }
  }, [theme])

  const value = {
    theme,
    resolvedTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}