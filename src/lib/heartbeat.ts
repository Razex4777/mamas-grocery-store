import { supabase } from './supabase';

export interface ActivityHeartbeat {
  id: string;
  last_activity: string;
  activity_date: string;
  activity_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Update the activity heartbeat to keep Supabase project active
 * This prevents the project from being paused due to inactivity
 */
export async function updateHeartbeat(): Promise<void> {
  const { error } = await supabase.rpc('update_activity_heartbeat');
  
  if (error) {
    console.error('Error updating heartbeat:', error);
    throw error;
  }
}

/**
 * Get the latest activity heartbeat record
 */
export async function getLatestHeartbeat(): Promise<ActivityHeartbeat | null> {
  try {
    const { data, error } = await supabase
      .from('activity_heartbeat')
      .select('*')
      .order('activity_date', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching heartbeat:', error);
      return null;
    }

    return data as ActivityHeartbeat;
  } catch (error) {
    console.error('Failed to fetch heartbeat:', error);
    return null;
  }
}

/**
 * Get all activity heartbeat records (for history)
 */
export async function getAllHeartbeats(): Promise<ActivityHeartbeat[]> {
  try {
    const { data, error } = await supabase
      .from('activity_heartbeat')
      .select('*')
      .order('activity_date', { ascending: false })
      .limit(30); // Last 30 days

    if (error) {
      console.error('Error fetching heartbeats:', error);
      return [];
    }

    return (data as ActivityHeartbeat[]) || [];
  } catch (error) {
    console.error('Failed to fetch heartbeats:', error);
    return [];
  }
}

/**
 * Format date for display
 */
export function formatHeartbeatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

/**
 * Format datetime for display
 */
export function formatHeartbeatDateTime(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

/**
 * Calculate days since last activity
 */
export function daysSinceLastActivity(lastActivity: string): number {
  const lastDate = new Date(lastActivity);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
