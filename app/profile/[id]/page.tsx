import { Container, SimpleGrid, Grid, GridCol, Avatar, Stack, Title } from '@mantine/core';
import { GuyCard } from '@/components/GuyCard/GuyCard';
import { createServerSupabaseClient } from '@/supabase';

import type { Tables } from '@/lib/database.types';

interface UserGuysProps {
  littleGuys: Tables<'littleguy'>[] | null;
}

const UserGuys = ({ littleGuys }: UserGuysProps) => (
    <Container pt="xl">
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        {littleGuys?.map(guy => (
          <GuyCard
            key={guy.id}
            id={guy.id}
            name={guy.name}
            userId={null}
            userAvatar={null}
            userName={null}
          />
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
  const { data: littleguys } = await supabase.from('littleguy').select('*').eq('user_id', account.id);

  return (
    <Grid>
      <GridCol span={{ base: 12, sm: 5, lg: 3 }} bg="blue">
        <Container pt="xl">
          <Stack>
            <Avatar
              src={account.avatar_url}
              alt="avatar"
              radius="xl"
            />
            <Title>{account.full_name}</Title>
          </Stack>
        </Container>
      </GridCol>
      <GridCol span={{ base: 12, sm: 7, lg: 9 }}>
        <UserGuys littleGuys={littleguys} />
      </GridCol>
    </Grid>
  );
}
