import { useState } from 'react'
import api from '../services/api'
import './Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/login', { email, senha })
      onLogin(response.data)
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao fazer login'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🍵 Gestão de Cafeteria</h1>
        <h2>Login</h2>
        
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="login-info">
          <p><strong>Usuários de teste:</strong></p>
          <ul>
            <li>joao@cafeteria.com / senha123 (Gerente)</li>
            <li>maria@cafeteria.com / senha123 (Barista)</li>
            <li>pedro@cafeteria.com / senha123 (Estoquista)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login

