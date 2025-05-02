import { Calendar } from 'lucide-react';
import { defineField, defineType } from 'sanity';

const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: Calendar,
  groups: [
    { name: 'basic', title: 'Basic Information' },
    { name: 'prizes', title: 'Prize Money & Ranking Points' },
    { name: 'tickets', title: 'Tickets' },
    { name: 'venue', title: 'Venue Information' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'name',
      title: 'Event Name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Tournament', value: 'tournament' },
          { title: 'Championship', value: 'championship' },
          { title: 'Exhibition', value: 'exhibition' },
          { title: 'Grand Smash', value: 'grand_smash' },
          { title: 'World Cup', value: 'world_cup' },
          {
            title: 'Continental Championship',
            value: 'continental_championship',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Event Details',
      type: 'vyuh.portableText',
      group: 'basic',
    }),

    // Prize Money & Ranking Points
    defineField({
      name: 'totalPrizeMoney',
      title: 'Total Prize Money',
      type: 'number',
      group: 'prizes',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      group: 'prizes',
      options: {
        list: [
          { title: 'USD ($)', value: 'USD' },
          { title: 'EUR (€)', value: 'EUR' },
          { title: 'GBP (£)', value: 'GBP' },
          { title: 'CNY (¥)', value: 'CNY' },
        ],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'singlesPrizeMoney',
      title: 'Singles Prize Money Breakdown',
      type: 'array',
      group: 'prizes',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Winner', value: 'winner' },
                  { title: 'Runner-up', value: 'runner_up' },
                  { title: 'Semi-finalist', value: 'semi_finalist' },
                  { title: 'Quarter-finalist', value: 'quarter_finalist' },
                  { title: 'Round of 16', value: 'round_of_16' },
                  { title: 'Round of 32', value: 'round_of_32' },
                  { title: 'Round of 64', value: 'round_of_64' },
                  { title: 'Qualification', value: 'qualification' },
                ],
              },
            },
            {
              name: 'amount',
              title: 'Amount',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'rankingPoints',
              title: 'Ranking Points',
              type: 'number',
            },
          ],
          preview: {
            select: {
              title: 'position',
              subtitle: 'amount',
            },
            prepare({ title, subtitle }) {
              return {
                title: title
                  .replace('_', ' ')
                  .replace(/\b\w/g, (c: string) => c.toUpperCase()),
                subtitle: `Prize: ${subtitle}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'doublesPrizeMoney',
      title: 'Doubles Prize Money Breakdown',
      type: 'array',
      group: 'prizes',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Winner', value: 'winner' },
                  { title: 'Runner-up', value: 'runner_up' },
                  { title: 'Semi-finalist', value: 'semi_finalist' },
                  { title: 'Quarter-finalist', value: 'quarter_finalist' },
                  { title: 'Round of 16', value: 'round_of_16' },
                  { title: 'Round of 32', value: 'round_of_32' },
                ],
              },
            },
            {
              name: 'amount',
              title: 'Amount (per team)',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'rankingPoints',
              title: 'Ranking Points (per player)',
              type: 'number',
            },
          ],
          preview: {
            select: {
              title: 'position',
              subtitle: 'amount',
            },
            prepare({ title, subtitle }) {
              return {
                title: title
                  .replace('_', ' ')
                  .replace(/\b\w/g, (c: string) => c.toUpperCase()),
                subtitle: `Prize: ${subtitle}`,
              };
            },
          },
        },
      ],
    }),

    // Tickets
    defineField({
      name: 'ticketInfo',
      title: 'Ticket Information',
      type: 'array',
      group: 'tickets',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Ticket Category',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'vyuh.portableText',
            },
            {
              name: 'ticketUrl',
              title: 'Ticket Url',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['https'],
                  allowRelative: false,
                }),
            },
          ],
          preview: {
            select: {
              title: 'category',
              subtitle: 'price',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: `Price: ${subtitle}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ticketPolicy',
      title: 'Ticket Policy',
      type: 'text',
      group: 'tickets',
      rows: 3,
    }),

    // Venue Information
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [{ type: 'venue' }],
      group: 'venue',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venueNotes',
      title: 'Venue Notes',
      description:
        'Additional information specific to this event at this venue',
      type: 'text',
      group: 'venue',
      rows: 3,
    }),

    // Media
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Image Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'media',
      description: 'URL to promotional video (YouTube, Vimeo, etc.)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'startDate',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : '',
        media,
      };
    },
  },
});

export default event;
