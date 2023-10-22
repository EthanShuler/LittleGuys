import { Container, SimpleGrid, Grid, GridCol } from '@mantine/core';
import { GuyCard } from '@/components/GuyCard/GuyCard';
import { createServerSupabaseClient } from '@/supabase';

import type { Tables } from '@/lib/database.types';

interface UserGuysProps {
  littleGuys: Tables<'littleguy'>[] | null;
}

const UserGuys = ({ littleGuys }: UserGuysProps) => (
    <Container>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {littleGuys?.map(guy => (
          <GuyCard key={guy.id} littleGuy={guy} />
        ))}
      </SimpleGrid>
    </Container>
  );

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('profile').select('*').eq('id', id);
  if (error) {
    return <></>;
  }
  const account = data[0];
  const { data: littleguys } = await supabase.from('littleguy').select('*').eq('owner', account.id);

  return (
    <Grid>
      <GridCol span={3}>
        <h1>hi</h1>
      </GridCol>
      <GridCol span={9}>
        <UserGuys littleGuys={littleguys} />
      </GridCol>
    </Grid>
  );
}
