import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, RotateCcw } from 'lucide-react';
import { Category, Product } from '../types';
import { PRESET_IMAGES } from '../data/initialProducts';

interface StandaloneAddProductProps {
  onBackToInventory: () => void;
  onAddProduct: (product: Partial<Product>) => void;
}

export const StandaloneAddProduct: React.FC<StandaloneAddProductProps> = ({
  onBackToInventory,
  onAddProduct
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('pastries');
  const [price, setPrice] = useState('60.00');
  const [stock, setStock] = useState('50');
  const [description, setDescription] = useState('');
  const [imagePreset, setImagePreset] = useState('chocolate_cake.webp');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES['chocolate_cake.webp'].url);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const stockNum = parseInt(stock, 10) || 0;
  let statusColor = '#166534';
  let statusText = 'In Stock';
  if (stockNum === 0) {
    statusText = 'Out of Stock';
    statusColor = '#dc2626';
  } else if (stockNum <= 10) {
    statusText = 'Low Stock';
    statusColor = '#d97706';
  }

  const handlePresetChange = (preset: string) => {
    setImagePreset(preset);
    if (PRESET_IMAGES[preset]) {
      setImageUrl(PRESET_IMAGES[preset].url);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setImageUrl(event.target.result);
        setImagePreset('custom');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please provide a product name';
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) newErrors.price = 'Valid price required';
    const parsedStock = parseInt(stock, 10);
    if (isNaN(parsedStock) || parsedStock < 0) newErrors.stock = 'Valid stock required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddProduct({
      name: name.trim(),
      category,
      price: parsedPrice,
      stock: parsedStock,
      threshold: 10,
      dailyLimit: 30,
      available: true,
      description: description.trim(),
      imageUrl,
      imagePreset,
      updatedAt: 'Just now'
    });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-stone-100/70 p-6 md:p-10 overflow-y-auto">
      <div className="content-fade-slide w-full flex flex-col flex-1">
        {/* Top Breadcrumb Header */}
      <div className="max-w-[1060px] mx-auto w-full mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToInventory}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors py-1.5 px-3 rounded-lg hover:bg-stone-200/60"
        >
          <ArrowLeft size={16} />
          <span>&larr; Return to Inventory</span>
        </button>
        <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-2.5 py-1 rounded-full">
          Figma Screen: Inventory (Add Product)
        </span>
      </div>

      {/* Main Modal Container Matching Figma Frame */}
      <div className="flex justify-center items-center">
        <div className="product-modal-standalone">
          {/* Form Left */}
          <div className="product-form-left">
            <h1 className="modal-title">Add Product</h1>

            <form id="standaloneAddForm" onSubmit={handleSubmit} noValidate>
              <div className="modal-field">
                <label htmlFor="standaloneName" className="modal-field-label">Product Name</label>
                <input 
                  type="text" 
                  id="standaloneName" 
                  className={`modal-input ${errors.name ? 'border-rose-500' : ''}`}
                  placeholder="e.g. Sliced Ube Moist Cake" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
                {errors.name && <span className="text-xs text-rose-600 font-medium">{errors.name}</span>}
              </div>

              <div className="modal-field">
                <label htmlFor="standaloneCat" className="modal-field-label">Category</label>
                <select 
                  id="standaloneCat" 
                  className="modal-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                >
                  <option value="pastries">Pastries</option>
                  <option value="snacks">Snacks</option>
                  <option value="meal">Meal</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>

              <div className="modal-row-two">
                <div className="modal-field" style={{ flex: 1 }}>
                  <label htmlFor="standalonePrice" className="modal-field-label">Unit Price (₱)</label>
                  <input 
                    type="number" 
                    id="standalonePrice" 
                    className="modal-input" 
                    placeholder="60.00" 
                    step="0.50" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required 
                  />
                </div>

                <div className="modal-field" style={{ flex: 1 }}>
                  <label htmlFor="standaloneStock" className="modal-field-label">Initial Stock</label>
                  <input 
                    type="number" 
                    id="standaloneStock" 
                    className="modal-input" 
                    placeholder="50" 
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="modal-field">
                <label htmlFor="standaloneDesc" className="modal-field-label">Description</label>
                <textarea 
                  id="standaloneDesc" 
                  className="modal-textarea" 
                  placeholder="Delicious freshly prepared item..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Meta Right */}
          <aside className="product-meta-right">
            <h2 className="meta-header-title">Product Details</h2>

            <div>
              <div 
                className="meta-image-card group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <img 
                  src={imageUrl} 
                  alt="Product image preview" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PRESET_IMAGES['chocolate_cake.webp'].url;
                  }}
                />
                <div className="meta-image-hover-overlay">
                  <div className="overlay-pen-circle">
                    <Upload size={18} />
                  </div>
                  <span className="overlay-pen-text">Click to Upload Photo</span>
                </div>
              </div>

              <div className="image-picker-overlay mt-2">
                <select 
                  value={imagePreset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="modal-input text-xs"
                >
                  <option value="chocolate_cake.webp">Chocolate Cake</option>
                  <option value="silvanas.webp">Silvanas</option>
                  <option value="siopao_chicken.webp">Siopao Chicken</option>
                  <option value="sisig.webp">Sisig</option>
                  <option value="default-product.webp">🍽️ Default Icon</option>
                </select>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-clean-upload"
                >
                  <Upload size={12} />
                  <span>Upload</span>
                </button>
              </div>
            </div>

            <div className="meta-stock-status">
              <span className="meta-stock-label">Stock Status</span>
              <span className="meta-stock-count" style={{ color: statusColor }}>
                {statusText}
              </span>
            </div>

            <div className="meta-info-box">
              <div className="meta-info-row">
                <span>Product ID:</span>
                <strong>#PRD-NEW</strong>
              </div>
              <div className="meta-info-row">
                <span>Status:</span>
                <strong className="text-emerald-700">Active Catalog</strong>
              </div>
            </div>

            <div className="modal-actions-box">
              <button 
                type="button" 
                className="btn-modal-cancel" 
                onClick={onBackToInventory}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-modal-save" 
                onClick={handleSubmit}
              >
                Add Product
              </button>
            </div>
          </aside>
        </div>
      </div>
      </div>
    </div>
  );
};
