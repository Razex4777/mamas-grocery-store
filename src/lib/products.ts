import { supabase, STORAGE_BUCKETS } from './supabase';
import type { Product, ProductInsert, ProductUpdate } from './database.types';

// Fetch all products (admin view - includes inactive)
export const fetchAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false }) as { data: Product[] | null; error: any };

  if (error) {
    console.error('Error fetching all products:', error);
    return [];
  }

  return data || [];
};

// Fetch active products (public view)
export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false }) as { data: Product[] | null; error: any };

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
};

// Fetch single product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single() as { data: Product | null; error: any };

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('display_order', { ascending: true }) as { data: Product[] | null; error: any };

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data || [];
};

// Fetch featured products
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .limit(8) as { data: Product[] | null; error: any };

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data || [];
};

// Fetch new arrival products
export const fetchNewArrivals = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('new_arrival', true)
    .order('created_at', { ascending: false })
    .limit(12) as { data: Product[] | null; error: any };

  if (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }

  return data || [];
};

// Fetch best sellers (based on featured products since best_seller was removed)
export const fetchBestSellers = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(4) as { data: Product[] | null; error: any };

  if (error) {
    console.error('Error fetching best sellers:', error);
    return [];
  }

  return data || [];
};

// Create new product
export const createProduct = async (product: ProductInsert): Promise<Product | null> => {
  const normalized = {
    ...product,
    sku: product.sku && product.sku.trim() !== '' ? product.sku.trim() : null,
  } as ProductInsert;

  const { data, error } = await supabase
    .from('products')
    .insert(normalized)
    .select()
    .single() as { data: Product | null; error: any };

  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }

  return data;
};

// Update product
export const updateProduct = async (
  id: string,
  updates: ProductUpdate
): Promise<Product | null> => {
  const normalized = {
    ...updates,
    sku: updates.sku !== undefined && updates.sku !== null && updates.sku.trim() !== ''
      ? updates.sku.trim()
      : updates.sku === ''
        ? null
        : updates.sku,
  } as ProductUpdate;

  const { data, error } = await supabase
    .from('products')
    .update(normalized)
    .eq('id', id)
    .select()
    .single() as { data: Product | null; error: any };

  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }

  return data;
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Upload product image to specific product folder
export const uploadProductImage = async (
  file: File,
  productId: string,
  fileName?: string
): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const imageName = fileName || `${Date.now()}.${fileExt}`;
  const filePath = `${productId}/${imageName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKETS.PRODUCT_IMAGES)
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKETS.PRODUCT_IMAGES)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// Delete product image
export const deleteProductImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split(`/${STORAGE_BUCKETS.PRODUCT_IMAGES}/`);
    if (urlParts.length < 2) return false;
    
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.PRODUCT_IMAGES)
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error deleting image:', err);
    return false;
  }
};

// Delete all images in a product folder
export const deleteProductFolder = async (productId: string): Promise<boolean> => {
  try {
    const { data: files, error: listError } = await supabase.storage
      .from(STORAGE_BUCKETS.PRODUCT_IMAGES)
      .list(productId);

    if (listError || !files || files.length === 0) {
      return true; // No files to delete or folder doesn't exist
    }

    const filePaths = files.map(file => `${productId}/${file.name}`);

    const { error: deleteError } = await supabase.storage
      .from(STORAGE_BUCKETS.PRODUCT_IMAGES)
      .remove(filePaths);

    if (deleteError) {
      console.error('Error deleting product folder:', deleteError);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error deleting product folder:', err);
    return false;
  }
};

// Subscribe to product changes
export const subscribeToProductChanges = (
  callback: (products: Product[]) => void
) => {
  const channel = supabase
    .channel('products-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'products',
      },
      async () => {
        const products = await fetchAllProducts();
        callback(products);
      }
    )
    .subscribe();

  return channel;
};

/**
 * Increment product view count
 * Called when a user visits a product details page
 */
export const incrementProductViewCount = async (productId: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('increment_product_view_count', {
      product_id: productId
    });
    
    if (error) {
      console.error('Error incrementing view count:', error);
    }
  } catch (error) {
    console.error('Failed to increment view count:', error);
  }
};

/**
 * Expire new arrivals older than 3 days
 * Automatically sets new_arrival = false for products older than 3 days
 */
export const expireOldNewArrivals = async (): Promise<void> => {
  try {
    const { error } = await supabase.rpc('expire_old_new_arrivals');
    
    if (error) {
      console.error('Error expiring old new arrivals:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to expire old new arrivals:', error);
  }
};
