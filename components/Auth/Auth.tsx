'use client';

import { useToggle } from '@mantine/hooks';
import {
  Text,
  Paper,
  Container,
  PaperProps,
  Anchor,
  Space,
} from '@mantine/core';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { GoogleButton } from './GoogleButton';

export default function Auth(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const supabase = createClientComponentClient();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // eslint-disable-next-line no-restricted-globals
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Container>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Little Guys, {type} with
        </Text>

        <GoogleButton radius="xl" onClick={handleLogin}>Google</GoogleButton>
        <Space />
        <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
          {type === 'register'
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </Anchor>
      </Paper>
    </Container>
  );
}
