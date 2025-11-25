import { useState, useEffect } from 'react'
import { Rental } from '../types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Admin() {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null)

  useEffect(() => {
    loadRentals()
  }, [])

  const loadRentals = () => {
    const saved = localStorage.getItem('rentals')
    if (saved) {
      setRentals(JSON.parse(saved))
    }
  }

  const updateRentalStatus = (id: string, status: Rental['status']) => {
    const updated = rentals.map(r => r.id === id ? { ...r, status } : r)
    setRentals(updated)
    localStorage.setItem('rentals', JSON.stringify(updated))
    setSelectedRental(null)
  }

  const filteredRentals = filter === 'all' 
    ? rentals 
    : rentals.filter(r => r.status === filter)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getStatusColor = (status: Rental['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Rental['status']) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'confirmed': return 'Confirmado'
      case 'completed': return 'Concluído'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  const stats = {
    total: rentals.length,
    pending: rentals.filter(r => r.status === 'pending').length,
    confirmed: rentals.filter(r => r.status === 'confirmed').length,
    completed: rentals.filter(r => r.status === 'completed').length,
    revenue: rentals.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.totalPrice, 0)
  }

  return (
    <div className="text-brand-dark">
      <h1 className="text-4xl font-bold text-brand-dark mb-8">Área Administrativa</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-surface-base border border-brand-primary/10 rounded-2xl shadow-lg p-6">
          <div className="text-3xl font-bold">{stats.total}</div>
          <div className="text-brand-dark/70">Total de Pedidos</div>
        </div>
        <div className="rounded-2xl shadow-lg p-6 bg-amber-100 text-amber-900">
          <div className="text-3xl font-bold">{stats.pending}</div>
          <div>Pendentes</div>
        </div>
        <div className="rounded-2xl shadow-lg p-6 bg-blue-100 text-blue-900">
          <div className="text-3xl font-bold">{stats.confirmed}</div>
          <div>Confirmados</div>
        </div>
        <div className="rounded-2xl shadow-lg p-6 bg-emerald-100 text-emerald-900">
          <div className="text-3xl font-bold">{stats.completed}</div>
          <div>Concluídos</div>
        </div>
        <div className="rounded-2xl shadow-lg p-6 bg-brand-primary text-white">
          <div className="text-3xl font-bold">{formatPrice(stats.revenue)}</div>
          <div className="text-white/80">Receita Total</div>
        </div>
      </div>

      <div className="bg-surface-base border border-brand-primary/10 rounded-3xl shadow-xl p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-2xl font-semibold transition ${
                filter === f
                  ? 'bg-brand-primary text-white shadow shadow-brand-primary/40'
                  : 'bg-white text-brand-dark/70 border border-brand-primary/20 hover:border-brand-primary/50'
              }`}
            >
              {f === 'all' ? 'Todos' : getStatusLabel(f)}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-primary/10 text-brand-dark/70">
                <th className="text-left py-3 px-4 font-semibold">Cliente</th>
                <th className="text-left py-3 px-4 font-semibold">Produto</th>
                <th className="text-left py-3 px-4 font-semibold">Período</th>
                <th className="text-left py-3 px-4 font-semibold">Valor</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredRentals.map(rental => (
                <tr key={rental.id} className="border-b border-brand-primary/5 hover:bg-brand-primary/5">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-semibold text-brand-dark">{rental.customerName}</div>
                      <div className="text-sm text-brand-dark/70">{rental.customerEmail}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-brand-dark">{rental.productName}</td>
                  <td className="py-3 px-4 text-brand-dark/70 text-sm">
                    {format(new Date(rental.startDate), 'dd/MM/yyyy', { locale: ptBR })} - {format(new Date(rental.endDate), 'dd/MM/yyyy', { locale: ptBR })}
                  </td>
                  <td className="py-3 px-4 font-semibold text-brand-dark">{formatPrice(rental.totalPrice)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rental.status)}`}>
                      {getStatusLabel(rental.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedRental(rental)}
                      className="text-brand-primary hover:text-brand-secondary font-semibold text-sm"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRentals.length === 0 && (
            <div className="text-center py-12 text-brand-dark/60">
              Nenhum pedido encontrado
            </div>
          )}
        </div>
      </div>

      {selectedRental && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-base border border-brand-primary/10 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brand-dark">Detalhes do Pedido</h2>
                <button
                  onClick={() => setSelectedRental(null)}
                  className="text-brand-dark/60 hover:text-brand-dark text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 mb-6 text-brand-dark">
                <div>
                  <h3 className="font-semibold text-brand-dark/80 mb-2">Cliente</h3>
                  <p className="font-semibold">{selectedRental.customerName}</p>
                  <p className="text-sm text-brand-dark/70">{selectedRental.customerEmail}</p>
                  <p className="text-sm text-brand-dark/70">{selectedRental.customerPhone}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark/80 mb-2">Produto</h3>
                  <p>{selectedRental.productName}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark/80 mb-2">Período</h3>
                  <p>
                    {format(new Date(selectedRental.startDate), 'dd/MM/yyyy', { locale: ptBR })} -{' '}
                    {format(new Date(selectedRental.endDate), 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark/80 mb-2">Valor</h3>
                  <p className="text-xl font-bold text-brand-primary">{formatPrice(selectedRental.totalPrice)}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark/80 mb-2">Pagamento</h3>
                  <p>
                    {selectedRental.paymentMethod === 'card' && '💳 Cartão'}
                    {selectedRental.paymentMethod === 'pix' && '📱 PIX'}
                    {selectedRental.paymentMethod === 'boleto' && '🧾 Boleto'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark/80 mb-2">Entrega</h3>
                  <p>
                    {selectedRental.deliveryMethod === 'pickup' ? '🏪 Retirada na Loja' : '🚚 Entrega por Delivery'}
                  </p>
                  {selectedRental.deliveryAddress && (
                    <p className="text-sm text-brand-dark/70 mt-1">{selectedRental.deliveryAddress}</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark/80 mb-2">Status</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedRental.status)}`}>
                    {getStatusLabel(selectedRental.status)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {selectedRental.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateRentalStatus(selectedRental.id, 'confirmed')}
                      className="flex-1 bg-brand-primary text-white py-2 rounded-xl hover:bg-brand-primary/90"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => updateRentalStatus(selectedRental.id, 'cancelled')}
                      className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
                    >
                      Cancelar
                    </button>
                  </>
                )}
                {selectedRental.status === 'confirmed' && (
                  <button
                    onClick={() => updateRentalStatus(selectedRental.id, 'completed')}
                    className="flex-1 bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600"
                  >
                    Marcar como Concluído
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

