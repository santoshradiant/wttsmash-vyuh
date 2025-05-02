import { defineField, defineType } from 'sanity';

export const smashVideoLayout = defineType({
  name: 'wtt.video.layout.smash',
  type: 'object',
  title: 'Smash Video Layout',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Default Smash Video Layout',
      readOnly: true,
    }),
  ],
});
