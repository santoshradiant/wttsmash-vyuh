import { defineType } from 'sanity';

export const smashLayout = defineType({
  name: 'wtt.route.layout.smash',
  type: 'object',
  title: 'Smash Layout',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Default Smash Layout',
      readOnly: true,
    },
  ],
});
