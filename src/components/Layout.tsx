import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth()
  const { cartItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-surface-muted text-brand-dark">
      <nav className="bg-white/90 border-b border-brand-dark/5 backdrop-blur-xl shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-extrabold text-brand-dark tracking-tight">
              DressUp
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-brand-dark/80 hover:text-brand-primary transition font-medium"
              >
                Catálogo
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-brand-dark/80 hover:text-brand-primary transition font-medium"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/checkout"
                className="relative text-brand-dark/80 hover:text-brand-primary transition font-medium"
              >
                Carrinho
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow shadow-brand-secondary/40">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-brand-primary text-white px-4 py-2 rounded-xl hover:bg-brand-primary/90 transition shadow shadow-brand-primary/30"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  )
}

