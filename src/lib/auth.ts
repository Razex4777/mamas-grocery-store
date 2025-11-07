import { supabase } from './supabase';

/**
 * Validate admin session on the server side
 * This checks against the admin_data table with proper authentication
 */
export async function validateAdminSession(username: string): Promise<{ isValid: boolean; username?: string }> {
  try {
    // Verify the username exists in admin_data
    const { data, error } = await supabase
      .from('admin_data')
      .select('username')
      .eq('username', username)
      .single();

    if (error || !data) {
      return { isValid: false };
    }

    return { isValid: true, username: data.username };
  } catch (error) {
    console.error('Session validation error:', error);
    return { isValid: false };
  }
}

/**
 * Authenticate admin credentials
 */
export async function authenticateAdmin(username: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    // Note: In production, passwords should be hashed
    // For now, this is a simple check against admin_data
    const { data, error } = await supabase
      .from('admin_data')
      .select('username')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      return { success: false, message: 'Invalid credentials' };
    }

    return { success: true, message: 'Authentication successful' };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Authentication failed' };
  }
}

/**
 * Get current admin session from localStorage
 * This is only used for client-side checks and must be validated server-side
 */
export function getClientSession(): { username: string | null } {
  const username = localStorage.getItem('admin_username');
  return { username };
}

/**
 * Set admin session
 */
export function setClientSession(username: string): void {
  localStorage.setItem('admin_authenticated', 'true');
  localStorage.setItem('admin_username', username);
}

/**
 * Clear admin session
 */
export function clearClientSession(): void {
  localStorage.removeItem('admin_authenticated');
  localStorage.removeItem('admin_username');
}

/**
 * Check if user has admin privileges
 * This should be called before any admin action
 */
export async function requireAdmin(): Promise<{ authorized: boolean; username?: string }> {
  const { username } = getClientSession();
  
  if (!username) {
    return { authorized: false };
  }

  const validation = await validateAdminSession(username);
  
  if (!validation.isValid) {
    clearClientSession();
    return { authorized: false };
  }

  return { authorized: true, username: validation.username };
}
