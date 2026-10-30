import React from 'react';
import { Search, Filter, ArrowDown, RotateCw } from 'lucide-react';
import { Category } from '../types';

interface ControlsBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  selectedSort: string;
  onSortChange: (s: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  onRefresh,
  isRefreshing = false
}) => {
  return (
    <section className="controls-bar-outer" aria-label="Filter and Search">
      {/* Search Bar - Full Width with Icon */}
      <div className="search-input-wrapper">
        <Search className="search-icon-inside" size={18} />
        <input 
          type="search" 
          id="inventorySearchInput" 
          className="search-input-field" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search inventory by product..."
          aria-label="Search Inventory"
        />
      </div>

      {/* Filter and Sort Action Buttons Row matching image_9ec75e63.png */}
      <div className="filter-actions-row">
        <div className="btn-filter-pill" title="Filter by Category">
          <Filter size={15} className="text-stone-600" />
          <select 
            id="categoryFilter" 
            aria-label="Filter by Category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="snacks">Snacks</option>
            <option value="meal">Meal</option>
            <option value="pastries">Pastries</option>
            <option value="beverages">Beverages</option>
          </select>
        </div>

        <div className="btn-filter-pill" title="Sort products">
          <ArrowDown size={15} className="text-stone-600" />
          <select 
            id="sortSelect" 
            aria-label="Sort products"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="name-asc">Sort: Name (A-Z)</option>
            <option value="name-desc">Sort: Name (Z-A)</option>
            <option value="price-asc">Sort: Price (Low &rarr; High)</option>
            <option value="price-desc">Sort: Price (High &rarr; Low)</option>
            <option value="stock-asc">Sort: Stock (Lowest First)</option>
            <option value="stock-desc">Sort: Stock (Highest First)</option>
          </select>
        </div>

        <button 
          type="button" 
          className="btn-filter-pill" 
          id="inventoryRefreshBtn" 
          title="Refresh products from database"
          onClick={onRefresh}
        >
          <RotateCw 
            className={`text-stone-600 ${isRefreshing ? 'animate-spin text-[#ff772e]' : ''}`} 
            size={15} 
          />
          <span>Refresh</span>
        </button>
      </div>
    </section>
  );
};
