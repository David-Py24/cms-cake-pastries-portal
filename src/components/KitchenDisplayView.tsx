import React, { useState } from 'react';
import { Tv, RefreshCw, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { KitchenTicket } from '../types';

const INITIAL_TICKETS: KitchenTicket[] = [
  {
    id: 'TKT-101',
    orderNumber: '#ORD-8941',
    customerName: 'Rosalina Cruz',
    contact: '0917 123 4567',
    type: 'dine_in',
    status: 'preparing',
    items: [
      { name: 'Chicken Fillet with Rice', quantity: 2 },
      { name: 'Coke Mismo', quantity: 2 }
    ],
    isPriority: true,
    isPaid: true,
    placedAt: '12 mins ago',
    total: 170.0
  },
  {
    id: 'TKT-102',
    orderNumber: '#ORD-8942',
    customerName: 'Marcus Villanueva',
    contact: '0922 987 6543',
    type: 'pre_order',
    status: 'placed',
    items: [
      { name: 'Signature Silvanas (Box of 6)', quantity: 2 },
      { name: 'Decadent Chocolate Cake (Slice)', quantity: 4 }
    ],
    isPriority: false,
    isPaid: true,
    placedAt: '25 mins ago',
    total: 550.0
  },
  {
    id: 'TKT-103',
    orderNumber: '#ORD-8943',
    customerName: 'Theresa Alcantara',
    contact: '0918 555 1234',
    type: 'dine_in',
    status: 'ready',
    items: [
      { name: 'Sizzling Pork Sisig Bowl', quantity: 1 },
      { name: 'Iced Caramel Macchiato', quantity: 1 }
    ],
    isPriority: false,
    isPaid: true,
    placedAt: '35 mins ago',
    total: 205.0
  }
];

export const KitchenDisplayView: React.FC = () => {
  const [tickets, setTickets] = useState<KitchenTicket[]>(INITIAL_TICKETS);
  const [activeTab, setActiveTab] = useState<'all' | 'placed' | 'preparing' | 'ready'>('all');

  const advanceTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'placed' ? 'preparing' : t.status === 'preparing' ? 'ready' : 'completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const filteredTickets = tickets.filter((t) => {
    if (activeTab === 'all') return t.status !== 'completed';
    return t.status === activeTab;
  });

  const dineInTickets = filteredTickets.filter((t) => t.type === 'dine_in');
  const preOrderTickets = filteredTickets.filter((t) => t.type === 'pre_order');

  return (
    <div className="main-viewport" aria-labelledby="kitchenDisplayTitle">
      <div className="content-fade-slide w-full flex flex-col flex-1">
        {/* Kitchen Header matching Admin_22f9ab40.html */}
      <header className="page-header">
        <div className="title-group">
          <h1 className="page-title" id="kitchenDisplayTitle">Kitchen Display</h1>
          <p className="page-subtitle">Real-time view of all active kitchen tickets</p>
        </div>

        <div className="header-actions">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold">
            <Tv size={15} className="text-[#ff772e]" />
            <span>{tickets.filter(t => t.status !== 'completed').length} Active Tickets</span>
          </div>

          <button 
            type="button" 
            className="btn-header-add"
            onClick={() => alert('Add Manual Ticket')}
          >
            <Plus size={16} />
            <span>Add Ticket</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-stone-200 pb-3">
        {(['all', 'placed', 'preparing', 'ready'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
              activeTab === tab
                ? 'bg-[#ff772e] text-white shadow-2xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {tab === 'all' ? 'All Tickets' : tab}
          </button>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Column 1: Dine-In Orders */}
        <div className="bg-stone-50/70 border border-stone-200 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-stone-900 text-sm">Dine-In Orders</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#ff772e]/20 text-[#ff772e]">
                {dineInTickets.length}
              </span>
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto flex-1">
            {dineInTickets.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">No active dine-in orders</div>
            ) : (
              dineInTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-stone-900">{ticket.orderNumber}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {ticket.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 font-medium mb-3">Customer: {ticket.customerName} ({ticket.placedAt})</div>
                  <ul className="text-xs space-y-1 mb-4 border-t border-b border-stone-100 py-2">
                    {ticket.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between font-semibold text-stone-800">
                        <span>{it.quantity}x {it.name}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => advanceTicket(ticket.id)}
                    className="w-full py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
                  >
                    Advance Status &rarr;
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Pre-Orders */}
        <div className="bg-stone-50/70 border border-stone-200 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-stone-900 text-sm">Pre-Orders</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#ff772e]/20 text-[#ff772e]">
                {preOrderTickets.length}
              </span>
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto flex-1">
            {preOrderTickets.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">No active pre-orders</div>
            ) : (
              preOrderTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-stone-900">{ticket.orderNumber}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      {ticket.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 font-medium mb-3">Customer: {ticket.customerName} ({ticket.placedAt})</div>
                  <ul className="text-xs space-y-1 mb-4 border-t border-b border-stone-100 py-2">
                    {ticket.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between font-semibold text-stone-800">
                        <span>{it.quantity}x {it.name}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => advanceTicket(ticket.id)}
                    className="w-full py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
                  >
                    Advance Status &rarr;
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
