import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, RotateCcw, AlertTriangle } from 'lucide-react';
import { Category, Product } from '../types';
import { PRESET_IMAGES } from '../data/initialProducts';

interface ProductModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  productToEdit?: Product | null;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  mode,
  productToEdit,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('pastries');
  const [price, setPrice] = useState<string>('60.00');
  const [stock, setStock] = useState<string>('50');
  const [threshold, setThreshold] = useState<string>('10');
  const [dailyLimit, setDailyLimit] = useState<string>('25');
  const [available, setAvailable] = useState<boolean>(true);
  const [description, setDescription] = useState('');
  const [imagePreset, setImagePreset] = useState<string>('default-product.webp');
  const [imageUrl, setImageUrl] = useState<string>(PRESET_IMAGES['default-product.webp'].url);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form when modal opens or productToEdit changes
  useEffect(() => {
    if (!isOpen) return;

    if (mode === 'edit' && productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price.toString());
      setStock(productToEdit.stock.toString());
      setThreshold(productToEdit.threshold.toString());
      setDailyLimit(productToEdit.dailyLimit ? productToEdit.dailyLimit.toString() : '');
      setAvailable(productToEdit.available);
      setDescription(productToEdit.description);
      setImageUrl(productToEdit.imageUrl);
      setImagePreset(productToEdit.imagePreset || 'default-product.webp');
    } else {
      // Add mode defaults matching Figma
      setName('');
      setCategory('pastries');
      setPrice('60.00');
      setStock('50');
      setThreshold('10');
      setDailyLimit('');
      setAvailable(true);
      setDescription('');
      setImagePreset('default-product.webp');
      setImageUrl(PRESET_IMAGES['default-product.webp'].url);
    }
    setFormErrors({});
  }, [isOpen, mode, productToEdit]);

  if (!isOpen) return null;

  const currentStockNum = parseInt(stock, 10) || 0;
  const currentThresholdNum = parseInt(threshold, 10) || 0;

  // Determine dynamic stock status pill
  let stockStatusText = 'In Stock';
  let stockStatusColor = '#166534';
  if (currentStockNum === 0) {
    stockStatusText = 'Out of Stock';
    stockStatusColor = '#dc2626';
  } else if (currentStockNum <= currentThresholdNum) {
    stockStatusText = 'Low Stock';
    stockStatusColor = '#d97706';
  }

  const handleImagePresetChange = (presetKey: string) => {
    setImagePreset(presetKey);
    if (PRESET_IMAGES[presetKey]) {
      setImageUrl(PRESET_IMAGES[presetKey].url);
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

  const handleResetImage = () => {
    setImagePreset('default-product.webp');
    setImageUrl(PRESET_IMAGES['default-product.webp'].url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = 'Product name is required';
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) errors.price = 'Enter a valid unit price';
    const parsedStock = parseInt(stock, 10);
    if (isNaN(parsedStock) || parsedStock < 0) errors.stock = 'Enter a valid stock number';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload: Partial<Product> = {
      name: name.trim(),
      category,
      price: parsedPrice,
      stock: parsedStock,
      threshold: parseInt(threshold, 10) || 10,
      dailyLimit: dailyLimit.trim() ? parseInt(dailyLimit, 10) : null,
      available,
      description: description.trim(),
      imageUrl,
      imagePreset,
      updatedAt: 'Just now'
    };

    onSave(payload);
  };

  const displayId = mode === 'edit' && productToEdit ? productToEdit.id : '#PRD-AUTO';
  const displayDate = mode === 'edit' && productToEdit ? (productToEdit.updatedAt || 'Today, 3:15 PM') : 'Today';

  return (
    <div 
      className="modal-backdrop" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="productModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="product-modal relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button top-right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-md z-10 transition-colors"
          title="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Form Left */}
        <div className="product-form-left">
          <h2 className="modal-title" id="productModalTitle">
            {mode === 'add' ? 'Add Product' : 'Edit Product'}
          </h2>

          <form id="productForm" onSubmit={handleSubmit} noValidate>
            {/* Product Name */}
            <div className="modal-field">
              <label htmlFor="modalProductName" className="modal-field-label">
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input 
                type="text" 
                id="modalProductName" 
                className={`modal-input ${formErrors.name ? 'border-rose-400 focus:border-rose-500' : ''}`}
                placeholder="e.g. Sliced Ube Moist Cake"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {formErrors.name && (
                <span className="text-xs text-rose-600 font-medium mt-1">{formErrors.name}</span>
              )}
            </div>

            {/* Category */}
            <div className="modal-field">
              <label htmlFor="modalProductCategory" className="modal-field-label">
                Category
              </label>
              <select 
                id="modalProductCategory" 
                className="modal-input" 
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                required
              >
                <option value="pastries">Pastries</option>
                <option value="snacks">Snacks</option>
                <option value="meal">Meal</option>
                <option value="beverages">Beverages</option>
              </select>
            </div>

            {/* Row: Price, Stock, Threshold */}
            <div className="modal-row-two">
              <div className="modal-field flex-1">
                <label htmlFor="modalProductPrice" className="modal-field-label">
                  Unit Price (₱) <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="number" 
                  id="modalProductPrice" 
                  className={`modal-input ${formErrors.price ? 'border-rose-400' : ''}`}
                  placeholder="60.00" 
                  step="0.50" 
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="modal-field flex-1">
                <label htmlFor="modalProductStock" className="modal-field-label">
                  {mode === 'add' ? 'Initial Stock' : 'Current Stock'} <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="number" 
                  id="modalProductStock" 
                  className={`modal-input ${formErrors.stock ? 'border-rose-400' : ''}`}
                  placeholder="50" 
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div className="modal-field flex-1">
                <label htmlFor="modalProductThreshold" className="modal-field-label">
                  Low Stock Alert
                </label>
                <input 
                  type="number" 
                  id="modalProductThreshold" 
                  className="modal-input" 
                  placeholder="10" 
                  min="0" 
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                />
              </div>
            </div>

            {/* Row: Daily Limit, Menu Availability */}
            <div className="modal-row-two">
              <div className="modal-field flex-1">
                <label htmlFor="modalProductDailyLimit" className="modal-field-label">
                  Daily Pre-Order Limit
                </label>
                <input 
                  type="number" 
                  id="modalProductDailyLimit" 
                  className="modal-input" 
                  placeholder="e.g. 25 (blank = no limit)" 
                  min="0" 
                  step="1"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(e.target.value)}
                />
              </div>

              <div className="modal-field flex-1">
                <label htmlFor="modalProductAvailable" className="modal-field-label">
                  Menu Availability
                </label>
                <select 
                  id="modalProductAvailable" 
                  className="modal-input"
                  value={available ? 'true' : 'false'}
                  onChange={(e) => setAvailable(e.target.value === 'true')}
                >
                  <option value="true">Available (Active on Menu)</option>
                  <option value="false">Unavailable (Hidden)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="modal-field">
              <label htmlFor="modalProductDesc" className="modal-field-label">
                Description
              </label>
              <textarea 
                id="modalProductDesc" 
                className="modal-textarea" 
                placeholder="Delicious freshly prepared bakery item prepared with rich ingredients..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Metadata & Actions Right */}
        <aside className="product-meta-right">
          <h3 className="meta-header-title">Product Details</h3>

          {/* Image Preview Card with Clean Hover Pen Overlay */}
          <div>
            <div 
              className="meta-image-card group" 
              id="imageCard" 
              title="Click to upload custom photo"
              onClick={() => fileInputRef.current?.click()}
            >
              <img 
                id="imagePreview" 
                src={imageUrl} 
                alt="Product preview" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRESET_IMAGES['default-product.webp'].url;
                }}
              />
              <div className="meta-image-hover-overlay">
                <div className="overlay-pen-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <span className="overlay-pen-text">Click to Upload Photo</span>
              </div>
            </div>

            {/* Image Picker Dropdown & Buttons */}
            <div className="image-picker-overlay mt-2">
              <select 
                id="imageSelect" 
                title="Select product image preset"
                value={imagePreset}
                onChange={(e) => handleImagePresetChange(e.target.value)}
              >
                <option value="default-product.webp">🍽️ Default Icon</option>
                <option value="chocolate_cake.webp">Chocolate Cake</option>
                <option value="silvanas.webp">Silvanas</option>
                <option value="siopao_chicken.webp">Siopao Chicken</option>
                <option value="sisig.webp">Sisig</option>
                {imagePreset === 'custom' && <option value="custom">📁 Custom Uploaded</option>}
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
                title="Upload custom photo"
              >
                <Upload size={13} />
                <span>Upload</span>
              </button>

              <button 
                type="button" 
                onClick={handleResetImage}
                className="btn-clean-default" 
                title="Reset to default icon"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Stock Status Pill */}
          <div className="meta-stock-status">
            <span className="meta-stock-label">Stock Status</span>
            <span className="meta-stock-count" style={{ color: stockStatusColor }}>
              {stockStatusText}
            </span>
          </div>

          {/* Meta Info Box */}
          <div className="meta-info-box">
            <div className="meta-info-row">
              <span>Product ID:</span>
              <strong>{displayId}</strong>
            </div>
            <div className="meta-info-row">
              <span>{mode === 'add' ? 'Creation Date:' : 'Last Updated:'}</span>
              <strong>{displayDate}</strong>
            </div>
            <div className="meta-info-row">
              <span>Status:</span>
              <strong className={available ? 'text-emerald-700' : 'text-stone-500'}>
                {available ? 'Active Catalog' : 'Hidden from Menu'}
              </strong>
            </div>
          </div>

          {/* Action Buttons Box */}
          <div className="modal-actions-box">
            <button 
              type="button" 
              className="btn-modal-cancel" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn-modal-save" 
              onClick={handleSubmit}
            >
              {mode === 'add' ? 'Add Product' : 'Update Product'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
