import React from 'react';
import { Edit2, Trash2, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface InventoryTableProps {
  products: Product[];
  selectedProductIds: string[];
  onToggleSelectAll: () => void;
  onToggleSelectRow: (id: string) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string, name: string) => void;
  onQuickStockBump: (id: string, amount: number) => void;
  onToggleAvailability: (id: string) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  selectedProductIds,
  onToggleSelectAll,
  onToggleSelectRow,
  onEditProduct,
  onDeleteProduct,
  onQuickStockBump,
  onToggleAvailability
}) => {
  const allSelected = products.length > 0 && selectedProductIds.length === products.length;
  const someSelected = selectedProductIds.length > 0 && !allSelected;

  const getStatusBadge = (product: Product) => {
    if (product.stock === 0) {
      return (
        <span className="pill-badge pill-outstock">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
          Out of Stock
        </span>
      );
    }
    if (product.stock <= product.threshold) {
      return (
        <span className="pill-badge pill-lowstock">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Low Stock
        </span>
      );
    }
    return (
      <span className="pill-badge pill-instock">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
        In Stock
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case 'pastries':
        return <span className="pill-badge bg-stone-100 text-stone-800 border border-stone-200">Pastries</span>;
      case 'snacks':
        return <span className="pill-badge bg-stone-100 text-stone-800 border border-stone-200">Snacks</span>;
      case 'meal':
        return <span className="pill-badge bg-stone-100 text-stone-800 border border-stone-200">Meal</span>;
      case 'beverages':
        return <span className="pill-badge bg-stone-100 text-stone-800 border border-stone-200">Beverages</span>;
      default:
        return <span className="pill-badge bg-stone-100 text-stone-800 border border-stone-200 capitalize">{category}</span>;
    }
  };

  return (
    <section className="table-card-container" aria-label="Products Table">
      <div className="overflow-x-auto w-full">
        <table className="inventory-table-styled" id="productsTable">
          <thead>
            <tr>
              <th className="w-12 text-center pl-5 pr-2">
                <input 
                  type="checkbox" 
                  id="selectAllCheckbox" 
                  aria-label="Select all rows"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={onToggleSelectAll}
                  className="rounded border-stone-300 text-[#ff772e] focus:ring-[#ff772e] h-4 w-4 cursor-pointer"
                />
              </th>
              <th>PRODUCT ID</th>
              <th>PRODUCT NAME</th>
              <th>CATEGORY</th>
              <th>STOCK QTY</th>
              <th>DAILY LIMIT</th>
              <th>AVAILABILITY</th>
              <th>STATUS</th>
              <th>UNIT PRICE</th>
              <th className="text-right pr-6">ACTIONS</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {products.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-16 text-stone-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="w-9 h-9 text-stone-300" />
                    <p className="font-bold text-stone-700 text-sm">No products match your criteria</p>
                    <p className="text-xs text-stone-400">Try adjusting your search terms or category filter.</p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isSelected = selectedProductIds.includes(product.id);
                return (
                  <tr 
                    key={product.id}
                    className={`transition-colors ${isSelected ? 'selected' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="w-12 text-center pl-5 pr-2">
                      <input 
                        type="checkbox" 
                        aria-label={`Select ${product.name}`}
                        checked={isSelected}
                        onChange={() => onToggleSelectRow(product.id)}
                        className="rounded border-stone-300 text-[#ff772e] focus:ring-[#ff772e] h-4 w-4 cursor-pointer"
                      />
                    </td>

                    {/* Product ID Badge matching image_9ec75e63.png */}
                    <td>
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-stone-100/80 border border-stone-200 text-stone-700 font-mono text-xs font-bold tracking-tight">
                        {product.id}
                      </span>
                    </td>

                    {/* Product Name + Subtitle + Thumbnail matching image_9ec75e63.png */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 flex-shrink-0">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=120&q=80';
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <div 
                            className="font-bold text-stone-900 text-sm hover:text-[#ff772e] cursor-pointer truncate"
                            onClick={() => onEditProduct(product)}
                            title="Click to edit product"
                          >
                            {product.name}
                          </div>
                          <div className="text-xs text-stone-400 font-medium">
                            Bakery specialty
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      {getCategoryBadge(product.category)}
                    </td>

                    {/* Stock QTY matching image_9ec75e63.png (e.g. 32 units) */}
                    <td>
                      <span className="font-bold text-stone-900 text-sm">
                        {product.stock}
                      </span>
                      <span className="text-stone-500 text-xs font-normal ml-1">
                        units
                      </span>
                    </td>

                    {/* Daily Limit matching image_9ec75e63.png (Unlimited) */}
                    <td>
                      {product.dailyLimit ? (
                        <span className="pill-badge pill-unlimited">
                          {product.dailyLimit} units
                        </span>
                      ) : (
                        <span className="pill-badge pill-unlimited">
                          Unlimited
                        </span>
                      )}
                    </td>

                    {/* Availability matching image_9ec75e63.png (• Available) */}
                    <td>
                      <button
                        type="button"
                        onClick={() => onToggleAvailability(product.id)}
                        className={`pill-badge ${product.available ? 'pill-available' : 'pill-unlimited'} cursor-pointer hover:opacity-90 transition-opacity`}
                        title="Click to toggle availability"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${product.available ? 'bg-emerald-500' : 'bg-stone-400'}`}></span>
                        <span>{product.available ? 'Available' : 'Hidden'}</span>
                      </button>
                    </td>

                    {/* Status matching image_9ec75e63.png (• In Stock) */}
                    <td>
                      {getStatusBadge(product)}
                    </td>

                    {/* Unit Price matching image_9ec75e63.png (₱60.00) */}
                    <td className="font-bold text-stone-900 text-sm">
                      ₱{product.price.toFixed(2)}
                    </td>

                    {/* Actions matching image_9ec75e63.png: +5, edit pencil, trash can */}
                    <td className="text-right pr-6">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => onQuickStockBump(product.id, 5)}
                          title="Restock +5 units"
                          className="btn-bump-stock"
                        >
                          +5
                        </button>

                        <button
                          type="button"
                          onClick={() => onEditProduct(product)}
                          title="Edit product"
                          className="p-1.5 text-stone-500 hover:text-[#ff772e] hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteProduct(product.id, product.name)}
                          title="Delete product"
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
