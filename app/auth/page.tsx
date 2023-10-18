import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/supabase';
import Auth from '@/components/Auth/Auth';

export default async function page() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    return redirect('/');
  }
  return (
    <Auth />
  );
}
