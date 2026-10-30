import React, { useState } from 'react';
import { ClipboardList, Search, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

interface OrderItem {
  id: string;
  shortRef: string;
  customerName: string;
  phone: string;
  type: 'pre_order' | 'dine_in';
  status: 'queued' | 'preparing' | 'ready' | 'completed';
  itemsText: string;
  total: number;
  time: string;
  isPaid: boolean;
}

const SAMPLE_ORDERS: OrderItem[] = [
  {
    id: 'ORD-9841',
    shortRef: '#CM-1021',
    customerName: 'Rosalina Cruz',
    phone: '0917 123 4567',
    type: 'dine_in',
    status: 'preparing',
    itemsText: '2x Chicken Fillet, 2x Coke Mismo',
    total: 170.0,
    time: '12 mins ago',
    isPaid: true
  },
  {
    id: 'ORD-9842',
    shortRef: '#CM-1022',
    customerName: 'Marcus Villanueva',
    phone: '0922 987 6543',
    type: 'pre_order',
    status: 'queued',
    itemsText: '2x Signature Silvanas (Box of 6), 4x Decadent Chocolate Cake',
    total: 550.0,
    time: '25 mins ago',
    isPaid: false
  },
  {
    id: 'ORD-9843',
    shortRef: '#CM-1023',
    customerName: 'Theresa Alcantara',
    phone: '0918 555 1234',
    type: 'dine_in',
    status: 'ready',
    itemsText: '1x Sizzling Pork Sisig Bowl, 1x Iced Caramel Macchiato',
    total: 205.0,
    time: '35 mins ago',
    isPaid: true
  },
  {
    id: 'ORD-9844',
    shortRef: '#CM-1024',
    customerName: 'Geronimo Ramos',
    phone: '0999 888 7777',
    type: 'pre_order',
    status: 'ready',
    itemsText: '1x Whole Ube Moist Cake, 10x Cheesy Ensaymada',
    total: 980.0,
    time: '45 mins ago',
    isPaid: false
  }
];

export const OrderQueueView: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>(SAMPLE_ORDERS);
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = orders.filter((o) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!o.customerName.toLowerCase().includes(q) && !o.shortRef.toLowerCase().includes(q) && !o.id.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filterType !== 'all') {
      if (filterType === 'pre_order' || filterType === 'dine_in') {
        if (o.type !== filterType) return false;
      } else {
        if (o.status !== filterType) return false;
      }
    }
    return true;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="main-viewport" aria-labelledby="orderQueueTitle">
      <div className="content-fade-slide w-full flex flex-col flex-1">
        <header className="page-header">
        <div className="title-group">
          <div className="flex items-center gap-2 text-xs font-bold text-[#ff772e] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#ff772e] animate-pulse"></span>
            <span>Real-Time Order Operations</span>
          </div>
          <h1 className="page-title" id="orderQueueTitle">Live Order Queue</h1>
          <p className="page-subtitle">Monitor incoming pre-orders, dine-in tickets, kitchen progress, and counter collections</p>
        </div>
      </header>

      {/* Metrics Row matching Admin_22f9ab40.html */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <span className="text-xs font-bold text-stone-500 uppercase block">Total Orders</span>
          <strong className="text-2xl font-extrabold text-stone-900 block mt-1">{orders.length}</strong>
          <span className="text-xs text-stone-400 mt-1 block">All logged tickets</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <span className="text-xs font-bold text-stone-500 uppercase block">In Queue</span>
          <strong className="text-2xl font-extrabold text-amber-600 block mt-1">{orders.filter(o => o.status === 'queued').length}</strong>
          <span className="text-xs text-stone-400 mt-1 block">Awaiting kitchen</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <span className="text-xs font-bold text-stone-500 uppercase block">Preparing</span>
          <strong className="text-2xl font-extrabold text-blue-600 block mt-1">{orders.filter(o => o.status === 'preparing').length}</strong>
          <span className="text-xs text-stone-400 mt-1 block">Active in kitchen</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <span className="text-xs font-bold text-stone-500 uppercase block">Ready for Pickup</span>
          <strong className="text-2xl font-extrabold text-emerald-600 block mt-1">{orders.filter(o => o.status === 'ready').length}</strong>
          <span className="text-xs text-stone-400 mt-1 block">Ready to release</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <span className="text-xs font-bold text-stone-500 uppercase block">Total Value</span>
          <strong className="text-2xl font-extrabold text-[#ff772e] block mt-1">₱{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
          <span className="text-xs text-stone-400 mt-1 block">Gross queue value</span>
        </div>
      </section>

      {/* Search & Filter Chips */}
      <section className="bg-white border border-stone-200 rounded-xl p-4 mb-6 flex flex-col gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-[#ff772e]"
            placeholder="Search by reference, customer name, phone, or items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pre_order', label: 'Pre-order' },
            { id: 'dine_in', label: 'Dine-in' },
            { id: 'queued', label: 'Queued' },
            { id: 'preparing', label: 'Preparing' },
            { id: 'ready', label: 'Ready for Pickup' }
          ].map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFilterType(chip.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                filterType === chip.id
                  ? 'bg-[#ff772e] text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* Orders List Cards */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-sm text-stone-800">
                {order.type === 'dine_in' ? '🍽️' : '📦'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-stone-900">{order.shortRef}</span>
                  <span className="text-xs text-stone-400 font-mono">({order.id})</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                    order.type === 'pre_order' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.type === 'pre_order' ? 'Pre-Order' : 'Dine-In'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    order.isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {order.isPaid ? 'PAID' : 'UNPAID'}
                  </span>
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  <strong>{order.customerName}</strong> &bull; {order.phone} &bull; <span className="text-stone-400">{order.time}</span>
                </div>
                <div className="text-xs text-stone-700 font-medium mt-1">
                  {order.itemsText}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[11px] font-bold text-stone-400 uppercase block">Amount Due</span>
                <span className="text-xl font-black text-[#ff772e]">₱{order.total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={() => alert(`Advance status for ${order.shortRef}`)}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                Advance Status
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};
