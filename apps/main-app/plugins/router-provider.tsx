'use client';

import { NextNavigationPlugin } from '@/plugins/next-navigation-plugin';
import { useVyuh } from '@vyuh/react-core';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Component that initializes the Next.js router for the NavigationPlugin
 */
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { plugins } = useVyuh();
  const routerInitialized = useRef(false);

  useEffect(() => {
    // Check if the navigation plugin is a NextNavigationPlugin
    if (
      plugins.navigation instanceof NextNavigationPlugin &&
      !routerInitialized.current
    ) {
      // Set the router instance
      (plugins.navigation as NextNavigationPlugin).setRouter(router);
      routerInitialized.current = true;
      console.log('Next.js router initialized for navigation plugin');
    }
  }, [router, plugins.navigation]);

  return <>{children}</>;
}
