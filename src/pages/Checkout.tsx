import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { format, differenceInDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Checkout() {
  const { cartItems, clearCart, removeFromCart } = useCart()
  const navigate = useNavigate()

  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('card')
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [deliveryAddress, setDeliveryAddress] = useState('')

  if (cartItems.length === 0) {
    return (
      <div className="bg-surface-base border border-brand-primary/10 rounded-3xl shadow-xl p-10 text-center">
        <p className="text-brand-dark/80 text-lg mb-4">Seu carrinho está vazio</p>
        <button
          onClick={() => navigate('/')}
          className="bg-brand-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-primary/90 shadow shadow-brand-primary/40"
        >
          Continuar Comprando
        </button>
      </div>
    )
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const days = differenceInDays(new Date(item.endDate), new Date(item.startDate)) + 1
      return total + item.product.price * days * item.quantity
    }, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleCheckout = () => {
    if (!customerName || !customerEmail || !customerPhone) {
      alert('Por favor, preencha todos os dados do cliente')
      return
    }

    if (deliveryMethod === 'delivery' && !deliveryAddress) {
      alert('Por favor, informe o endereço de entrega')
      return
    }

    // Salvar pedido
    const rentals = cartItems.map(item => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      productId: item.product.id,
      productName: item.product.name,
      customerName,
      customerEmail,
      customerPhone,
      startDate: item.startDate,
      endDate: item.endDate,
      totalPrice: item.product.price * (differenceInDays(new Date(item.endDate), new Date(item.startDate)) + 1) * item.quantity,
      paymentMethod,
      deliveryMethod,
      deliveryAddress: deliveryMethod === 'delivery' ? deliveryAddress : undefined,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    }))

    const existingRentals = JSON.parse(localStorage.getItem('rentals') || '[]')
    localStorage.setItem('rentals', JSON.stringify([...existingRentals, ...rentals]))

    clearCart()
    alert('Pedido realizado com sucesso!')
    navigate('/')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-surface-base border border-brand-primary/10 rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Dados do Cliente</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-brand-primary/20 rounded-xl bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                E-mail *
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-3 border border-brand-primary/20 rounded-xl bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-3 border border-brand-primary/20 rounded-xl bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-surface-base border border-brand-primary/10 rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Forma de Pagamento</h2>
          <div className="space-y-3">
            {(['card', 'pix', 'boleto'] as const).map(method => (
              <label
                key={method}
                className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition ${
                  paymentMethod === method
                    ? 'border-brand-primary bg-brand-primary/10 shadow-sm'
                    : 'border-brand-primary/20 hover:border-brand-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="mr-3"
                />
                <span className="font-semibold text-brand-dark">
                  {method === 'card' && '💳 Cartão de Crédito/Débito'}
                  {method === 'pix' && '📱 PIX'}
                  {method === 'boleto' && '🧾 Boleto Bancário'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-surface-base border border-brand-primary/10 rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Forma de Entrega</h2>
          <div className="space-y-3 mb-4">
            <label
              className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition ${
                deliveryMethod === 'pickup'
                  ? 'border-brand-primary bg-brand-primary/10 shadow-sm'
                  : 'border-brand-primary/20 hover:border-brand-primary/50'
              }`}
            >
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === 'pickup'}
                onChange={() => setDeliveryMethod('pickup')}
                className="mr-3"
              />
              <span className="font-semibold text-brand-dark">🏪 Retirada na Loja</span>
            </label>
            <label
              className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition ${
                deliveryMethod === 'delivery'
                  ? 'border-brand-primary bg-brand-primary/10 shadow-sm'
                  : 'border-brand-primary/20 hover:border-brand-primary/50'
              }`}
            >
              <input
                type="radio"
                name="delivery"
                value="delivery"
                checked={deliveryMethod === 'delivery'}
                onChange={() => setDeliveryMethod('delivery')}
                className="mr-3"
              />
              <span className="font-semibold text-brand-dark">🚚 Entrega por Delivery</span>
            </label>
          </div>
          {deliveryMethod === 'delivery' && (
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                Endereço de Entrega *
              </label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-4 py-3 border border-brand-primary/20 rounded-xl bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                rows={3}
                required
              />
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-surface-base border border-brand-primary/10 rounded-3xl shadow-lg p-6 sticky top-24">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Resumo do Pedido</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => {
              const days = differenceInDays(new Date(item.endDate), new Date(item.startDate)) + 1
              const itemTotal = item.product.price * days * item.quantity
              return (
                <div key={item.product.id} className="border-b border-brand-primary/10 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-brand-dark">{item.product.name}</h3>
                      <p className="text-sm text-brand-dark/70">
                        {format(new Date(item.startDate), 'dd/MM/yyyy', { locale: ptBR })} - {format(new Date(item.endDate), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                      <p className="text-sm text-brand-dark/70">Qtd: {item.quantity} | {days} dia{days !== 1 ? 's' : ''}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-brand-dark">{formatPrice(itemTotal)}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="border-t border-brand-primary/10 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-brand-dark">Total:</span>
              <span className="text-2xl font-bold text-brand-primary">
                {formatPrice(calculateTotal())}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-brand-primary text-white py-3 rounded-xl font-semibold hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/40"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

