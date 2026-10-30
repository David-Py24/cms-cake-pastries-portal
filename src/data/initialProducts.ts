import { Product } from '../types';

export const PRESET_IMAGES: Record<string, { label: string; url: string; fallbackEmoji: string }> = {
  'chicken_fillet.webp': {
    label: 'Chicken Fillet',
    url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🍗'
  },
  'coke_mismo.webp': {
    label: 'Coke Mismo',
    url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🥤'
  },
  'fried_chicken.webp': {
    label: 'Fried Chicken',
    url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🍗'
  },
  'humba.webp': {
    label: 'Humba',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🍲'
  },
  'leche_flan.webp': {
    label: 'Leche Flan',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🍮'
  },
  'siopao_chicken.webp': {
    label: 'Siopao Chicken',
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🥟'
  },
  'ube_cake.webp': {
    label: 'Sliced Ube Moist Cake',
    url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🍰'
  },
  'silvanas.webp': {
    label: 'Silvanas',
    url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🍪'
  },
  'chocolate_cake.webp': {
    label: 'Chocolate Cake',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🍫'
  },
  'default-product.webp': {
    label: '🍽️ Default Icon',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🍽️'
  },
  'sisig.webp': {
    label: 'Sisig',
    url: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
    fallbackEmoji: '🍲'
  }
};

// Exact 9 products matching image_9ec75e63.png (Total 439 units)
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '#PRD-54D9',
    name: 'Chicken Fillet',
    category: 'meal',
    price: 60.0,
    stock: 32,
    threshold: 10,
    dailyLimit: null,
    available: true,
    description: 'Crispy fried breaded chicken fillet served with creamy white gravy.',
    imageUrl: PRESET_IMAGES['chicken_fillet.webp'].url,
    imagePreset: 'chicken_fillet.webp',
    createdAt: '2026-10-25',
    updatedAt: 'Today, 3:15 PM'
  },
  {
    id: '#PRD-A16A',
    name: 'Coke Mismo',
    category: 'beverages',
    price: 25.0,
    stock: 80,
    threshold: 15,
    dailyLimit: null,
    available: true,
    description: 'Chilled 290ml glass bottle Coca-Cola original taste.',
    imageUrl: PRESET_IMAGES['coke_mismo.webp'].url,
    imagePreset: 'coke_mismo.webp',
    createdAt: '2026-10-25',
    updatedAt: 'Today, 2:50 PM'
  },
  {
    id: '#PRD-9094',
    name: 'Fried Chicken',
    category: 'meal',
    price: 50.0,
    stock: 47,
    threshold: 10,
    dailyLimit: null,
    available: true,
    description: 'Crispy golden marinated fried chicken with secret spice blend.',
    imageUrl: PRESET_IMAGES['fried_chicken.webp'].url,
    imagePreset: 'fried_chicken.webp',
    createdAt: '2026-10-26',
    updatedAt: 'Today, 2:10 PM'
  },
  {
    id: '#PRD-3409',
    name: 'Humba',
    category: 'meal',
    price: 60.0,
    stock: 39,
    threshold: 10,
    dailyLimit: null,
    available: true,
    description: 'Traditional slow-braised pork belly with black beans, banana blossoms, and sweet soy glaze.',
    imageUrl: PRESET_IMAGES['humba.webp'].url,
    imagePreset: 'humba.webp',
    createdAt: '2026-10-26',
    updatedAt: 'Today, 1:40 PM'
  },
  {
    id: '#PRD-7128',
    name: 'Leche Flan',
    category: 'pastries',
    price: 45.0,
    stock: 25,
    threshold: 8,
    dailyLimit: null,
    available: true,
    description: 'Rich, silky caramel custard prepared with fresh egg yolks and condensed milk.',
    imageUrl: PRESET_IMAGES['leche_flan.webp'].url,
    imagePreset: 'leche_flan.webp',
    createdAt: '2026-10-27',
    updatedAt: 'Today, 1:00 PM'
  },
  {
    id: '#PRD-8761',
    name: 'Siopao Chicken',
    category: 'snacks',
    price: 35.0,
    stock: 50,
    threshold: 15,
    dailyLimit: null,
    available: true,
    description: 'Steamed fluffy bun filled with savory chicken and aromatics.',
    imageUrl: PRESET_IMAGES['siopao_chicken.webp'].url,
    imagePreset: 'siopao_chicken.webp',
    createdAt: '2026-10-27',
    updatedAt: 'Today, 12:30 PM'
  },
  {
    id: '#PRD-210B',
    name: 'Sliced Ube Moist Cake',
    category: 'pastries',
    price: 60.0,
    stock: 35,
    threshold: 10,
    dailyLimit: null,
    available: true,
    description: 'Soft layered purple yam sponge with rich ube halaya frosting.',
    imageUrl: PRESET_IMAGES['ube_cake.webp'].url,
    imagePreset: 'ube_cake.webp',
    createdAt: '2026-10-28',
    updatedAt: 'Today, 11:15 AM'
  },
  {
    id: '#PRD-102C',
    name: 'Signature Silvanas',
    category: 'pastries',
    price: 145.0,
    stock: 45,
    threshold: 10,
    dailyLimit: null,
    available: true,
    description: 'Crispy cashew meringue wafers filled with rich French buttercream.',
    imageUrl: PRESET_IMAGES['silvanas.webp'].url,
    imagePreset: 'silvanas.webp',
    createdAt: '2026-10-28',
    updatedAt: 'Today, 10:45 AM'
  },
  {
    id: '#PRD-654A',
    name: 'Decadent Chocolate Cake',
    category: 'pastries',
    price: 65.0,
    stock: 86,
    threshold: 12,
    dailyLimit: null,
    available: true,
    description: 'Velvety dark chocolate cake slice with rich fudge ganache.',
    imageUrl: PRESET_IMAGES['chocolate_cake.webp'].url,
    imagePreset: 'chocolate_cake.webp',
    createdAt: '2026-10-29',
    updatedAt: 'Today, 9:20 AM'
  }
];
