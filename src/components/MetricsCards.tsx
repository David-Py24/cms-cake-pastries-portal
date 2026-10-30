import React from 'react';
import { Product } from '../types';

interface MetricsCardsProps {
  products: Product[];
  onFilterLowStock: () => void;
  onFilterInStock: () => void;
  onResetFilters: () => void;
  activeFilterType?: 'all' | 'in-stock' | 'low-stock';
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  products,
  onFilterLowStock,
  onFilterInStock,
  onResetFilters,
  activeFilterType
}) => {
  const totalProducts = products.length;
  
  const inStockProducts = products.filter(
    (p) => p.stock > p.threshold
  ).length;

  const lowStockProducts = products.filter(
    (p) => p.stock > 0 && p.stock <= p.threshold
  ).length;

  const totalUnits = products.reduce((acc, curr) => acc + (curr.stock || 0), 0);

  return (
    <section className="metrics-grid" aria-label="Inventory Stock Metrics">
      {/* Metric 1: Total Products */}
      <div 
        className={`metric-card cursor-pointer transition-all ${
          activeFilterType === 'all' ? 'ring-2 ring-[#ff772e]/40' : ''
        }`}
        onClick={onResetFilters}
        title="View all catalog items"
      >
        <span className="metric-label">TOTAL PRODUCTS</span>
        <span className="metric-value" id="metricTotal">
          {totalProducts}
        </span>
        <span className="metric-tag">
          Catalog active
        </span>
      </div>

      {/* Metric 2: In Stock */}
      <div 
        className={`metric-card cursor-pointer transition-all ${
          activeFilterType === 'in-stock' ? 'ring-2 ring-emerald-600/40' : ''
        }`}
        onClick={onFilterInStock}
        title="Filter ready for sale"
      >
        <span className="metric-label">IN STOCK</span>
        <span className="metric-value text-emerald-700" id="metricInStock">
          {inStockProducts}
        </span>
        <span className="metric-tag">
          Ready for sale
        </span>
      </div>

      {/* Metric 3: Low Stock */}
      <div 
        className={`metric-card cursor-pointer transition-all ${
          activeFilterType === 'low-stock' ? 'ring-2 ring-[#ff772e]' : ''
        }`}
        onClick={onFilterLowStock}
        title="Filter products needing reorder"
      >
        <span className="metric-label">LOW STOCK</span>
        <span className="metric-value text-[#ff772e]" id="metricLowStock">
          {lowStockProducts}
        </span>
        <span className="metric-tag">
          Needs reorder
        </span>
      </div>

      {/* Metric 4: Total Units */}
      <div className="metric-card">
        <span className="metric-label">TOTAL UNITS</span>
        <span className="metric-value" id="metricUnits">
          {totalUnits.toLocaleString()}
        </span>
        <span className="metric-tag">
          Units in kitchen
        </span>
      </div>
    </section>
  );
};
