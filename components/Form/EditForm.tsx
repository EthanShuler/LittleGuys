'use client';

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useDisclosure, randomId } from '@mantine/hooks';
import { Modal, Button, TextInput, Textarea, Flex, ActionIcon, Group, Text, Divider } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import type { Tables } from '@/lib/database.types';

interface EditFormProps {
  session: Session | null;
  littleGuy: Tables<'littleguy'>;
  guyCustomFields: Tables<'custom_field'>[] | null;
}

export default function EditForm({ session, littleGuy, guyCustomFields }: EditFormProps) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const supabase = createClientComponentClient();
  const user = session?.user;

  async function updateLittleGuy({
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
    customFields: Tables<'custom_field'>[] | null;
  }) {
    const { error } = await supabase.from('littleguy').update({
      name,
      description,
      strength,
      weakness,
      pose,
      found,
      user_id: user?.id,
      image_url: littleGuy.image_url,
    }).eq('id', littleGuy.id);
    if (error) throw new Error(error.message);

    if (customFields) {
      const customFieldReq = customFields?.map(cf => {
        const customFieldWithGuyId = {
          name: cf.name,
          value: cf.value,
          littleguy_id: littleGuy.id,
          user_id: user?.id,
        };
        return customFieldWithGuyId;
      });
        const { error: deleteError } = await supabase.from('custom_field').delete().eq('littleguy_id', littleGuy.id);
        if (deleteError) throw new Error(deleteError.message);
        const { error: customError } = await supabase.from('custom_field').insert(customFieldReq);
      if (customError) throw new Error(customError.message);
    }
    close();
    router.refresh();
  }

  const form = useForm({
    initialValues: {
      name: littleGuy.name ?? '',
      description: littleGuy.description ?? '',
      strength: littleGuy.strength ?? '',
      weakness: littleGuy.weakness ?? '',
      pose: littleGuy.pose ?? '',
      found: littleGuy.found ?? '',
      customFields: guyCustomFields,
    },
  });

  const customFields = form.values.customFields?.map((item, index) => (
    <Flex
      gap="md"
      key={index}
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
    <>
      <Modal opened={opened} onClose={close} title="Edit">
        <form onSubmit={form.onSubmit(updateLittleGuy)}>
          <TextInput
            withAsterisk
            label="Name"
            required
            placeholder="Name"
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

          {customFields ? (
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
      </Modal>

      <Button onClick={open}>Edit {littleGuy.name}</Button>
    </>
  );
}
