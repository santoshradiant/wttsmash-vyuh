import { defineField, defineType } from 'sanity';

export const playersApiConfig = defineType({
  name: 'wtt.apiConfig.playersTable',
  type: 'object',
  title: 'Players API Configuration',
  groups: [
    { name: 'basic', title: 'Basic Information' },
    { name: 'categories', title: 'Player Categories' },
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'eventId',
      type: 'string',
      title: 'Event ID',
      group: 'basic',
      description: 'Unique identifier for the event',
    }),

    // Player Categories Configuration
    defineField({
      name: 'enabledCategories',
      type: 'array',
      title: 'Enabled Player Categories',
      group: 'categories',
      description: 'Select which player categories to display',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'All Players', value: 'all_players' },
          { title: 'Men\'s Singles', value: 'mens_singles' },
          { title: 'Women\'s Singles', value: 'womens_singles' },
          { title: 'Men\'s Doubles', value: 'mens_doubles' },
          { title: 'Women\'s Doubles', value: 'womens_doubles' },
          { title: 'Mixed Doubles', value: 'mixed_doubles' },
        ],
        layout: 'grid',
      },
      initialValue: ['all_players', 'mens_singles', 'womens_singles'],
    }),
  ],
  preview: {
    select: {
      eventId: 'eventId',
      categories: 'enabledCategories',
    },
    prepare({ eventId, categories = [] }) {
      // Format categories for display
      const categoryNames = {
        all_players: 'ALL',
        mens_singles: 'MS',
        womens_singles: 'WS',
        mens_doubles: 'MD',
        womens_doubles: 'WD',
        mixed_doubles: 'XD',
      };

      const formattedCategories = categories
        .map((cat: string) => categoryNames[cat as keyof typeof categoryNames] || cat)
        .join(', ');

      return {
        title: eventId ? `Event: ${eventId}` : 'Players Configuration',
        subtitle: `Categories: ${formattedCategories || 'None'}`,
      };
    },
  },
});
