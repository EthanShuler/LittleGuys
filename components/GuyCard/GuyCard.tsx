import { Card, Image, Text, AspectRatio, Group } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import NextImage, { StaticImageData } from 'next/image';
import classes from './GuyCard.module.css';

interface LittleGuy {
  name: string;
  image: StaticImageData;
}

export function GuyCard(props:LittleGuy) {
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
          src={props.image}
          alt="My image"
          // fit="contain"
        />
      </AspectRatio>
      <Group justify="space-between">
        <IconUserCircle />
        <Text className={classes.title} mt={5}>
          {props.name}
        </Text>
      </Group>
    </Card>
  );
}
