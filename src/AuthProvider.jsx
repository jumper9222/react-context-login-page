import AuthContext from './AuthContext'
import { useState } from 'react'

export default function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState()
  const userDatabase = [
    {
      username: 'user',
      password: 'password',
      name: 'John Doe',
      email: 'user@email.com',
    },
    {
      username: 'admin',
      password: 'adminpass',
      name: 'admin',
      email: 'admin@email.com',
    },
  ]

  function handleLogin(username, password, userDatabase) {
    for (const user of userDatabase) {
      if (username === user.username && password === user.password) {
        setCurrentUser(user)
        break
      }
    }
  }

  function logout() {
    setCurrentUser()
  }

  return (
    <AuthContext.Provider value={{ handleLogin, currentUser, logout, userDatabase }}>
      {children}
    </AuthContext.Provider>
  )
}
