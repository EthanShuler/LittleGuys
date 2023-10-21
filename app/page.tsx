import { Container, SimpleGrid } from '@mantine/core';
import { createServerSupabaseClient } from '@/supabase';
import { GuyCard } from '@/components/GuyCard/GuyCard';
import myImage from './myImage.png';

export default async function HomePage() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.from('littleguy').select('*');

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {data?.map(guy => (
          <GuyCard key={guy.id} name={guy.name} image={myImage} id={guy.id} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
