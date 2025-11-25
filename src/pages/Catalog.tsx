import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { Product } from '../types'

const categories = [
  { id: 'all', name: 'Todos', icon: '👗' },
  { id: 'fantasia', name: 'Fantasias', icon: '✨' },
  { id: 'vestido', name: 'Vestidos', icon: '👗' },
  { id: 'terno', name: 'Ternos', icon: '👔' },
  { id: 'acessorio', name: 'Acessórios', icon: '💎' },
]

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Catálogo de Roupas</h1>
        <p className="text-gray-600">Encontre o look perfeito para sua festa</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block px-4 py-3 border border-brand-primary/30 rounded-2xl bg-white/90 shadow-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full font-semibold tracking-tight transition ${
              selectedCategory === category.id
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                : 'bg-white text-brand-dark/70 border border-brand-primary/20 hover:border-brand-primary/40'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  )
}

function ProductCard({ product, formatPrice }: { product: Product; formatPrice: (price: number) => string }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-surface-base rounded-2xl border border-brand-primary/10 shadow-[0_15px_40px_rgba(44,19,68,0.08)] overflow-hidden hover:-translate-y-2 transition"
    >
      <div className="relative h-64 bg-gradient-to-br from-brand-primary/85 via-brand-secondary/80 to-brand-accent/80 text-white">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-90">
          {product.category === 'fantasia' && '✨'}
          {product.category === 'vestido' && '👗'}
          {product.category === 'terno' && '👔'}
          {product.category === 'acessorio' && '💎'}
        </div>
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Esgotado
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-brand-dark mb-2">{product.name}</h3>
        <p className="text-brand-dark/70 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-brand-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-brand-dark/70">
            {product.stock} {product.stock === 1 ? 'disponível' : 'disponíveis'}
          </span>
        </div>
      </div>
    </Link>
  )
}

