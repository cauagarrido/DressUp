import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../contexts/CartContext'
import { format } from 'date-fns'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = id ? getProductById(id) : undefined

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Produto não encontrado</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-pastel-purple text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Voltar ao catálogo
        </button>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || !startDate || !endDate) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert('A data de término deve ser posterior à data de início')
      return
    }

    addToCart({
      product,
      startDate,
      endDate,
      quantity
    })

    alert('Produto adicionado ao carrinho!')
    navigate('/checkout')
  }

  const minDate = format(new Date(), 'yyyy-MM-dd')

  return (
    <div className="bg-surface-base border border-brand-primary/10 rounded-3xl shadow-[0_25px_60px_rgba(44,19,68,0.08)] p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-gradient-to-br from-brand-primary/90 via-brand-secondary/80 to-brand-accent/80 rounded-3xl h-96 flex items-center justify-center text-8xl text-white mb-4">
            {product.category === 'fantasia' && '✨'}
            {product.category === 'vestido' && '👗'}
            {product.category === 'terno' && '👔'}
            {product.category === 'acessorio' && '💎'}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((_, idx) => (
              <div
                key={idx}
                className="bg-surface-highlight border border-brand-primary/10 rounded-xl h-20 flex items-center justify-center text-brand-primary font-semibold"
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-brand-dark mb-4">{product.name}</h1>
          <p className="text-brand-dark/70 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-brand-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-brand-dark/60 ml-2">/dia</span>
          </div>

          {product.measurements && (
            <div className="bg-surface-highlight border border-brand-primary/10 rounded-2xl p-5 mb-6">
              <h3 className="font-semibold text-brand-dark mb-3">Medidas Disponíveis</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {product.measurements.bust && (
                  <div>
                    <span className="font-semibold text-brand-dark">Busto:</span>{' '}
                    <span className="text-brand-dark/70">{product.measurements.bust}</span>
                  </div>
                )}
                {product.measurements.waist && (
                  <div>
                    <span className="font-semibold text-brand-dark">Cintura:</span>{' '}
                    <span className="text-brand-dark/70">{product.measurements.waist}</span>
                  </div>
                )}
                {product.measurements.hip && (
                  <div>
                    <span className="font-semibold text-brand-dark">Quadril:</span>{' '}
                    <span className="text-brand-dark/70">{product.measurements.hip}</span>
                  </div>
                )}
                {product.measurements.length && (
                  <div>
                    <span className="font-semibold text-brand-dark">Comprimento:</span>{' '}
                    <span className="text-brand-dark/70">{product.measurements.length}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                Tamanho *
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl border-2 transition font-semibold ${
                      selectedSize === size
                        ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                        : 'border-brand-primary/20 hover:border-brand-primary/60'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                Cor *
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl border-2 transition font-semibold ${
                      selectedColor === color
                        ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                        : 'border-brand-primary/20 hover:border-brand-primary/60'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">
                  Data de Início *
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={minDate}
                  className="w-full px-4 py-2 border border-brand-primary/20 rounded-xl bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">
                  Data de Término *
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || minDate}
                  className="w-full px-4 py-2 border border-brand-primary/20 rounded-xl bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                Quantidade
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border border-brand-primary/20 text-brand-primary font-semibold hover:bg-brand-primary/10"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-xl border border-brand-primary/20 text-brand-primary font-semibold hover:bg-brand-primary/10"
                >
                  +
                </button>
                <span className="text-brand-dark/60 text-sm ml-4">
                  {product.stock} {product.stock === 1 ? 'disponível' : 'disponíveis'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-4 rounded-lg font-semibold text-white transition ${
              product.stock === 0
                ? 'bg-brand-dark/30 cursor-not-allowed'
                : 'bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/30'
            }`}
          >
            {product.stock === 0 ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>
    </div>
  )
}

