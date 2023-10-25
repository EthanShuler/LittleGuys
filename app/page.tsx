import { Container, SimpleGrid } from '@mantine/core';
import { createServerSupabaseClient } from '@/supabase';
import { GuyCard } from '@/components/GuyCard/GuyCard';

export default async function HomePage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('littleguy').select('*, profile(*)');

  if (error) {
    return <></>;
  }

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {data.map(guy => guy.profile ? (
          <GuyCard
            key={guy.id}
            id={guy.id}
            name={guy.name}
            userId={guy.profile?.id}
            userAvatar={guy.profile?.avatar_url}
            userName={guy.profile?.full_name}
          />
        )
          : <></>
        )}
      </SimpleGrid>
    </Container>
  );
}
