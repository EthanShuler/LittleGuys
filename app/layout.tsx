import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import { createServerSupabaseClient } from '@/supabase';
import Header from '@/components/Header/Header';
import { theme } from '../theme';

export const metadata = {
  title: 'Little Guys',
  description: 'Who are the little guys hangin around?',
};

export default async function RootLayout({ children }: { children: any }) {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShell
            header={{ height: 60 }}
            h="100%"
          >
            <AppShellHeader>
              <Header session={session} />
            </AppShellHeader>
            <AppShellMain h="100%">
              { children }
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
