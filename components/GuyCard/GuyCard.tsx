import { Card, Image, Text, AspectRatio, Group, Avatar } from '@mantine/core';
import NextImage from 'next/image';
import classes from './GuyCard.module.css';
import image from './myImage.png';
import type { Tables } from '@/lib/database.types';

interface GuyCardProps {
  littleGuy: Tables<'littleguy'>;
}

export function GuyCard({ littleGuy }: GuyCardProps) {
  const guyUrl = `/littleguy/${littleGuy.id}`;
  const profileUrl = `/profile/${littleGuy.owner}`;
  return (
    <Card
      p="md"
      radius="md"
      component="a"
      href={guyUrl}
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
        alt="name"
        radius="xl"
        component="a"
        href={profileUrl}
      />
        <Text className={classes.title} mt={5}>
          {littleGuy.name}
        </Text>
      </Group>
    </Card>
  );
}
