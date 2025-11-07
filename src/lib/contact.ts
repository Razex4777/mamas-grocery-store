import { supabase } from './supabase';
import type { ContactMessage, ContactMessageInsert, ContactMessageUpdate } from './database.types';
import { requireAdmin } from './auth';

/**
 * Submit a contact form message (public endpoint)
 */
export async function submitContactMessage(data: ContactMessageInsert): Promise<{ success: boolean; message: string; data?: ContactMessage }> {
  try {
    const { data: insertedMessage, error } = await supabase
      .from('contact_messages')
      .insert(data)
      .select()
      .single() as { data: ContactMessage | null; error: any };

    if (error) {
      console.error('Error submitting contact message:', error);
      return { success: false, message: 'Failed to submit message. Please try again.' };
    }

    return { 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: insertedMessage || undefined
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

/**
 * Fetch all contact messages (admin only - requires authentication)
 */
export async function fetchContactMessages(): Promise<ContactMessage[]> {
  try {
    // Require admin authorization
    const { authorized } = await requireAdmin();
    if (!authorized) {
      console.warn('Unauthorized attempt to fetch contact messages');
      return [];
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false }) as { data: ContactMessage[] | null; error: any };

    if (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }

    return (data as ContactMessage[]) || [];
  } catch (error) {
    console.error('Unexpected error:', error);
    return [];
  }
}

/**
 * Update contact message status (admin only - requires authentication)
 */
export async function updateContactMessage(id: string, updates: ContactMessageUpdate): Promise<{ success: boolean; message: string }> {
  try {
    // Require admin authorization
    const { authorized, username } = await requireAdmin();
    if (!authorized) {
      console.warn('Unauthorized attempt to update contact message');
      return { success: false, message: 'Unauthorized: Admin access required.' };
    }

    // Verify message exists before updating
    const { data: existingMessage, error: fetchError } = await supabase
      .from('contact_messages')
      .select('id')
      .eq('id', id)
      .single() as { data: { id: string } | null; error: any };

    if (fetchError || !existingMessage) {
      console.error('Message not found:', id);
      return { success: false, message: 'Message not found.' };
    }

    // Perform the update
    const { error } = await supabase
      .from('contact_messages')
      .update(updates)
      .eq('id', id) as { error: any };

    if (error) {
      console.error('Error updating contact message:', error);
      return { success: false, message: 'Failed to update message.' };
    }

    console.log(`Message ${id} updated by admin: ${username}`);
    return { success: true, message: 'Message updated successfully.' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

/**
 * Delete a contact message (admin only - soft delete by archiving)
 */
export async function deleteContactMessage(id: string): Promise<{ success: boolean; message: string }> {
  try {
    // Require admin authorization
    const { authorized, username } = await requireAdmin();
    if (!authorized) {
      console.warn('Unauthorized attempt to delete contact message');
      return { success: false, message: 'Unauthorized: Admin access required.' };
    }

    // Verify message exists before deletion
    const { data: existingMessage, error: fetchError } = await supabase
      .from('contact_messages')
      .select('id, is_archived')
      .eq('id', id)
      .single() as { data: { id: string; is_archived: boolean } | null; error: any };

    if (fetchError || !existingMessage) {
      console.error('Message not found:', id);
      return { success: false, message: 'Message not found.' };
    }

    // Soft delete: archive the message instead of hard deleting
    const { error } = await supabase
      .from('contact_messages')
      .update({ 
        is_archived: true,
        status: 'archived'
      })
      .eq('id', id) as { error: any };

    if (error) {
      console.error('Error archiving contact message:', error);
      return { success: false, message: 'Failed to archive message.' };
    }

    console.log(`Message ${id} archived by admin: ${username}`);
    return { success: true, message: 'Message archived successfully.' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

/**
 * Get contact message statistics (admin only - uses aggregated query)
 */
export async function getContactStats(): Promise<{ total: number; unread: number; read: number; replied: number; archived: number }> {
  try {
    // Require admin authorization
    const { authorized } = await requireAdmin();
    if (!authorized) {
      console.warn('Unauthorized attempt to fetch contact stats');
      return { total: 0, unread: 0, read: 0, replied: 0, archived: 0 };
    }

    // Use aggregated count queries instead of fetching all rows
    const [totalResult, unreadResult, readResult, repliedResult, archivedResult] = await Promise.all([
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'read'),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'replied'),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'archived'),
    ]);

    const stats = {
      total: totalResult.count || 0,
      unread: unreadResult.count || 0,
      read: readResult.count || 0,
      replied: repliedResult.count || 0,
      archived: archivedResult.count || 0,
    };

    return stats;
  } catch (error) {
    console.error('Unexpected error:', error);
    return { total: 0, unread: 0, read: 0, replied: 0, archived: 0 };
  }
}
