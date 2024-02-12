'use client';

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Autocomplete,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from './Header.module.css';

import type { Database } from '@/lib/database.types';

const links = [
  { link: '/', label: 'The Guys' },
  { link: '/create', label: 'Add Your Little Guy' },
  { link: '/learn', label: 'Learn' },
];

export default function Header({ session }: { session: Session | null }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </a>
  ));

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">

          <Group h="100%" gap={10} visibleFrom="sm">
            {items}
            <Autocomplete
              className={classes.search}
              placeholder="Search"
              leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
              data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
              visibleFrom="xs"
            />
          </Group>

          <Group visibleFrom="sm">
            { session
            ? <Button onClick={handleLogout}>Log out</Button>
            : <Button variant="default" component={Link} href="/auth">Log in</Button> }
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Little Guys"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {items}
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            px="md"
            py="sm"
          />

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
          { session
            ? <Button onClick={handleLogout}>Log out</Button>
            : <Button onClick={closeDrawer} variant="default" component={Link} href="/auth">Log in</Button> }
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
