export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: CategoryInsert;
        Update: CategoryUpdate;
      };
      products: {
        Row: Product;
        Insert: ProductInsert;
        Update: ProductUpdate;
      };
      newsletter_subscriptions: {
        Row: NewsletterSubscription;
        Insert: NewsletterSubscriptionInsert;
        Update: NewsletterSubscriptionUpdate;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: ContactMessageInsert;
        Update: ContactMessageUpdate;
      };
      admin_data: {
        Row: AdminData;
        Insert: AdminDataInsert;
        Update: AdminDataUpdate;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_product_view_count: {
        Args: { product_id: string };
        Returns: void;
      };
      expire_old_new_arrivals: {
        Args: Record<string, never>;
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryInsert {
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  is_active?: boolean;
}

export interface CategoryUpdate {
  name?: string;
  slug?: string;
  description?: string | null;
  image_url?: string | null;
  is_active?: boolean;
}

// Product Types
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string | null;
  origin: string;
  in_stock: boolean;
  sku: string | null;
  image_url: string;
  images: string[] | null;
  featured: boolean;
  new_arrival: boolean;
  specifications: Record<string, any> | null;
  benefits: string[] | null;
  is_active: boolean;
  display_order: number;
  viewer_count: number;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductInsert {
  title: string;
  slug: string;
  description: string;
  category_id?: string | null;
  origin: string;
  in_stock?: boolean;
  sku?: string | null;
  image_url: string;
  images?: string[] | null;
  featured?: boolean;
  new_arrival?: boolean;
  specifications?: Record<string, any> | null;
  benefits?: string[] | null;
  is_active?: boolean;
  display_order?: number;
  viewer_count?: number;
  rating?: number;
  review_count?: number;
}

export interface ProductUpdate {
  title?: string;
  slug?: string;
  description?: string;
  category_id?: string | null;
  origin?: string;
  in_stock?: boolean;
  sku?: string | null;
  image_url?: string;
  images?: string[] | null;
  featured?: boolean;
  new_arrival?: boolean;
  specifications?: Record<string, any> | null;
  benefits?: string[] | null;
  is_active?: boolean;
  display_order?: number;
  viewer_count?: number;
  rating?: number;
  review_count?: number;
}

// Newsletter Subscription Types
export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export interface NewsletterSubscriptionInsert {
  email: string;
  is_active?: boolean;
}

export interface NewsletterSubscriptionUpdate {
  email?: string;
  is_active?: boolean;
}

// Contact Message Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessageInsert {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status?: 'unread' | 'read' | 'replied' | 'archived';
  is_archived?: boolean;
}

export interface ContactMessageUpdate {
  name?: string;
  email?: string;
  phone?: string | null;
  subject?: string;
  message?: string;
  status?: 'unread' | 'read' | 'replied' | 'archived';
  is_archived?: boolean;
}

// Admin Data Types
// Note: Password field excluded from Row interface for security
export interface AdminData {
  id: string;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface AdminDataInsert {
  username: string;
  password_hash: string;
}

export interface AdminDataUpdate {
  username?: string;
  password_hash?: string;
}
