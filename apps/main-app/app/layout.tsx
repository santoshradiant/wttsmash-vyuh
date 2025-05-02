import { ReactNode } from 'react';
import { ClientRoot } from './client-root';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Vyuh React Workspace</title>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
