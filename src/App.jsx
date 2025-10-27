import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import CadastroInsumo from './components/CadastroInsumo'
import GestaoEstoque from './components/GestaoEstoque'

function App() {
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState('dashboard')

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Dashboard 
      user={user} 
      onLogout={handleLogout}
      currentView={currentView}
      setCurrentView={setCurrentView}
    />
  )
}

export default App

