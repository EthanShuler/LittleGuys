'use client';

import { useRouter } from 'next/navigation';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Textarea, Group, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSend } from '@tabler/icons-react';

import { Database } from '@/lib/database.types';

interface CommentFormProps {
  session: Session | null;
  littleguy_id: number;
}
export function CommentForm({ session, littleguy_id }: CommentFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const user = session?.user;

  async function createComment({ contents }: { contents: string }) {
    if (!user) {
      return;
    }
    const { error } = await supabase.from('comment').insert({
      contents, littleguy_id, user_id: user.id,
    });
    if (error) throw new Error(error.message);
    router.refresh();
  }

  const form = useForm({
    initialValues: {
      contents: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => {
      createComment(values);
      form.reset();
 })}>
      <Group justify="center">
        <Textarea
          required
          placeholder="Add a Comment"
          w={{ base: '80%', lg: '50%' }}
          {...form.getInputProps('contents')}
        />
        <ActionIcon color="blue" type="submit">
          <IconSend />
        </ActionIcon>
      </Group>
    </form>
  );
}
