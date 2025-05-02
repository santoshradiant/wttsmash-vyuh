import {
  BuiltContentSchemaBuilder,
  DefaultFieldsModifier,
  FeatureDescriptor,
} from '@vyuh/sanity-schema-core';
import {
  APIContentDescriptor,
  RouteDescriptor,
  VideoDescriptor,
} from '@vyuh/sanity-schema-system';
import event from './documents/event';
import siteSettings from './documents/siteSettings';
import venue from './documents/venue';
import { smashLayout } from './layouts/smash';
import { smashVideoLayout } from './layouts/video';
import { playersApiConfig } from './objects/playersApiConfig';

export const wtt = new FeatureDescriptor({
  name: 'wtt',
  title: 'WTT',
  description: 'World Table Tennis Federation',
  contents: [
    new RouteDescriptor({
      layouts: [smashLayout, smashVideoLayout],
    }),
    new APIContentDescriptor({
      configurations: [playersApiConfig],
    }),
    new VideoDescriptor({
      layouts: [smashVideoLayout],
    }),
  ],
  contentSchemaBuilders: [
    new BuiltContentSchemaBuilder(siteSettings),
    new BuiltContentSchemaBuilder(event),
    new BuiltContentSchemaBuilder(venue),
    new BuiltContentSchemaBuilder(playersApiConfig),
  ],
  contentSchemaModifiers: [
    new DefaultFieldsModifier({
      excludedSchemaTypes: [
        { type: siteSettings.name },
        { type: venue.name },
        { type: event.name },
        { type: playersApiConfig.name },
      ],
    }),
  ],
});
