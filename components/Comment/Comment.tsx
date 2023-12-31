import { Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import classes from './Comment.module.css';

interface Comment {
  name: string | null;
  image: string | null;
  comment: string;
  userId: string;
  createdAt: string;
}

export function Comment({ name, image, comment, userId, createdAt }: Comment) {
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar
          component="a"
          href={`/profile/${userId}`}
          src={image}
          alt={name || 'unkown'}
          radius="xl"
        />
        <div>
          <Text fz="sm">{name}</Text>
          <Text fz="xs" c="dimmed">
            {createdAt}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <Text>{comment}</Text>
      </TypographyStylesProvider>
    </Paper>
  );
}
