import { useEffect, useState, useRef } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useToast } from '../../../components/Toast';
import { Plus, Edit2, Trash2, Image as ImageIcon, Search, Package, Eye, EyeOff } from 'lucide-react';
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteProductImage,
  deleteProductFolder,
  subscribeToProductChanges
} from '../../../lib/products';
import { fetchAllCategories } from '../../../lib/categories';
import type { Product, Category } from '../../../lib/database.types';

export default function ProductsPage() {
  const toast = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();

    // Subscribe to real-time changes
    const channel = subscribeToProductChanges((updatedProducts) => {
      setProducts(updatedProducts);
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const loadProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
  };

  const loadCategories = async () => {
    const data = await fetchAllCategories();
    setCategories(data);
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;
    setLoading(true);
    try {
      // Delete all product images
      await deleteProductFolder(deletingProduct.id);
      
      // Delete the product
      await deleteProduct(deletingProduct.id);
      setDeletingProduct(null);
      await loadProducts();
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete product');
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(prod => 
    prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Products Management
            </h1>
            <p className="text-sm text-slate-400 mt-1">Manage product showcase</p>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105"
          >
            <Plus size={18} />
            <span className="font-medium">Add Product</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-800/30 border border-slate-700/50 rounded-lg overflow-hidden hover:border-emerald-500/50 transition-all duration-200 group"
            >
              {/* Image */}
              <div className="relative h-40 bg-slate-900/50 flex items-center justify-center p-4">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <ImageIcon className="text-slate-600" size={48} />
                )}
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {product.featured && (
                    <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] font-medium rounded border border-yellow-500/30">
                      Featured
                    </span>
                  )}
                  {product.new_arrival && (
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-medium rounded border border-blue-500/30">
                      New
                    </span>
                  )}
                </div>
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  {product.is_active ? (
                    <Eye className="text-emerald-400" size={16} />
                  ) : (
                    <EyeOff className="text-slate-600" size={16} />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-200 line-clamp-2">
                    {product.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Package size={12} />
                  <span>{categories.find(c => c.id === product.category_id)?.origin || 'No category'}</span>
                  {product.in_stock ? (
                    <span className="ml-auto text-emerald-400">In Stock</span>
                  ) : (
                    <span className="ml-auto text-red-400">Out of Stock</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded hover:bg-emerald-500/20 transition-all text-xs font-medium"
                  >
                    <Edit2 size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingProduct(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-all text-xs font-medium"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto text-slate-600 mb-3" size={48} />
            <p className="text-slate-400">No products found</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
          onSave={async () => {
            await loadProducts();
            setShowModal(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deletingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Delete Product</h3>
            <p className="text-sm text-slate-400 mb-6">
              Are you sure you want to delete "{deletingProduct.title}"? This will also delete all product images.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingProduct(null)}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// Product Modal Component
interface ProductModalProps {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
}

function ProductModal({ product, categories, onClose, onSave }: ProductModalProps) {
  const toast = useToast();
  const TEMP_IMAGE_KEY = 'temp_product_image';
  const TEMP_IMAGE_FILE_KEY = 'temp_product_image_file';

  const [formData, setFormData] = useState({
    title: product?.title || '',
    slug: product?.slug || '',
    description: product?.description || '',
    category_id: product?.category_id || '',
    in_stock: product?.in_stock ?? true,
    sku: product?.sku || '',
    image_url: product?.image_url || '',
    images: product?.images || [],
    benefits: product?.benefits || [],
    featured: product?.featured ?? false,
  });

  const [tempImageFiles, setTempImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    product?.images || (product?.image_url ? [product.image_url] : []) || []
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [benefitInput, setBenefitInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const categorySearchRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
        setCategorySearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when category dropdown opens
  useEffect(() => {
    if (isCategoryDropdownOpen && categorySearchRef.current) {
      categorySearchRef.current.focus();
    }
  }, [isCategoryDropdownOpen]);

  // Filter categories based on search
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );

  // Load temp images from localStorage for new products
  useEffect(() => {
    if (!product) {
      const tempImages = localStorage.getItem(TEMP_IMAGE_KEY);
      if (tempImages) {
        setImagePreviews(JSON.parse(tempImages));
      }
    }
  }, [product]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!product && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, product]);

  // Cleanup temp storage when modal closes
  useEffect(() => {
    return () => {
      if (!product) {
        localStorage.removeItem(TEMP_IMAGE_KEY);
        localStorage.removeItem(TEMP_IMAGE_FILE_KEY);
      }
    };
  }, [product]);

  const handleImageUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const MAX_IMAGES = 5;
    
    // Check if adding these files would exceed the limit
    if (imagePreviews.length + fileArray.length > MAX_IMAGES) {
      toast.warning(`You can only upload up to ${MAX_IMAGES} images. Currently ${imagePreviews.length} uploaded.`);
      return;
    }

    // Validate all files
    for (const file of fileArray) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload only image files');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Each file size must be less than 5MB');
        return;
      }
    }

    setUploadingImage(true);
    try {
      if (product) {
        // For existing products, upload immediately
        const uploadedUrls: string[] = [];
        for (const file of fileArray) {
          const imageUrl = await uploadProductImage(file, product.id);
          if (imageUrl) {
            uploadedUrls.push(imageUrl);
          }
        }
        
        const newImages = [...imagePreviews, ...uploadedUrls];
        setImagePreviews(newImages);
        setFormData({ 
          ...formData, 
          image_url: newImages[0] || '',
          images: newImages 
        });
      } else {
        // For new products, store in localStorage
        const newPreviews: string[] = [];
        const newFiles: File[] = [];
        
        for (const file of fileArray) {
          const reader = new FileReader();
          await new Promise<void>((resolve) => {
            reader.onloadend = () => {
              newPreviews.push(reader.result as string);
              newFiles.push(file);
              resolve();
            };
            reader.readAsDataURL(file);
          });
        }
        
        const allPreviews = [...imagePreviews, ...newPreviews];
        const allFiles = [...tempImageFiles, ...newFiles];
        
        setImagePreviews(allPreviews);
        setTempImageFiles(allFiles);
        localStorage.setItem(TEMP_IMAGE_KEY, JSON.stringify(allPreviews));
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to process images');
    }
    setUploadingImage(false);
  };

  const handleRemoveImage = async (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    if (product) {
      // For existing products, delete from storage
      const imageToDelete = imagePreviews[index];
      if (imageToDelete) {
        await deleteProductImage(imageToDelete);
      }
    } else {
      // For new products, update temp storage
      const newFiles = tempImageFiles.filter((_, i) => i !== index);
      setTempImageFiles(newFiles);
    }
    
    setImagePreviews(newPreviews);
    setFormData({ 
      ...formData, 
      image_url: newPreviews[0] || '',
      images: newPreviews 
    });
    localStorage.setItem(TEMP_IMAGE_KEY, JSON.stringify(newPreviews));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (product) {
        // Update existing product
        await updateProduct(product.id, formData);
        toast.success('Product updated successfully!');
        onSave();
      } else {
        // Create new product
        const newProduct = await createProduct({
          ...formData,
          image_url: '', // Will be updated after upload
        });

        if (newProduct && tempImageFiles.length > 0) {
          // Upload images to product folder
          const uploadedUrls: string[] = [];
          for (const file of tempImageFiles) {
            const imageUrl = await uploadProductImage(file, newProduct.id);
            if (imageUrl) {
              uploadedUrls.push(imageUrl);
            }
          }
          
          if (uploadedUrls.length > 0) {
            await updateProduct(newProduct.id, { 
              image_url: uploadedUrls[0],
              images: uploadedUrls
            });
          }
        }

        // Clear temp storage
        localStorage.removeItem(TEMP_IMAGE_KEY);
        localStorage.removeItem(TEMP_IMAGE_FILE_KEY);
        toast.success('Product created successfully!');
        onSave();
      }
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save product');
    }

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-semibold text-slate-200">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Container */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50"
                placeholder="Enter product title"
              />
            </div>

            {/* Slug */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
                placeholder="product-slug"
              />
            </div>

            {/* Custom Category Dropdown with Search */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <div className="relative" ref={categoryDropdownRef}>
                {/* Selected Value Display */}
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 hover:border-slate-600/50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    {formData.category_id ? (
                      <>
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                          {categories.find(c => c.id === formData.category_id)?.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{categories.find(c => c.id === formData.category_id)?.name}</span>
                      </>
                    ) : (
                      <span className="text-slate-500">No Category</span>
                    )}
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700/50 rounded-lg shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
                    {/* Search Input */}
                    <div className="p-2 border-b border-slate-700/50">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          ref={categorySearchRef}
                          type="text"
                          value={categorySearchQuery}
                          onChange={(e) => setCategorySearchQuery(e.target.value)}
                          placeholder="Search categories..."
                          className="w-full pl-9 pr-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                        />
                      </div>
                    </div>

                    {/* Scrollable Options */}
                    <div className="py-1 max-h-60 overflow-y-auto custom-scrollbar">
                      {/* No Category Option */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, category_id: '' });
                          setIsCategoryDropdownOpen(false);
                          setCategorySearchQuery('');
                        }}
                        className={`w-full px-3 py-2.5 flex items-center gap-3 hover:bg-slate-700/50 transition-colors text-left ${
                          formData.category_id === '' ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-200'
                        }`}
                      >
                        <div className="w-6 h-6 rounded bg-slate-700/50 flex items-center justify-center text-slate-400 text-xs">
                          —
                        </div>
                        <span className="text-sm font-medium">No Category</span>
                        {formData.category_id === '' && (
                          <svg className="w-4 h-4 ml-auto text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>

                      {/* Category Options */}
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, category_id: category.id });
                              setIsCategoryDropdownOpen(false);
                              setCategorySearchQuery('');
                            }}
                            className={`w-full px-3 py-2.5 flex items-center gap-3 hover:bg-slate-700/50 transition-colors text-left ${
                              formData.category_id === category.id ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-200'
                            }`}
                          >
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                              {category.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium">{category.name}</span>
                            {formData.category_id === category.id && (
                              <svg className="w-4 h-4 ml-auto text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-6 text-center text-slate-500 text-sm">
                          No categories found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Origin Info (inherited from category) */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Origin <span className="text-emerald-400 text-[10px] font-normal">(Inherited from category)</span>
              </label>
              <div className="w-full px-3 py-2.5 bg-slate-800/30 border border-slate-700/30 rounded-lg text-sm">
                {formData.category_id ? (
                  <span className="text-cyan-400 font-medium">
                    {categories.find(c => c.id === formData.category_id)?.origin || 'Not set in category'}
                  </span>
                ) : (
                  <span className="text-slate-500 italic">Select a category first</span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Products inherit origin from their category</p>
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                SKU <span className="text-slate-500 text-[10px]">(Optional - leave blank)</span>
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 font-mono focus:outline-none focus:border-emerald-500/50"
                placeholder="PROD-001 (optional)"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-none"
                placeholder="Product description"
              />
            </div>

            {/* Benefits */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Key Benefits
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (benefitInput.trim()) {
                          setFormData({ ...formData, benefits: [...(formData.benefits || []), benefitInput.trim()] });
                          setBenefitInput('');
                        }
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50"
                    placeholder="Add a benefit and press Enter"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (benefitInput.trim()) {
                        setFormData({ ...formData, benefits: [...(formData.benefits || []), benefitInput.trim()] });
                        setBenefitInput('');
                      }
                    }}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.benefits && formData.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-sm text-emerald-400">
                        <span>✓ {benefit}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newBenefits = formData.benefits?.filter((_, i) => i !== index) || [];
                            setFormData({ ...formData, benefits: newBenefits });
                          }}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Stock Status Radio Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300 mb-2">Stock Status *</label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`group relative flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.in_stock 
                  ? 'bg-emerald-500/10 border-emerald-500/50 hover:border-emerald-500' 
                  : 'bg-slate-800/30 border-slate-700/30 hover:border-slate-600'
              }`}>
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="stock_status"
                    checked={formData.in_stock}
                    onChange={() => setFormData({ ...formData, in_stock: true })}
                    className="peer sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                    formData.in_stock 
                      ? 'border-emerald-500 bg-emerald-500' 
                      : 'border-slate-600 bg-slate-900'
                  }`}>
                    {formData.in_stock && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <span className={`text-sm font-medium transition-colors ${
                    formData.in_stock ? 'text-emerald-400' : 'text-slate-400'
                  }`}>In Stock</span>
                  <p className="text-xs text-slate-500">Available for sale</p>
                </div>
              </label>

              <label className={`group relative flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                !formData.in_stock 
                  ? 'bg-red-500/10 border-red-500/50 hover:border-red-500' 
                  : 'bg-slate-800/30 border-slate-700/30 hover:border-slate-600'
              }`}>
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="stock_status"
                    checked={!formData.in_stock}
                    onChange={() => setFormData({ ...formData, in_stock: false })}
                    className="peer sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                    !formData.in_stock 
                      ? 'border-red-500 bg-red-500' 
                      : 'border-slate-600 bg-slate-900'
                  }`}>
                    {!formData.in_stock && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <span className={`text-sm font-medium transition-colors ${
                    !formData.in_stock ? 'text-red-400' : 'text-slate-400'
                  }`}>Out of Stock</span>
                  <p className="text-xs text-slate-500">Not available</p>
                </div>
              </label>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="space-y-3">

            <label className="group relative flex items-center gap-3 p-3 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 hover:border-blue-500/30 rounded-xl cursor-pointer transition-all duration-200">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded-md border-2 border-slate-600 bg-slate-900 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">Featured</span>
                <p className="text-xs text-slate-500">Highlight on homepage</p>
              </div>
            </label>

            {/* New Arrival Info - Auto-managed */}
            <div className="group relative flex items-center gap-3 p-3 bg-slate-800/30 border border-orange-500/30 rounded-xl">
              <div className="relative flex items-center">
                <div className="w-5 h-5 rounded-md border-2 border-orange-500 bg-orange-500/20 transition-all duration-200 flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-slate-200">New Arrival (Auto)</span>
                <p className="text-xs text-slate-500">Automatically marked for 3 days</p>
              </div>
            </div>
          </div>

          {/* Multiple Image Upload */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Product Images * (Max 5)
            </label>
            
            {/* Image Grid */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-slate-700/50"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-all shadow-lg"
                      >
                        Remove
                      </button>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white rounded text-xs font-medium">
                        Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Upload Area */}
            {imagePreviews.length < 5 && (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? 'scale-[1.02]'
                    : ''
                }`}
              >
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <div className={`
                    bg-slate-800/30 backdrop-blur-sm
                    px-12 py-10
                    rounded-3xl
                    border-2 border-dashed 
                    shadow-xl
                    transition-all duration-300
                    hover:shadow-2xl hover:shadow-emerald-500/10
                    ${isDragging 
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-2xl shadow-emerald-500/20' 
                      : 'border-slate-600 hover:border-emerald-500/50'
                    }
                  `}>
                    <div className="flex flex-col items-center justify-center gap-3">
                      {/* Cloud Upload SVG */}
                      <svg 
                        viewBox="0 0 640 512" 
                        className={`h-16 w-16 transition-all duration-300 ${
                          isDragging ? 'fill-emerald-400 scale-110' : 'fill-slate-500'
                        }`}
                      >
                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                      </svg>
                      
                      <div className="text-center space-y-2">
                        <p className={`text-base font-semibold transition-colors ${
                          isDragging ? 'text-emerald-400' : 'text-slate-300'
                        }`}>
                          Drag and Drop Images
                        </p>
                        <p className="text-slate-500 text-sm">or</p>
                        <span className={`
                          inline-block px-6 py-2.5 
                          rounded-xl 
                          font-medium text-sm
                          transition-all duration-300
                          ${isDragging 
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                            : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                          }
                        `}>
                          Browse Files
                        </span>
                        <p className="text-slate-500 text-xs mt-2">{imagePreviews.length}/5 images uploaded</p>
                      </div>
                      
                      <p className="text-xs text-slate-500 mt-2">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  </div>
                  <input 
                    id="file-upload"
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={(e) => e.target.files && e.target.files.length > 0 && handleImageUpload(e.target.files)}
                    className="hidden"
                  />
                </label>
                
                {/* Upload Progress Overlay */}
                {uploadingImage && (
                  <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                    <div className="text-center">
                      <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm text-emerald-400 font-medium">Uploading image...</p>
                      <p className="text-xs text-slate-500 mt-1">Please wait</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || imagePreviews.length === 0}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 text-sm font-medium"
            >
              {saving ? 'Saving...' : product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}



