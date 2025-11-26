import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  user: { username: string; role: 'admin' | 'cliente' } | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const allowedUsers = [
  { username: 'admin', password: '12345', role: 'admin' as const },
  { username: 'cliente', password: '12345', role: 'cliente' as const },
]


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })
  
  
  const [user, setUser] = useState<AuthContextType['user']>(() => {
    const stored = localStorage.getItem('currentUser')
    
    return stored ? JSON.parse(stored) : null
  })

  const login = (username: string, password: string): boolean => {
    const match = allowedUsers.find(
      (allowed) => allowed.username === username && allowed.password === password
    )

    if (match) {
      setIsAuthenticated(true)
      setUser({ username: match.username, role: match.role })
     
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem(
        'currentUser',
        JSON.stringify({ username: match.username, role: match.role })
      )
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context as AuthContextType 
}
