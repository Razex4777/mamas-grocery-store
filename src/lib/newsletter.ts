import { supabase } from './supabase';
import type { NewsletterSubscription, NewsletterSubscriptionInsert } from './database.types';

/**
 * Subscribe an email to the newsletter
 * Returns { success: true, message } on success
 * Returns { success: false, message } on error
 */
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Check if already subscribed
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', email.toLowerCase())
      .single() as { data: NewsletterSubscription | null; error: any };

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (email doesn't exist)
      console.error('Error checking subscription:', checkError);
      return { success: false, message: 'Failed to check subscription status' };
    }

    if (existing) {
      if (existing.is_active) {
        return { success: false, message: 'This email is already subscribed!' };
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscriptions')
          .update({ is_active: true })
          .eq('email', email.toLowerCase()) as { error: any };

        if (updateError) {
          console.error('Error reactivating subscription:', updateError);
          return { success: false, message: 'Failed to reactivate subscription' };
        }

        return { success: true, message: 'Welcome back! Your subscription has been reactivated.' };
      }
    }

    // Create new subscription
    const newSubscription: NewsletterSubscriptionInsert = {
      email: email.toLowerCase(),
      is_active: true,
    };

    const { error: insertError } = await supabase
      .from('newsletter_subscriptions')
      .insert(newSubscription) as { error: any };

    if (insertError) {
      console.error('Error subscribing:', insertError);
      return { success: false, message: 'Failed to subscribe. Please try again.' };
    }

    return { success: true, message: 'Thank you for subscribing! Check your inbox for confirmation.' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
}

/**
 * Fetch all newsletter subscriptions (for admin dashboard)
 */
export async function fetchNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false }) as { data: NewsletterSubscription[] | null; error: any };

    if (error) {
      console.error('Error fetching newsletter subscriptions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching subscriptions:', error);
    return [];
  }
}

/**
 * Fetch only active newsletter subscriptions
 */
export async function fetchActiveSubscriptions(): Promise<NewsletterSubscription[]> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false }) as { data: NewsletterSubscription[] | null; error: any };

    if (error) {
      console.error('Error fetching active subscriptions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching active subscriptions:', error);
    return [];
  }
}

/**
 * Delete a newsletter subscription (for admin)
 */
export async function deleteNewsletterSubscription(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting subscription:', error);
      return { success: false, message: 'Failed to delete subscription' };
    }

    return { success: true, message: 'Subscription deleted successfully' };
  } catch (error) {
    console.error('Unexpected error deleting subscription:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
}

/**
 * Deactivate a newsletter subscription (soft delete)
 */
export async function deactivateNewsletterSubscription(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .update({ is_active: false })
      .eq('id', id) as { error: any };

    if (error) {
      console.error('Error deactivating subscription:', error);
      return { success: false, message: 'Failed to deactivate subscription' };
    }

    return { success: true, message: 'Subscription deactivated successfully' };
  } catch (error) {
    console.error('Unexpected error deactivating subscription:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
}

/**
 * Get newsletter subscription statistics
 */
export async function getNewsletterStats(): Promise<{
  total: number;
  active: number;
  inactive: number;
}> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('is_active') as { data: { is_active: boolean }[] | null; error: any };

    if (error) {
      console.error('Error fetching newsletter stats:', error);
      return { total: 0, active: 0, inactive: 0 };
    }

    const total = data?.length || 0;
    const active = data?.filter(sub => sub.is_active).length || 0;
    const inactive = total - active;

    return { total, active, inactive };
  } catch (error) {
    console.error('Unexpected error fetching stats:', error);
    return { total: 0, active: 0, inactive: 0 };
  }
}
