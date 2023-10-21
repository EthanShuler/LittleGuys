import { SimpleGrid, Image, Text, Title, Grid, GridCol, Container, Stack, Paper, Input } from '@mantine/core';
import NextImage, { StaticImageData } from 'next/image';
import { IconUserCircle } from '@tabler/icons-react';
import { createServerSupabaseClient } from '@/supabase';
import classes from './Guy.module.css';
import myImage from './myImage.png';
import { Comment } from '@/components/Comment/Comment';

const stats = [
  {
    id: 0,
    title: 'Statiscitc 1',
    description: 'klasdjfl asjljlk jsdljlaskjl ksja lkjsaklj lswkaj floisajdfl j ljf jsald fkj ',
  },
  {
    id: 1,
    title: 'Statiscitc 1',
    description: 'klasdjfl asjljlk jsdljlaskjl ksja lkjsaklj lswkaj floisajdfl j ljf jsald fkj ',
  },
  {
    id: 2,
    title: 'Statiscitc 1',
    description: 'klasdjfl asjljlk jsdljlaskjl ksja lkjsaklj lswkaj floisajdfl j ljf jsald fkj ',
  },
];

const comments = [
  {
    id: 0,
    name: 'Bobby J',
    image: 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    comment: 'lskdjflj ljasldkf jlkjfl ksjdlksjd lskdj lksdlksdlf',
  },
  {
    id: 1,
    name: 'Bobby J',
    image: 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    comment: 'lskdjflj ljasldkf jlkjfl ksjdlksjd lskdj lksdlksdlf',
  },
  {
    id: 2,
    name: 'Bobby J',
    image: 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    comment: 'lskdjflj ljasldkf jlkjfl ksjdlksjd lskdj lksdlksdlf',
  },
  {
    id: 3,
    name: 'Bobby J',
    image: 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    comment: 'lskdjflj ljasldkf jlkjfl ksjdlksjd lskdj lksdlksdlf',
  },
];

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
  id: number;
  name: string;
  description: string | null;
}

const Description = (littleguy: DescriptionProps) => (
  <div className={classes.description}>
    <Title order={1} mb={20}>{littleguy.name}</Title>
    <Statistic key={littleguy.id} title="abc" description={littleguy.description} />
  </div>
);

interface ImageContainerProps {
  image: StaticImageData;
  alt: string;
}

const ImageContainer = ({ image, alt }: ImageContainerProps) => (
  <>
    <Grid align="center">
      <GridCol span={2}>
        <IconUserCircle width="6rem" height="6rem" stroke={1.5} />
      </GridCol>
      <GridCol span={10}>
        <Title order={1}>NAME</Title>
      </GridCol>
    </Grid>
    <Image
      component={NextImage}
      src={image}
      fit="contain"
      alt={alt}
    />
  </>
);

const CommentContainer = () => (
  <Paper shadow="md" radius="md" withBorder p="sm" mx="sm">
    <Input placeholder="Comment" />
    <Container className={classes.comments} mt="sm">
      <Stack>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            name={comment.name}
            image={comment.image}
            comment={comment.comment}
          />
        ))}
      </Stack>
    </Container>
  </Paper>
);

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('littleguy').select('*').eq('id', id);
  console.log(data);

  return data ? (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }} h="100%">
        <div className={classes.leftColumn}>
          <ImageContainer image={myImage} alt={data[0].name} />
        </div>
        <div>
          <Stack justify="space-between" h="100%">
            <Description id={data[0].id} name={data[0].name} description={data[0].description} />
            <CommentContainer />
          </Stack>
        </div>
      </SimpleGrid>
    </>
  ) : <></>;
}
