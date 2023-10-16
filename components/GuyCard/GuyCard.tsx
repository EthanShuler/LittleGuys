import { Card, Image, Text, AspectRatio, Group, Avatar } from '@mantine/core';
import NextImage, { StaticImageData } from 'next/image';
import classes from './GuyCard.module.css';

interface LittleGuy {
  name: string;
  image: StaticImageData;
}

export function GuyCard({ name, image }:LittleGuy) {
  return (
    <Card
      p="md"
      radius="md"
      component="a"
      href="/littleguy/1"
      withBorder
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image
          component={NextImage}
          src={image}
          alt="My image"
          // fit="contain"
        />
      </AspectRatio>
      <Group justify="space-between">
      <Avatar
        src="https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
        alt="name"
        radius="xl"
      />
        <Text className={classes.title} mt={5}>
          {name}
        </Text>
      </Group>
    </Card>
  );
}
