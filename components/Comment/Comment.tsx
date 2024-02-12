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
  const formatDate = (created: string) => {
    const date = new Date(created);
    const hours = (date.getHours() + 24) % 12 || 12;
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const am_pm = date.getHours() > 11 ? 'PM' : 'AM';
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} @ ${hours}:${minutes} ${am_pm}`;
  };

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
            {formatDate(createdAt)}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <Text>{comment}</Text>
      </TypographyStylesProvider>
    </Paper>
  );
}
