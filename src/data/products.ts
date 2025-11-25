import { Product } from '../types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Fantasia de Princesa Elsa',
    category: 'fantasia',
    description: 'Lindo vestido de princesa inspirado na Elsa, com detalhes em azul e prata. Perfeito para festas temáticas e aniversários.',
    price: 150.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['P', 'M', 'G'],
    colors: ['Azul', 'Branco'],
    measurements: {
      bust: '80-100cm',
      waist: '60-80cm',
      length: '120cm'
    },
    stock: 3,
    availableDates: []
  },
  {
    id: '2',
    name: 'Vestido de Gala Longo',
    category: 'vestido',
    description: 'Elegante vestido de gala longo em tecido nobre, ideal para casamentos e eventos formais.',
    price: 200.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Rosa', 'Azul', 'Preto'],
    measurements: {
      bust: '85-105cm',
      waist: '65-85cm',
      length: '140cm'
    },
    stock: 5,
    availableDates: []
  },
  {
    id: '3',
    name: 'Terno Social Clássico',
    category: 'terno',
    description: 'Terno social elegante, perfeito para eventos formais, casamentos e cerimônias.',
    price: 180.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['38', '40', '42', '44', '46'],
    colors: ['Preto', 'Azul Marinho', 'Cinza'],
    measurements: {
      bust: '90-110cm',
      waist: '75-95cm',
      length: '100cm'
    },
    stock: 4,
    availableDates: []
  },
  {
    id: '4',
    name: 'Fantasia de Super-Herói',
    category: 'fantasia',
    description: 'Fantasia completa de super-herói com capa e máscara. Ideal para festas infantis e eventos temáticos.',
    price: 120.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['P', 'M', 'G'],
    colors: ['Vermelho', 'Azul', 'Preto'],
    measurements: {
      bust: '75-95cm',
      waist: '60-80cm',
      length: '110cm'
    },
    stock: 6,
    availableDates: []
  },
  {
    id: '5',
    name: 'Vestido Curto de Festa',
    category: 'vestido',
    description: 'Charmoso vestido curto para festas e eventos casuais. Confortável e estiloso.',
    price: 100.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa', 'Lilás', 'Amarelo'],
    measurements: {
      bust: '80-100cm',
      waist: '60-80cm',
      length: '80cm'
    },
    stock: 8,
    availableDates: []
  },
  {
    id: '6',
    name: 'Tiara de Princesa',
    category: 'acessorio',
    description: 'Elegante tiara de princesa com pedras brilhantes. Complemento perfeito para qualquer look de festa.',
    price: 30.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['Único'],
    colors: ['Prata', 'Dourado', 'Rosa'],
    stock: 15,
    availableDates: []
  },
  {
    id: '7',
    name: 'Fantasia de Bailarina',
    category: 'fantasia',
    description: 'Delicada fantasia de bailarina com tutu e sapatilhas. Perfeita para apresentações e festas.',
    price: 130.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa', 'Branco', 'Azul'],
    measurements: {
      bust: '75-95cm',
      waist: '60-80cm',
      length: '100cm'
    },
    stock: 4,
    availableDates: []
  },
  {
    id: '8',
    name: 'Terno Esportivo',
    category: 'terno',
    description: 'Terno esportivo moderno, ideal para eventos casuais e festas temáticas.',
    price: 150.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['38', '40', '42', '44'],
    colors: ['Azul', 'Verde', 'Vermelho'],
    measurements: {
      bust: '88-108cm',
      waist: '72-92cm',
      length: '95cm'
    },
    stock: 5,
    availableDates: []
  },
  {
    id: '9',
    name: 'Bolsa de Festa',
    category: 'acessorio',
    description: 'Elegante bolsa de festa para complementar seu look. Disponível em várias cores.',
    price: 40.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['Único'],
    colors: ['Dourado', 'Prata', 'Rosa', 'Preto'],
    stock: 12,
    availableDates: []
  },
  {
    id: '10',
    name: 'Vestido de Noiva',
    category: 'vestido',
    description: 'Deslumbrante vestido de noiva com detalhes em renda e pedrarias. Sonho de toda noiva.',
    price: 500.00,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Marfim'],
    measurements: {
      bust: '85-110cm',
      waist: '65-90cm',
      length: '150cm'
    },
    stock: 2,
    availableDates: []
  }
]

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}

