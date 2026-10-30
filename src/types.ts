export type Category = 'pastries' | 'snacks' | 'meal' | 'beverages';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  threshold: number;
  dailyLimit?: number | null;
  available: boolean;
  description: string;
  imageUrl: string;
  imagePreset?: string;
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = 
  | 'inventory' 
  | 'users' 
  | 'kitchen' 
  | 'orders' 
  | 'reports' 
  | 'settings'
  | 'standalone-add' 
  | 'standalone-edit';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier' | 'baker' | 'kitchen';
  accessLevel: string;
  isActive: boolean;
  avatarUrl?: string;
}

export interface KitchenTicket {
  id: string;
  orderNumber: string;
  customerName: string;
  contact: string;
  type: 'dine_in' | 'pre_order';
  status: 'placed' | 'preparing' | 'ready' | 'completed';
  items: { name: string; quantity: number; notes?: string }[];
  isPriority: boolean;
  isPaid: boolean;
  placedAt: string;
  total: number;
}
