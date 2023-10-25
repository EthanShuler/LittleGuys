import { SimpleGrid, Image, Text, Title, Grid, GridCol, Container, Stack, Paper, Avatar, Box, ScrollArea, Divider } from '@mantine/core';
import NextImage from 'next/image';
import { Session } from '@supabase/auth-helpers-nextjs';
import { createServerSupabaseClient } from '@/supabase';
import myImage from './myImage.png';
import { Comment } from '@/components/Comment/Comment';
import { CommentForm } from '@/components/Comment/CommentForm';

import type { Tables } from '@/lib/database.types';

interface StatisticProps {
  title: string;
  description: string | null;
}

const Statistic = ({ title, description }: StatisticProps) => (
  <Grid py="1rem">
    <GridCol span={2}>
      <Title order={3}>{title}:</Title>
    </GridCol>
    <GridCol span={10}>
      <Text>{description}</Text>
    </GridCol>
  </Grid>
);

interface DescriptionProps {
  littleGuy: Tables<'littleguy'>;
  customFields: Tables<'custom_field'>[] | null;
}

const Description = ({ littleGuy, customFields }: DescriptionProps) => (
  <Box h="50%">
    <Title order={1} mb={20}>{littleGuy.name}</Title>
    <Statistic key={littleGuy.id} title="Description" description={littleGuy.description} />
    <Statistic key={littleGuy.id} title="Strength" description={littleGuy.description} />
    <Statistic key={littleGuy.id} title="Weakness" description={littleGuy.description} />
    <Statistic key={littleGuy.id} title="Pose" description={littleGuy.description} />
    <Statistic key={littleGuy.id} title="Found" description={littleGuy.description} />

    {customFields?.map(customField => (
      <Statistic
        key={customField.id}
        title={customField.name}
        description={customField.value}
      />
    ))}
  </Box>
);

const ImageContainer = ({ profile }: { profile: Tables<'profile'> }) => (
  <>
    <Grid align="center" mt="lg">
      <GridCol span={2}>
        <Avatar
          ml="xl"
          src={profile.avatar_url}
          alt="name"
          radius="xl"
          component="a"
          href={`/profile/${profile.id}`}
        />
      </GridCol>
      <GridCol span={10}>
        <Title order={2}>{profile.full_name}</Title>
      </GridCol>
    </Grid>
    <Image
      mt="lg"
      component={NextImage}
      src={myImage}
      fit="contain"
      alt="abc"
      h="50%"
    />
  </>
);

interface Profile {
  profile: Tables<'profile'> | null
}

interface CommentContainerProps {
  comments: (Tables<'comment'> & Profile)[] | null;
  session: Session | null;
  littleGuyId: number;
}

const CommentContainer = ({ comments, session, littleGuyId }: CommentContainerProps) => (
  <Paper shadow="md" radius="md" withBorder p="sm" mx="lg" mb="xl" h="50%">

    <CommentForm session={session} littleguy_id={littleGuyId} />

      <Container mt="sm">
      {!comments || comments.length < 1
      ? <Divider label="No comments" labelPosition="center" />
      :
        <ScrollArea h={500}>
        <Stack>
          {comments.sort().map(comment => (
            comment.profile ?
            <Comment
              key={comment.id}
              name={comment.profile.full_name}
              image={comment.profile.avatar_url}
              comment={comment.contents}
              userId={comment.profile?.id}
              createdAt={comment.created_at}
            />
            : <></>
          ))}
        </Stack>
        </ScrollArea> }
      </Container>
  </Paper>
);

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('littleguy').select('*, profile(*)').eq('id', id);
  if (error) {
    return <></>;
  }
  const guy = data[0];
  const { data: customFields } = await supabase.from('custom_field').select('*').eq('littleguy_id', guy.id);
  const { data: comments } = await supabase.from('comment').select('*, profile(*)').eq('littleguy_id', guy.id).order('created_at', { ascending: false });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }} h="100%">
        <Box h="100%" bg="gray">
          {data[0].profile ? <ImageContainer profile={data[0].profile} /> : <></>}
        </Box>
        <Box>
          <Stack justify="space-between" h="100%">
            <Description littleGuy={guy} customFields={customFields} />
            <CommentContainer comments={comments} session={session} littleGuyId={id} />
          </Stack>
        </Box>
      </SimpleGrid>
    </>
  );
}
