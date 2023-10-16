import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import { Header } from '@/components/Header/Header';
import { theme } from '../theme';

export const metadata = {
  title: 'Little Guys',
  description: 'Who are the little guys hangin around?',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
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
              <Header />
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
