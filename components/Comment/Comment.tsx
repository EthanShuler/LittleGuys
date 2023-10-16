import { Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import classes from './Comment.module.css';

interface Comment {
  name: string;
  image: string;
  comment: string;
}

export function Comment({ name, image, comment }: Comment) {
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar
          src={image}
          alt={name}
          radius="xl"
        />
        <div>
          <Text fz="sm">{name}</Text>
          <Text fz="xs" c="dimmed">
            10 minutes ago
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <Text>{comment}</Text>
      </TypographyStylesProvider>
    </Paper>
  );
}
