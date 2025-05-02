'use client';

import { NavigationPlugin } from '@vyuh/react-core';
import { useRouter } from 'next/navigation';

/**
 * Next.js implementation of NavigationPlugin
 */
export class NextNavigationPlugin extends NavigationPlugin {
  private router: ReturnType<typeof useRouter> | null = null;

  constructor() {
    super('vyuh.plugin.navigation.next', 'Next.js Navigation Plugin');
  }

  /**
   * Set the Next.js router instance
   * This should be called from a component that has access to the router
   */
  setRouter(router: ReturnType<typeof useRouter>): void {
    this.router = router;
  }

  push(url: string): void {
    if (!this.router) {
      console.error(
        'Next.js router not initialized. Make sure to call setRouter() first.',
      );
      return;
    }
    this.router.push(url);
  }

  replace(url: string): void {
    if (!this.router) {
      console.error(
        'Next.js router not initialized. Make sure to call setRouter() first.',
      );
      return;
    }
    this.router.replace(url);
  }

  back(): void {
    if (!this.router) {
      console.error(
        'Next.js router not initialized. Make sure to call setRouter() first.',
      );
      return;
    }
    this.router.back();
  }

  getCurrentPath(): string {
    // Next.js doesn't provide a direct way to get the current path in the App Router
    // We use window.location as a fallback
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  }

  async init(): Promise<void> {
  }

  async dispose(): Promise<void> {
  }
}
