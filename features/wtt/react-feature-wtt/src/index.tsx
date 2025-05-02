import {
  FeatureDescriptor,
  SystemReadyEventType,
  useVyuhStore,
} from '@vyuh/react-core';
import { ContentExtensionDescriptor } from '@vyuh/react-extension-content';
import { APIExtensionDescriptor } from '@vyuh/react-extension-api';
import {
  APIContentDescriptor,
  RouteDescriptor,
} from '@vyuh/react-feature-system';
import { Boxes } from 'lucide-react';

// Import and export the SmashLayout
import { SmashLayout } from './layouts/SmashLayout';
import { useWttStore } from './utils/store';
import { SiteSettings } from './utils/types';

// Import and export the API components
import { PlayersAPIConfiguration } from './api/PlayersAPIConfiguration';
import { PlayersGrid } from './api/components/PlayersGrid';
export { PlayersAPIConfiguration, PlayersGrid };

export const wtt = new FeatureDescriptor({
  name: 'wtt',
  title: 'WTT',
  description: 'World Table Tennis Federation',
  icon: <Boxes />,
  extensions: [
    new ContentExtensionDescriptor({
      contents: [
        new RouteDescriptor({
          layouts: [SmashLayout.typeDescriptor],
        }),

        new APIContentDescriptor({
          configurations: [PlayersAPIConfiguration.typeDescriptor],
        }),
      ],
    }),
  ],
  async init() {
    const { plugins } = useVyuhStore.getState();

    const settings: SiteSettings | undefined =
      await plugins.content.provider.fetchSingle(
        `*[_type == "wtt.siteSettings" && identifier.current == $identifier][0]`,
        {
          params: {
            identifier: 'saudi-smash',
          },
        },
      );

    if (settings) {
      useWttStore.setState({ settings });
    }
  },
});
