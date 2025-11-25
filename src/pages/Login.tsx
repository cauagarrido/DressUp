import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (login(username, password)) {
      navigate('/')
    } else {
      setError('Usuário ou senha incorretos')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-primary via-brand-secondary/90 to-brand-accent/80 px-4">
      <div className="bg-surface-base/95 border border-brand-primary/15 rounded-3xl shadow-2xl p-8 w-full max-w-md backdrop-blur">
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-4 py-1 text-sm font-semibold text-brand-dark bg-brand-light rounded-full mb-3">
            Bem-vindo de volta
          </span>
          <h1 className="text-4xl font-extrabold text-brand-dark mb-2 tracking-tight">
            DressUp
          </h1>
          <p className="text-brand-dark/70">Aluguel de Roupas de Festa</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-brand-dark mb-2">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-brand-primary/30 rounded-xl bg-white/80 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition"
              placeholder="Digite seu usuário"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-brand-dark mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-brand-primary/30 rounded-xl bg-white/80 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition"
              placeholder="Digite sua senha"
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-brand-primary text-white py-3 rounded-xl font-semibold hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/30"
          >
            Entrar
          </button>
        </form>
        
        <div className="mt-6 text-sm text-brand-dark/80 space-y-1">
          <p className="font-semibold">Acessos disponíveis:</p>
          <p>Administração → usuário <strong>admin</strong> | senha <strong>12345</strong></p>
          <p>Cliente → usuário <strong>cliente</strong> | senha <strong>12345</strong></p>
        </div>
      </div>
    </div>
  )
}

