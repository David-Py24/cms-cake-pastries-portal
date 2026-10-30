import React, { useState } from 'react';
import { BarChart2, TrendingUp, Calendar, Download, DollarSign, ShoppingBag, ArrowUpRight } from 'lucide-react';

export const ReportsAnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="main-viewport" aria-labelledby="reportHeading">
      <div className="content-fade-slide w-full flex flex-col flex-1">
        {/* Header matching Admin_22f9ab40.html */}
      <header className="page-header">
        <div className="title-group">
          <h1 className="page-title" id="reportHeading">Reports &amp; Analytics</h1>
          <p className="page-subtitle">Real-time revenue, order fulfillment, and bakery sales insights</p>
        </div>

        <div className="header-actions">
          <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-700">
            <Calendar size={14} />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <button 
            type="button" 
            className="btn-header-add"
            onClick={() => alert('Exporting CSV summary report...')}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase">
            <span>Gross Sales</span>
            <DollarSign size={16} className="text-[#ff772e]" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 mt-2">₱42,850.00</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-2">
            <ArrowUpRight size={14} />
            <span>+12.5% vs previous</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase">
            <span>Total Orders</span>
            <ShoppingBag size={16} className="text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 mt-2">184</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-2">
            <ArrowUpRight size={14} />
            <span>+8.4% vs previous</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase">
            <span>Average Order Value</span>
            <TrendingUp size={16} className="text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 mt-2">₱232.88</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-2">
            <ArrowUpRight size={14} />
            <span>+3.2% vs previous</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase">
            <span>Net Revenue</span>
            <DollarSign size={16} className="text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 mt-2">₱39,420.00</div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-2">
            <ArrowUpRight size={14} />
            <span>+5.1% margin healthy</span>
          </div>
        </div>
      </section>

      {/* Breakdown Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
          <h2 className="font-bold text-base text-stone-900 mb-4">Category Volume Share</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                <span>Pastries &amp; Cakes</span>
                <span>₱24,150.00 (56%)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#ff772e] rounded-full" style={{ width: '56%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                <span>Hot Meals &amp; Rice Bowls</span>
                <span>₱11,400.00 (27%)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '27%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                <span>Snacks &amp; Siopao</span>
                <span>₱4,500.00 (10%)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                <span>Beverages</span>
                <span>₱2,800.00 (7%)</span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Channel Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
          <h2 className="font-bold text-base text-stone-900 mb-4">Order Channels Breakdown</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase text-left">
                <th className="pb-3">Channel</th>
                <th className="pb-3">Orders</th>
                <th className="pb-3 text-right">Net Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-semibold text-stone-800">
              <tr>
                <td className="py-3">Pre-Orders (Online)</td>
                <td className="py-3">78</td>
                <td className="py-3 text-right">₱21,450.00</td>
              </tr>
              <tr>
                <td className="py-3">Dine-In Counter POS</td>
                <td className="py-3">92</td>
                <td className="py-3 text-right">₱14,820.00</td>
              </tr>
              <tr>
                <td className="py-3">Direct Phone Orders</td>
                <td className="py-3">14</td>
                <td className="py-3 text-right">₱3,150.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};
