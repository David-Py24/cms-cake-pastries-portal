import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trash2, 
  Edit, 
  Plus,
  Check, 
  AlertCircle, 
  Menu as MenuIcon,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { MetricsCards } from './components/MetricsCards';
import { ControlsBar } from './components/ControlsBar';
import { InventoryTable } from './components/InventoryTable';
import { ProductModal } from './components/ProductModal';
import { StandaloneAddProduct } from './components/StandaloneAddProduct';
import { StandaloneEditProduct } from './components/StandaloneEditProduct';
import { UserManagementView } from './components/UserManagementView';
import { KitchenDisplayView } from './components/KitchenDisplayView';
import { OrderQueueView } from './components/OrderQueueView';
import { ReportsAnalyticsView } from './components/ReportsAnalyticsView';
import { UserSettingsView } from './components/UserSettingsView';
import { INITIAL_PRODUCTS, PRESET_IMAGES } from './data/initialProducts';
import { Product, ViewMode } from './types';

const STORAGE_KEY = 'cms_cake_inventory_products_v2';

export default function App() {
  // Load products from localStorage or fallback to exact 9 products from image_9ec75e63.png
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Save to localStorage when products change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // View state
  const [currentView, setCurrentView] = useState<ViewMode>('inventory');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Table & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('name-asc');
  const [stockFilterType, setStockFilterType] = useState<'all' | 'in-stock' | 'low-stock'>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Delete confirmation
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    ids: string[];
    title: string;
    description: string;
  }>({
    isOpen: false,
    ids: [],
    title: '',
    description: ''
  });

  // Feedback toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchId = product.id.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          if (!matchName && !matchId && !matchDesc) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }

        // Stock status metric quick-filter
        if (stockFilterType === 'in-stock') {
          if (product.stock <= product.threshold) return false;
        } else if (stockFilterType === 'low-stock') {
          if (product.stock === 0 || product.stock > product.threshold) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (selectedSort) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'stock-asc':
            return a.stock - b.stock;
          case 'stock-desc':
            return b.stock - a.stock;
          default:
            return 0;
        }
      });
  }, [products, searchQuery, selectedCategory, stockFilterType, selectedSort]);

  // Selection handlers
  const handleToggleSelectAll = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    }
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedProductIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Inventory re-synchronized with bakery catalog.', 'info');
    }, 450);
  };

  // Quick +5 stock bump matching image_9ec75e63.png
  const handleQuickStockBump = (id: string, amount: number = 5) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStock = item.stock + amount;
          showToast(`Added +${amount} units to ${item.name} (Now: ${nextStock} units).`, 'success');
          return {
            ...item,
            stock: nextStock,
            updatedAt: 'Just now'
          };
        }
        return item;
      })
    );
  };

  // Availability toggle
  const handleToggleAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVal = !item.available;
          showToast(`"${item.name}" is now ${nextVal ? 'Available' : 'Hidden from menu'}.`, 'info');
          return {
            ...item,
            available: nextVal,
            updatedAt: 'Just now'
          };
        }
        return item;
      })
    );
  };

  // Edit action
  const handleOpenEdit = (product: Product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleToolbarEdit = () => {
    if (selectedProductIds.length === 0) {
      showToast('Please select a product from the table to edit.', 'info');
      return;
    }
    const target = products.find((p) => p.id === selectedProductIds[0]);
    if (target) {
      handleOpenEdit(target);
    }
  };

  // Delete actions
  const handleRequestDelete = (id: string, name: string) => {
    setDeleteDialog({
      isOpen: true,
      ids: [id],
      title: 'Delete Product',
      description: `Are you sure you want to remove "${name}" from CM's Cake & Pastries inventory? This action cannot be undone.`
    });
  };

  const handleToolbarDelete = () => {
    if (selectedProductIds.length === 0) {
      showToast('Please select one or more products to delete.', 'info');
      return;
    }
    setDeleteDialog({
      isOpen: true,
      ids: selectedProductIds,
      title: `Delete ${selectedProductIds.length} Selected Product${selectedProductIds.length > 1 ? 's' : ''}`,
      description: `Are you sure you want to delete ${selectedProductIds.length} selected item(s) from the catalog?`
    });
  };

  const handleConfirmDelete = () => {
    const toDelete = deleteDialog.ids;
    setProducts((prev) => prev.filter((p) => !toDelete.includes(p.id)));
    setSelectedProductIds((prev) => prev.filter((id) => !toDelete.includes(id)));
    setDeleteDialog({ isOpen: false, ids: [], title: '', description: '' });
    showToast(`Successfully deleted ${toDelete.length} product(s).`, 'success');
  };

  // Save from Add Modal
  const handleSaveNewProduct = (productData: Partial<Product>) => {
    const nextSeq = products.length + 1;
    const newId = `#PRD-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newProduct: Product = {
      id: newId,
      name: productData.name || 'New Bakery Item',
      category: productData.category || 'pastries',
      price: productData.price || 0,
      stock: productData.stock || 0,
      threshold: productData.threshold || 10,
      dailyLimit: productData.dailyLimit || null,
      available: productData.available ?? true,
      description: productData.description || 'Bakery specialty',
      imageUrl: productData.imageUrl || PRESET_IMAGES['default-product.webp'].url,
      imagePreset: productData.imagePreset || 'default-product.webp',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: 'Just now'
    };

    setProducts((prev) => [newProduct, ...prev]);
    setIsAddModalOpen(false);
    showToast(`Product "${newProduct.name}" added successfully to catalog!`);
  };

  // Save from Edit Modal
  const handleSaveEditedProduct = (productData: Partial<Product>) => {
    if (!productToEdit) return;

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productToEdit.id) {
          return {
            ...item,
            ...productData,
            updatedAt: 'Just now'
          } as Product;
        }
        return item;
      })
    );
    setIsEditModalOpen(false);
    setProductToEdit(null);
    showToast(`Product "${productData.name || productToEdit.name}" updated successfully.`);
  };

  // Standalone Add Save
  const handleStandaloneAdd = (productData: Partial<Product>) => {
    handleSaveNewProduct(productData);
    setCurrentView('inventory');
  };

  // Standalone Edit Save
  const handleStandaloneEdit = (id: string, updatedData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedData,
            updatedAt: 'Today, 3:15 PM'
          } as Product;
        }
        return item;
      })
    );
    setCurrentView('inventory');
    showToast(`Product ${id} updated from Figma standalone view!`);
  };

  // Reset to initial demo catalog (matching 9 products, 439 units)
  const handleResetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    setSelectedProductIds([]);
    setStockFilterType('all');
    setSelectedCategory('all');
    setSearchQuery('');
    showToast('Catalog restored to exact Figma reference (9 products, 439 units).', 'info');
  };

  const handleSignOut = () => {
    showToast('Signed out of Staff Portal. Active session closed.', 'info');
    setTimeout(() => {
      setCurrentView('inventory');
      showToast('Signed back in as Administrator (Baritua David).', 'success');
    }, 1800);
  };

  return (
    <div className="canvas">
      {/* Sidebar: 286px persistent sidebar matching image_9ec75e63.png */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpenMobile={isMobileSidebarOpen}
        onToggleMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onOpenPos={() => showToast('POS Register is ready for counter orders.', 'info')}
      />

      {/* View routing with smooth page-enter-animation */}
      {currentView === 'users' ? (
        <UserManagementView />
      ) : currentView === 'kitchen' ? (
        <KitchenDisplayView />
      ) : currentView === 'orders' ? (
        <OrderQueueView />
      ) : currentView === 'reports' ? (
        <ReportsAnalyticsView />
      ) : currentView === 'settings' ? (
        <UserSettingsView 
          onSignOut={handleSignOut}
          onSaveNotification={(msg) => showToast(msg, 'success')}
        />
      ) : currentView === 'standalone-add' ? (
        <StandaloneAddProduct
          onBackToInventory={() => setCurrentView('inventory')}
          onAddProduct={handleStandaloneAdd}
        />
      ) : currentView === 'standalone-edit' ? (
        <StandaloneEditProduct
          product={
            (selectedProductIds.length > 0 && products.find((p) => p.id === selectedProductIds[0])) ||
            products.find((p) => p.id === '#PRD-8761') ||
            products[0]
          }
          onBackToInventory={() => setCurrentView('inventory')}
          onUpdateProduct={handleStandaloneEdit}
        />
      ) : (
        /* Primary Inventory Screen matching image_9ec75e63.png - stationary viewport */
        <main className="main-viewport" aria-labelledby="inventoryTitle">
          <div key="inventory-components" className="content-fade-slide w-full flex flex-col flex-1">
            {/* Top Quick Tools Bar */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
                onClick={() => setIsMobileSidebarOpen(true)}
                title="Open Sidebar"
              >
                <MenuIcon size={20} />
              </button>

              <div className="inline-flex rounded-xl border border-stone-200 bg-white p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setCurrentView('inventory')}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-[#ff772e] text-white shadow-2xs"
                >
                  Inventory Overview
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('standalone-add')}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1"
                >
                  <span>Standalone Add</span>
                  <ExternalLink size={11} className="text-stone-400" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('standalone-edit')}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1"
                >
                  <span>Standalone Edit</span>
                  <ExternalLink size={11} className="text-stone-400" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetCatalog}
              className="text-xs text-stone-500 hover:text-[#ff772e] font-semibold underline underline-offset-2"
              title="Reset data to match image_9ec75e63.png exactly"
            >
              Reset to Exact Screenshot (9 Products &bull; 439 Units)
            </button>
          </div>

          {/* Page Header matching image_9ec75e63.png */}
          <header className="page-header">
            <div className="title-group">
              <h1 className="page-title" id="inventoryTitle">Inventory</h1>
              <p className="page-subtitle">Track bakery stocks, edit prices, and manage product catalog</p>
            </div>

            <div className="header-actions">
              <button 
                type="button" 
                className="btn-header-default" 
                id="deleteActionBtn" 
                title="Delete selected product(s)"
                disabled={selectedProductIds.length === 0}
                onClick={handleToolbarDelete}
              >
                <Trash2 size={16} className="text-stone-700" />
                <span>Delete {selectedProductIds.length > 0 ? `(${selectedProductIds.length})` : ''}</span>
              </button>

              <button 
                type="button" 
                className="btn-header-default" 
                id="editActionBtn" 
                title="Edit selected product"
                onClick={handleToolbarEdit}
              >
                <Edit size={16} className="text-stone-700" />
                <span>Edit</span>
              </button>

              <button 
                type="button" 
                className="btn-header-add" 
                id="addActionBtn" 
                title="Add a new bakery product"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus size={18} />
                <span>+ Add</span>
              </button>
            </div>
          </header>

          {/* Metrics Grid matching image_9ec75e63.png */}
          <MetricsCards
            products={products}
            activeFilterType={stockFilterType}
            onFilterLowStock={() => {
              setStockFilterType(stockFilterType === 'low-stock' ? 'all' : 'low-stock');
            }}
            onFilterInStock={() => {
              setStockFilterType(stockFilterType === 'in-stock' ? 'all' : 'in-stock');
            }}
            onResetFilters={() => {
              setStockFilterType('all');
            }}
          />

          {/* Controls Bar matching image_9ec75e63.png */}
          <ControlsBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />

          {/* Active filter summary pill if filtered */}
          {(stockFilterType !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <div className="flex items-center gap-2 mb-3 text-xs text-stone-600 bg-orange-50/70 border border-orange-200/60 rounded-xl px-3.5 py-2">
              <span className="font-bold text-orange-950">Active Filter:</span>
              {stockFilterType !== 'all' && (
                <span className="bg-white border border-orange-300 px-2 py-0.5 rounded-md text-orange-900 font-semibold">
                  Status: {stockFilterType === 'low-stock' ? 'Low Stock' : 'In Stock'}
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="bg-white border border-orange-300 px-2 py-0.5 rounded-md text-orange-900 font-semibold capitalize">
                  Category: {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="bg-white border border-orange-300 px-2 py-0.5 rounded-md text-orange-900 font-semibold">
                  Search: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setStockFilterType('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="ml-auto font-bold text-orange-800 hover:text-orange-950 underline cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Products Table matching image_9ec75e63.png */}
          <InventoryTable
            products={filteredProducts}
            selectedProductIds={selectedProductIds}
            onToggleSelectAll={handleToggleSelectAll}
            onToggleSelectRow={handleToggleSelectRow}
            onEditProduct={handleOpenEdit}
            onDeleteProduct={handleRequestDelete}
            onQuickStockBump={handleQuickStockBump}
            onToggleAvailability={handleToggleAvailability}
          />

          {/* Floating batch selection pill */}
          {selectedProductIds.length > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1e293b] text-white px-5 py-3 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-4 animate-in slide-in-from-bottom-5">
              <span className="text-xs font-bold text-[#ff772e]">
                {selectedProductIds.length} item{selectedProductIds.length > 1 ? 's' : ''} selected
              </span>
              <div className="h-4 w-px bg-stone-700" />
              <button
                type="button"
                onClick={() => {
                  setProducts((prev) =>
                    prev.map((p) =>
                      selectedProductIds.includes(p.id) ? { ...p, available: true, updatedAt: 'Just now' } : p
                    )
                  );
                  showToast(`Marked ${selectedProductIds.length} products as Available.`);
                }}
                className="text-xs text-stone-200 hover:text-white font-medium hover:underline"
              >
                Set Available
              </button>
              <button
                type="button"
                onClick={() => {
                  setProducts((prev) =>
                    prev.map((p) =>
                      selectedProductIds.includes(p.id) ? { ...p, available: false, updatedAt: 'Just now' } : p
                    )
                  );
                  showToast(`Marked ${selectedProductIds.length} products as Hidden.`);
                }}
                className="text-xs text-stone-200 hover:text-white font-medium hover:underline"
              >
                Set Hidden
              </button>
              <button
                type="button"
                onClick={handleToolbarDelete}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold hover:underline"
              >
                Delete Selected
              </button>
              <button
                type="button"
                onClick={() => setSelectedProductIds([])}
                className="text-xs text-stone-400 hover:text-stone-200 ml-2"
              >
                Deselect
              </button>
            </div>
          )}
          </div>
        </main>
      )}

      {/* Add Product Modal (Figma Add Modal) */}
      <ProductModal
        isOpen={isAddModalOpen}
        mode="add"
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewProduct}
      />

      {/* Edit Product Modal (Figma Edit Modal) */}
      <ProductModal
        isOpen={isEditModalOpen}
        mode="edit"
        productToEdit={productToEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setProductToEdit(null);
        }}
        onSave={handleSaveEditedProduct}
      />

      {/* Delete Confirmation Modal */}
      {deleteDialog.isOpen && (
        <div 
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="p-2.5 bg-rose-50 rounded-xl">
                <Trash2 size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900">{deleteDialog.title}</h3>
            </div>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              {deleteDialog.description}
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteDialog({ isOpen: false, ids: [], title: '', description: '' })}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-bold hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl bg-stone-900 text-white text-sm font-medium border border-stone-700 animate-in fade-in slide-in-from-top-3">
          {toast.type === 'success' && <Check size={16} className="text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle size={16} className="text-rose-400" />}
          {toast.type === 'info' && <Sparkles size={16} className="text-[#ff772e]" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
