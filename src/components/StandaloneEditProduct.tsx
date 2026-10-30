import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Category, Product } from '../types';
import { PRESET_IMAGES } from '../data/initialProducts';

interface StandaloneEditProductProps {
  product?: Product | null;
  onBackToInventory: () => void;
  onUpdateProduct: (id: string, updatedData: Partial<Product>) => void;
}

export const StandaloneEditProduct: React.FC<StandaloneEditProductProps> = ({
  product,
  onBackToInventory,
  onUpdateProduct
}) => {
  // Default to Siopao Chicken if no specific product passed
  const targetId = product?.id || '#M001-A';
  const [name, setName] = useState(product?.name || 'Siopao Chicken');
  const [category, setCategory] = useState<Category>(product?.category || 'snacks');
  const [price, setPrice] = useState(product?.price !== undefined ? product.price.toFixed(2) : '35.00');
  const [stock, setStock] = useState(product?.stock !== undefined ? product.stock.toString() : '50');
  const [description, setDescription] = useState(
    product?.description || 'Steamed fluffy bun filled with savory chicken and aromatics.'
  );
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || PRESET_IMAGES['siopao_chicken.webp'].url);
  const [imagePreset, setImagePreset] = useState(product?.imagePreset || 'siopao_chicken.webp');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price.toFixed(2));
      setStock(product.stock.toString());
      setDescription(product.description);
      setImageUrl(product.imageUrl);
      setImagePreset(product.imagePreset || 'siopao_chicken.webp');
    }
  }, [product]);

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

    onUpdateProduct(targetId, {
      name: name.trim(),
      category,
      price: parsedPrice,
      stock: parsedStock,
      description: description.trim(),
      imageUrl,
      imagePreset,
      updatedAt: 'Today, 3:15 PM'
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
          Figma Screen: Inventory (Edit Product)
        </span>
      </div>

      {/* Main Modal Container Matching Figma Frame */}
      <div className="flex justify-center items-center">
        <div className="product-modal-standalone">
          {/* Form Left */}
          <div className="product-form-left">
            <h1 className="modal-title">Edit Product</h1>

            <form id="standaloneEditForm" onSubmit={handleSubmit} noValidate>
              <div className="modal-field">
                <label htmlFor="standaloneEditName" className="modal-field-label">Product Name</label>
                <input 
                  type="text" 
                  id="standaloneEditName" 
                  className={`modal-input ${errors.name ? 'border-rose-500' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
                {errors.name && <span className="text-xs text-rose-600 font-medium">{errors.name}</span>}
              </div>

              <div className="modal-field">
                <label htmlFor="standaloneEditCat" className="modal-field-label">Category</label>
                <select 
                  id="standaloneEditCat" 
                  className="modal-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                >
                  <option value="snacks">Snacks</option>
                  <option value="pastries">Pastries</option>
                  <option value="meal">Meal</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>

              <div className="modal-row-two">
                <div className="modal-field" style={{ flex: 1 }}>
                  <label htmlFor="standaloneEditPrice" className="modal-field-label">Unit Price (₱)</label>
                  <input 
                    type="number" 
                    id="standaloneEditPrice" 
                    className="modal-input" 
                    step="0.50" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required 
                  />
                </div>

                <div className="modal-field" style={{ flex: 1 }}>
                  <label htmlFor="standaloneEditStock" className="modal-field-label">Current Stock</label>
                  <input 
                    type="number" 
                    id="standaloneEditStock" 
                    className="modal-input" 
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="modal-field">
                <label htmlFor="standaloneEditDesc" className="modal-field-label">Description</label>
                <textarea 
                  id="standaloneEditDesc" 
                  className="modal-textarea"
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
                  alt="Siopao Chicken image" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PRESET_IMAGES['siopao_chicken.webp'].url;
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
                  <option value="siopao_chicken.webp">Siopao Chicken</option>
                  <option value="chocolate_cake.webp">Chocolate Cake</option>
                  <option value="silvanas.webp">Silvanas</option>
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
                <strong>{targetId}</strong>
              </div>
              <div className="meta-info-row">
                <span>Last Updated:</span>
                <strong>Today, 3:15 PM</strong>
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
                Update Product
              </button>
            </div>
          </aside>
        </div>
      </div>
      </div>
    </div>
  );
};
