import { SimpleGrid, Image, Text, Title, Container, Stack, Paper, Avatar, Box, ScrollArea, Divider, Group, AspectRatio } from '@mantine/core';
import NextImage from 'next/image';
import { Session } from '@supabase/auth-helpers-nextjs';
import { createServerSupabaseClient } from '@/supabase';
import { Comment } from '@/components/Comment/Comment';
import { CommentForm } from '@/components/Comment/CommentForm';
import EditForm from '@/components/Form/EditForm';

import type { Tables } from '@/lib/database.types';

interface StatisticProps {
  title: string;
  description: string | null;
}

const Statistic = ({ title, description }: StatisticProps) => (
  //TODO: change to GROUP - give LeftHand a fixed wth so right hand is aligned
  <Group py="1rem" c="white">
    <Title w={{ base: '40%' }} order={3}>{title}:</Title>
    <Text>{description}</Text>
  </Group>
);

interface DescriptionProps {
  littleGuy: Tables<'littleguy'>;
  customFields: Tables<'custom_field'>[] | null;
}

const Description = ({ littleGuy, customFields }: DescriptionProps) => (
  <Stack mih="50%" mx="xs">
    { littleGuy.description && <Statistic title="Description" description={littleGuy.description} /> }
    { littleGuy.strength && <Statistic title="Strength" description={littleGuy.strength} /> }
    { littleGuy.weakness && <Statistic title="Weakness" description={littleGuy.weakness} /> }
    { littleGuy.pose && <Statistic title="Pose" description={littleGuy.pose} /> }
    { littleGuy.found && <Statistic title="Found" description={littleGuy.found} /> }

    {customFields?.map(customField => (
      <Statistic
        key={customField.id}
        title={customField.name}
        description={customField.value}
      />
    ))}
  </Stack>
);

interface ImageContainerProps {
  profile: Tables<'profile'>;
  imageSrc: string | null;
}

const ImageContainer = ({ profile, imageSrc }: ImageContainerProps) => (
  <Box c="white">
    <Group mt="lg">
      <Avatar
        ml="xl"
        src={profile.avatar_url}
        alt="name"
        radius="xl"
        component="a"
        href={`/profile/${profile.id}`}
      />
      <Title order={2}>{profile.full_name}</Title>
    </Group>
    <AspectRatio ratio={1}>
      <Image
        mt="lg"
        mx="auto"
        component={NextImage}
        src={imageSrc}
        alt="abc"
        fill
      />
    </AspectRatio>
  </Box>
);

interface Profile {
  profile: Tables<'profile'> | null
}

interface CommentContainerProps {
  comments: (Tables<'comment'> & Profile)[] | null;
  session: Session | null;
  littleGuyId: number;
}

const CommentContainer = ({ comments, session, littleGuyId }: CommentContainerProps) => {
  const noCommentText = session?.user ? 'No comments' : 'You must log in to view comments';
  return (
    <Paper shadow="md" radius="md" p="sm" mx="lg" mb="xl" h="50%" bg="blue-gray.4">

      <CommentForm session={session} littleguy_id={littleGuyId} />

        <Container mt="sm">
        {!comments || comments.length < 1
        ? <Divider label={noCommentText} labelPosition="center" />
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
};

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
        <Box h="100%">
          {data[0].profile
            ? <ImageContainer profile={data[0].profile} imageSrc={guy.image_url} />
            : <></>}
        </Box>
        <Box>
          <Stack mih="100%">
            <Title mx="auto" order={1} mb={20} c="white">{guy.name}</Title>
            { session?.user.id === guy.user_id &&
              <EditForm littleGuy={guy} session={session} guyCustomFields={customFields} />
            }
            <Description littleGuy={guy} customFields={customFields} />
            <CommentContainer comments={comments} session={session} littleGuyId={id} />
          </Stack>
        </Box>
      </SimpleGrid>
    </>
  );
}
