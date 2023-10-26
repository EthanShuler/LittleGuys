'use client';

import { useRouter } from 'next/navigation';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { TextInput, Button, Paper, Group, Container, ActionIcon, Text, Divider, Textarea, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';

interface customField {
  name: string;
  value: string;
  key: string;
}

export default function CreateForm({ session }: { session: Session | null }) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const user = session?.user;

  async function createLittleGuy({
    name,
    description,
    strength,
    weakness,
    pose,
    found,
    customFields,
  }: {
    name: string;
    description: string;
    strength: string;
    weakness: string;
    pose: string;
    found: string;
    customFields: customField[] | null
  }) {
    const { data, error } = await supabase.from('littleguy').insert({
      name, description, strength, weakness, pose, found, user_id: user?.id,
    }).select();
    if (error) throw new Error(error.message);

    if (customFields) {
      const customFieldReq = customFields?.map(cf => {
        const customFieldWithGuyId = {
          name: cf.name,
          value: cf.value,
          littleguy_id: data[0].id,
          user_id: user?.id,
        };
        return customFieldWithGuyId;
      });
      const { error: customError } = await supabase.from('custom_field').insert(customFieldReq);
      if (customError) throw new Error(customError.message);
    }
    router.push('/');
  }

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      strength: '',
      weakness: '',
      pose: '',
      found: '',
      customFields: [{ name: '', value: '', key: randomId() }],
    },
  });

  const customFields = form.values.customFields.map((item, index) => (
    <Flex
      gap="md"
      key={item.key}
      mt="xs"
      direction={{ base: 'column', sm: 'row' }}
    >
      <TextInput
        required
        placeholder="Custom Field Name"
        {...form.getInputProps(`customFields.${index}.name`)}
        style={{ flex: 1 }}
      />
      <TextInput
        placeholder="Custom Field Value"
        {...form.getInputProps(`customFields.${index}.value`)}
        style={{ flex: 2 }}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('customFields', index)}>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Flex>
  ));

  return (
    <Paper shadow="sm" p="lg" m="xl">
      <Container>
        <form onSubmit={form.onSubmit(createLittleGuy)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Name"
            required
            w={{ base: '100%', sm: '50%' }}
            {...form.getInputProps('name')}
          />
          <Textarea label="Description" placeholder="Description" {...form.getInputProps('description')} />
          <Flex gap={{ base: 'xs', sm: 'md' }} w="100%" direction={{ base: 'column', sm: 'row' }}>
            <TextInput label="Strength" placeholder="Strength" {...form.getInputProps('strength')} w={{ base: '100%', sm: '50%' }} />
            <TextInput label="Weakness" placeholder="Weakness" {...form.getInputProps('weakness')} w={{ base: '100%', sm: '50%' }} />
          </Flex>
          <Flex gap={{ base: 'xs', sm: 'md' }} w="100%" direction={{ base: 'column', sm: 'row' }}>
            <TextInput label="Pose" placeholder="Pose" {...form.getInputProps('pose')} w={{ base: '100%', sm: '50%' }} />
            <TextInput label="Found" placeholder="Found" {...form.getInputProps('found')} w={{ base: '100%', sm: '50%' }} />
          </Flex>

          <Divider my="lg" label="Custom Fields" labelPosition="center" />

          {customFields.length > 0 ? (
            <Group mb="xs" visibleFrom="sm">
              <Text fw="500" size="sm" style={{ flex: 1 }}>
                Name
              </Text>
              <Text fw="500" size="sm" style={{ flex: 2 }}>
                Value
              </Text>
            </Group>
          ) : (
            <Text c="dimmed" ta="center">No custom fields...</Text>
          )}

          {customFields}

          <Group justify="center" mt="md">
            <Button onClick={() => form.insertListItem('customFields', { name: '', value: '', key: randomId() })}>
              Add Custom Field
            </Button>
          </Group>

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Container>
    </Paper>
  );
}
