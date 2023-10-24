'use client';

import { TextInput, Button, Paper, Group, Container, ActionIcon, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';

export default function Page() {
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

  const handleSubmit = (values) => {
    console.log(values);
  };

  const customFields = form.values.customFields.map((item, index) => (
    <Group key={item.key} mt="xs" grow>
      <TextInput
        placeholder="Custom Field Name"
        {...form.getInputProps(`customFields.${index}.name`)}
      />
      <TextInput
        placeholder="Custom Field Value"
        {...form.getInputProps(`customFields.${index}.value`)}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('customFields', index)}>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  return (
    <Paper shadow="sm" p="lg" m="xl">
      <Container>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Name"
            required
            {...form.getInputProps('name')}
          />
          <TextInput label="Description" placeholder="Description" {...form.getInputProps('description')} />
          <TextInput label="Strength" placeholder="Strength" {...form.getInputProps('strength')} />
          <TextInput label="Weakness" placeholder="Weakness" {...form.getInputProps('weakness')} />
          <TextInput label="Pose" placeholder="Pose" {...form.getInputProps('pose')} />
          <TextInput label="Found" placeholder="Found" {...form.getInputProps('found')} />

          {customFields.length > 0 ? (
            <Group mb="xs">
              <Text fw="500" size="sm" style={{ flex: 1 }}>
                Name
              </Text>
              <Text fw="500" size="sm" style={{ flex: 1 }}>
                Value
              </Text>
            </Group>
          ) : (
            <Text c="dimmed" ta="center">No custom fields...</Text>
          )}

          { customFields }

          <Group justify="center" mt="md">
            <Button 
              onClick={() => 
                form.insertListItem('customFields', { name: '', value: '', key: randomId()})
              }
            >
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
