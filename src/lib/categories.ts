import { supabase, STORAGE_BUCKETS } from './supabase';
import type { Category, CategoryInsert, CategoryUpdate } from './database.types';

// Fetch all categories (admin view - includes inactive)
export const fetchAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true }) as { data: Category[] | null; error: any };

  if (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }

  return data || [];
};

// Fetch all active categories (public view)
export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true }) as { data: Category[] | null; error: any };

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
};

// Fetch single category by slug
export const fetchCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single() as { data: Category | null; error: any };

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
};

// Create new category
export const createCategory = async (category: CategoryInsert): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single() as { data: Category | null; error: any };

  if (error) {
    console.error('Error creating category:', error);
    throw error;
  }

  return data;
};

// Update category
export const updateCategory = async (id: string, updates: CategoryUpdate): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single() as { data: Category | null; error: any };

  if (error) {
    console.error('Error updating category:', error);
    throw error;
  }

  return data;
};

// Delete category
export const deleteCategory = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    throw error;
  }

  return true;
};

// Upload category image
export const uploadCategoryImage = async (file: File, categoryId: string): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${categoryId}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKETS.CATEGORY_IMAGES)
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKETS.CATEGORY_IMAGES)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// Delete category image
export const deleteCategoryImage = async (imageUrl: string): Promise<boolean> => {
  try {
    const fileName = imageUrl.split('/').pop();
    if (!fileName) return false;

    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.CATEGORY_IMAGES)
      .remove([fileName]);

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

// Subscribe to real-time category updates
export const subscribeToCategoryChanges = (
  callback: (categories: Category[]) => void
) => {
  const channel = supabase
    .channel('categories-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'categories',
      },
      async () => {
        // Refetch categories when any change occurs
        const categories = await fetchAllCategories();
        callback(categories);
      }
    )
    .subscribe();

  return channel;
};
