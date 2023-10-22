import { Container, SimpleGrid } from '@mantine/core';
import { createServerSupabaseClient } from '@/supabase';
import { GuyCard } from '@/components/GuyCard/GuyCard';

export default async function HomePage() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('littleguy').select('*');

  if (error) {
    return <></>;
  }

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {data.map(guy => (
          <GuyCard key={guy.id} littleGuy={guy} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
