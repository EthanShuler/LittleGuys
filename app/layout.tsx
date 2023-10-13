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
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShell
            header={{ height: 60 }}
          >
            <AppShellHeader>
              <Header />
            </AppShellHeader>
            <AppShellMain>
              { children }
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
