import { useEffect, useState, useRef } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useToast } from '../../../components/Toast';
import { Plus, Edit2, Trash2, Check, X, Upload, Image as ImageIcon, Search, ChevronDown } from 'lucide-react';
import { 
  fetchAllCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  uploadCategoryImage,
  deleteCategoryImage,
  subscribeToCategoryChanges 
} from '../../../lib/categories';
import type { Category } from '../../../lib/database.types';

export default function CategoriesPage() {
  const toast = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    
    const channel = subscribeToCategoryChanges((updated) => {
      setCategories(updated);
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const loadCategories = async () => {
    const data = await fetchAllCategories();
    setCategories(data);
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;
    setLoading(true);
    try {
      // Delete the image from storage if it exists
      if (deletingCategory.image_url) {
        await deleteCategoryImage(deletingCategory.image_url);
      }
      
      // Delete the category
      await deleteCategory(deletingCategory.id);
      setDeletingCategory(null);
      await loadCategories();
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete category');
    }
    setLoading(false);
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Categories
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">{categories.length} total categories</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            Add New
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative group max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-200" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-900/50 border border-slate-800/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-900/80 transition-all duration-200"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-800/50">
              <tr>
                  <th className="text-left px-4 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">Image</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">Slug</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">Origin</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-slate-800/30">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="group hover:bg-slate-800/30 transition-colors duration-200">
                    <td className="px-4 py-3">
                    {category.image_url ? (
                        <img 
                          src={category.image_url} 
                          alt={category.name} 
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700/50 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-200"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-600 group-hover:text-slate-400 group-hover:border-slate-600/50 transition-all duration-200">
                          <ImageIcon size={16} />
                      </div>
                    )}
                  </td>
                    <td className="px-4 py-3">
                      <span className="text-white text-sm font-medium group-hover:text-emerald-400 transition-colors duration-200">{category.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-400 font-mono text-xs">{category.slug}</span>
                    </td>
                    <td className="px-4 py-3">
                      {category.origin ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-[10px] font-medium border border-cyan-500/20">
                          <img 
                            src={
                              category.origin === 'Morocco' ? '/flags/morocco_flag_icon.svg' :
                              category.origin === 'Algeria' ? '/flags/algeria_flag_icon.svg' :
                              category.origin === 'Tunisia' ? '/flags/tunisia_flag_icon.svg' :
                              category.origin === 'Orient' ? '/flags/orient_middle_east_flag_icon.svg' :
                              category.origin === 'Africa' ? '/flags/africa_icon.svg' :
                              category.origin === 'Europe' ? '/flags/europe_flag_icon.svg' : ''
                            }
                            alt={category.origin}
                            className="w-4 h-4 object-contain"
                          />
                          {category.origin}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs italic">Not set</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                    {category.is_active ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-emerald-500/30">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-500/20 text-slate-400 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-slate-500/30">
                          <span className="w-1 h-1 rounded-full bg-slate-400" />
                        Inactive
                      </span>
                    )}
                  </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditingCategory(category)}
                          className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Edit"
                      >
                          <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeletingCategory(category)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Delete"
                      >
                          <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No categories found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <CategoryModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={loadCategories}
        />
      )}

      {/* Edit Modal */}
      {editingCategory && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSuccess={loadCategories}
        />
      )}

      {/* Delete Confirmation */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg animate-fadeIn">
          <div className="bg-slate-900/95 border border-slate-800/50 rounded-xl p-5 max-w-sm w-full animate-slideUp">
            <h3 className="text-lg font-bold text-white mb-2">Delete Category?</h3>
            <p className="text-slate-400 text-sm mb-5">
              Are you sure you want to delete <span className="text-white font-semibold">{deletingCategory.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletingCategory(null)}
                className="flex-1 px-4 py-2 text-sm bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg transition-all duration-200 hover:scale-[1.02]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
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

function CategoryModal({ category, onClose, onSuccess }: {
  category?: Category;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const toast = useToast();
  const TEMP_IMAGE_KEY = 'category_temp_image';
  const TEMP_IMAGE_FILE_KEY = 'category_temp_image_file';
  
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    origin: category?.origin || '',
    image_url: category?.image_url || '',
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(category?.image_url || '');
  const [tempImageFile, setTempImageFile] = useState<File | null>(null);
  const [isOriginDropdownOpen, setIsOriginDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const originDropdownRef = useRef<HTMLDivElement>(null);

  // Origin options with flags
  const ORIGIN_OPTIONS = [
    { value: 'Morocco', label: 'Morocco (Maroc)', icon: '/flags/morocco_flag_icon.svg' },
    { value: 'Algeria', label: 'Algeria (Algérie)', icon: '/flags/algeria_flag_icon.svg' },
    { value: 'Tunisia', label: 'Tunisia (Tunisie)', icon: '/flags/tunisia_flag_icon.svg' },
    { value: 'Orient', label: 'Orient (Middle East)', icon: '/flags/orient_middle_east_flag_icon.svg' },
    { value: 'Africa', label: 'Africa (Afrique)', icon: '/flags/africa_icon.svg' },
    { value: 'Europe', label: 'Europe', icon: '/flags/europe_flag_icon.svg' },
  ];

  // Calculate dropdown position to avoid going off-screen
  const calculateDropdownPosition = () => {
    if (originDropdownRef.current) {
      const rect = originDropdownRef.current.getBoundingClientRect();
      const dropdownHeight = 300; // Approximate max height
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  };

  // Close origin dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originDropdownRef.current && !originDropdownRef.current.contains(event.target as Node)) {
        setIsOriginDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load temp image from localStorage on mount (for new categories only)
  useEffect(() => {
    if (!category) {
      const tempImage = localStorage.getItem(TEMP_IMAGE_KEY);
      if (tempImage) {
        setImagePreview(tempImage);
      }
    }
    
    // Cleanup function - clear localStorage when modal is unmounted
    return () => {
      if (!category) {
        localStorage.removeItem(TEMP_IMAGE_KEY);
        localStorage.removeItem(TEMP_IMAGE_FILE_KEY);
      }
    };
  }, [category]);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      // For editing existing categories, upload immediately and replace old image
      if (category) {
        // Upload new image first
        const imageUrl = await uploadCategoryImage(file, category.id);
        
        if (imageUrl) {
          // Only delete old image after new one is successfully uploaded
          if (category.image_url && category.image_url !== imageUrl) {
            try {
              await deleteCategoryImage(category.image_url);
            } catch (deleteError) {
              console.error('Failed to delete old image:', deleteError);
              // Log but don't block - new image is already uploaded
            }
          }
          setFormData({ ...formData, image_url: imageUrl });
          setImagePreview(imageUrl);
        }
      } else {
        // For new categories, store in localStorage as base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          localStorage.setItem(TEMP_IMAGE_KEY, base64String);
          setImagePreview(base64String);
          setTempImageFile(file);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to process image');
    }
    setUploadingImage(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (category) {
        // Editing existing category
        await updateCategory(category.id, formData);
        toast.success('Category updated successfully!');
      } else {
        // Creating new category
        // First create the category
        const newCategory = await createCategory({
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          image_url: '', // Empty initially
          is_active: true,
        });

        if (newCategory && tempImageFile) {
          // Upload image to Supabase storage with the new category ID
          try {
            const imageUrl = await uploadCategoryImage(tempImageFile, newCategory.id);
            if (imageUrl) {
              // Update the category with the image URL
              await updateCategory(newCategory.id, { image_url: imageUrl });
            }
          } catch (uploadError) {
            console.error('Image upload failed:', uploadError);
            // Category created but image failed - inform user
            toast.warning('Category created but image upload failed. You can edit the category to add an image.');
          }
        }

        // Clear localStorage immediately after successful creation
        localStorage.removeItem(TEMP_IMAGE_KEY);
        localStorage.removeItem(TEMP_IMAGE_FILE_KEY);
        toast.success('Category created successfully!');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save category');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg animate-fadeIn">
      <div className="bg-slate-900/95 border border-slate-800/50 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {category ? 'Edit Category' : 'New Category'}
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800/50 rounded-lg transition-all duration-200 text-slate-400 hover:text-white hover:scale-110"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-2 flex items-center gap-1.5">
              <ImageIcon size={12} className="text-emerald-400" />
              Category Image
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
              }`}
            >
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center gap-2">
                    <label className="cursor-pointer px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white text-xs font-medium transition-all duration-200 hover:scale-105">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData({ ...formData, image_url: '' });
                        setTempImageFile(null);
                        localStorage.removeItem(TEMP_IMAGE_KEY);
                        localStorage.removeItem(TEMP_IMAGE_FILE_KEY);
                      }}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-white text-xs font-medium transition-all duration-200 hover:scale-105"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer py-6">
                  <Upload className={`w-10 h-10 mb-2 ${isDragging ? 'text-emerald-400 scale-110' : 'text-slate-500'} transition-all duration-200`} />
                  <p className="text-slate-300 font-medium text-sm mb-0.5">
                    {uploadingImage ? 'Uploading...' : 'Drop image here or click'}
                  </p>
                  <p className="text-slate-500 text-xs">PNG, JPG, WebP • Max 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              )}
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-white text-xs font-medium">Uploading...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Name & Slug */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData({ 
                    ...formData, 
                    name,
                    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                  });
                }}
                className="w-full px-3 py-2 text-sm bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800/80 transition-all duration-200"
                placeholder="e.g., Grains"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1.5">
                Slug <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                className="w-full px-3 py-2 text-sm bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-slate-800/80 transition-all duration-200 font-mono text-xs"
                placeholder="e.g., grains"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-1.5">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800/80 transition-all duration-200 resize-none"
              placeholder="Brief description..."
            />
          </div>

          {/* Origin/Region Custom Dropdown with Flag Icons */}
          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-1.5">
              Origin / Region <span className="text-emerald-400 text-[10px] font-normal">(Products inherit from category)</span>
            </label>
            <div className="relative" ref={originDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  calculateDropdownPosition();
                  setIsOriginDropdownOpen(!isOriginDropdownOpen);
                }}
                className="w-full px-3 py-2.5 text-sm bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {formData.origin ? (
                    <>
                      <img
                        src={ORIGIN_OPTIONS.find(opt => opt.value === formData.origin)?.icon}
                        alt={formData.origin}
                        className="w-5 h-5 object-contain"
                      />
                      <span>{ORIGIN_OPTIONS.find(opt => opt.value === formData.origin)?.label}</span>
                    </>
                  ) : (
                    <span className="text-slate-500">Select origin...</span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOriginDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isOriginDropdownOpen && (
                <div className="fixed z-[100] bg-slate-800 border border-slate-700/50 rounded-lg shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
                  style={{
                    ...(dropdownPosition === 'bottom' ? {
                      top: originDropdownRef.current?.getBoundingClientRect().bottom ? `${originDropdownRef.current.getBoundingClientRect().bottom + 8}px` : 'auto',
                    } : {
                      bottom: originDropdownRef.current?.getBoundingClientRect().top ? `${window.innerHeight - originDropdownRef.current.getBoundingClientRect().top + 8}px` : 'auto',
                    }),
                    left: originDropdownRef.current?.getBoundingClientRect().left ? `${originDropdownRef.current.getBoundingClientRect().left}px` : 'auto',
                    width: originDropdownRef.current?.offsetWidth ? `${originDropdownRef.current.offsetWidth}px` : 'auto',
                  }}
                >
                  <div className="py-1 max-h-60 overflow-y-auto">
                    {ORIGIN_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, origin: option.value });
                          setIsOriginDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2.5 flex items-center gap-3 hover:bg-slate-700/50 transition-colors text-left ${
                          formData.origin === option.value ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-200'
                        }`}
                      >
                        <img
                          src={option.icon}
                          alt={option.label}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="text-sm font-medium">{option.label}</span>
                        {formData.origin === option.value && (
                          <Check className="w-4 h-4 ml-auto text-emerald-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">All products in this category will inherit this origin</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t border-slate-800/50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-white rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={14} />
                  {category ? 'Update' : 'Create'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
