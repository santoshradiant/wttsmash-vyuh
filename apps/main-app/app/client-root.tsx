'use client';

import { NextNavigationPlugin } from '@/plugins/next-navigation-plugin';
import { RouterProvider } from '@/plugins/router-provider';
import { PluginDescriptor, VyuhProvider } from '@vyuh/react-core';
import { DefaultContentPlugin } from '@vyuh/react-extension-content';

import { system } from '@vyuh/react-feature-system';
import { SanityContentProvider } from '@vyuh/react-plugin-content-provider-sanity';
import { wtt } from 'react-feature-wtt';
import { ReactNode } from 'react';

import '@/app/globals.css';

const sanityProvider = new SanityContentProvider({
  projectId: "wuudd5ny",//process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",//process.env.NEXT_PUBLIC_SANITY_DATASET!,
  perspective: 'drafts',
  useCdn: false,
  token: "skvWosk0TAjbDxZtj4No3vIsdy5SR0mTratS8mV79Mb9MQs28vbzB4QBXFcJumfFrmPPhEd1Ia4h3CK1OtEdCMdRHqv5QktTAfxBP6XovQGp3EZBc2gptWPCsPMEl52PMs0hYhbkdKV6qGetVSkPMTAXsJCCvr2ooRmtAd71xHx7J53wHvJO"//process.env.NEXT_PUBLIC_SANITY_TOKEN!,
});

const plugins = new PluginDescriptor({
  content: new DefaultContentPlugin(sanityProvider),
  navigation: new NextNavigationPlugin(),
});

/**
 * Feature configuration
 * Returns all features used in the application
 */
const features = () => [system, wtt];

export function ClientRoot({ children }: { children: ReactNode }) {
  return (
    <VyuhProvider features={features} plugins={plugins}>
      <RouterProvider>{children}</RouterProvider>
    </VyuhProvider>
  );
}
