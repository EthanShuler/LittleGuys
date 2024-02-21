import { Card, Image, Text, AspectRatio, Group, Avatar, Box, Tooltip } from '@mantine/core';
import NextImage from 'next/image';
import classes from './GuyCard.module.css';

interface GuyCardProps {
  id: number;
  name: string;
  userId: string | null;
  userAvatar: string | null;
  userName: string | null;
  imageUrl: string | null;
}

export function GuyCard({ id, name, userId, userAvatar, userName, imageUrl }: GuyCardProps) {
  const guyUrl = `/littleguy/${id}`;
  const profileUrl = `/profile/${userId}`;
  return (
    <Card
      p="md"
      radius="md"
      withBorder
      className={classes.card}
      bg="blue-gray.0"
    >
      <Box component="a" href={guyUrl}>
        <AspectRatio ratio={1920 / 1080}>
          <Image
            component={NextImage}
            src={imageUrl}
            alt="My image"
            fill
          />
        </AspectRatio>
      </Box>
      <Group justify="space-between" mt="xs" c="black">
        { userAvatar ?
        <Tooltip label={userName}>
          <Avatar
            src={userAvatar}
            alt="name"
            radius="xl"
            component="a"
            href={profileUrl}
          />
        </Tooltip>
        : <></> }
        <Text className={classes.title} mt={5}>
          {name}
        </Text>
      </Group>
    </Card>
  );
}
