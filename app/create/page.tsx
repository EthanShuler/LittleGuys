import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/supabase';
import CreateForm from '@/components/Form/CreateForm';

export default async function Page() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <CreateForm session={session} />
  );
}
