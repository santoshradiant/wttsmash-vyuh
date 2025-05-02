import { Building } from 'lucide-react';
import { defineField, defineType } from 'sanity';

const venue = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: Building,
  groups: [
    { name: 'basic', title: 'Basic Information' },
    { name: 'images', title: 'Images' },
    { name: 'attractions', title: 'Attractions' },
    { name: 'details', title: 'Additional Details' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Venue Name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      group: 'basic',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Seating Capacity',
      type: 'number',
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'basic',
      rows: 4,
    }),

    // Images
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'images',
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
      group: 'images',
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

    // Attractions
    defineField({
      name: 'attractions',
      title: 'Nearby Attractions',
      type: 'array',
      group: 'attractions',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Attraction Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'distance',
              title: 'Distance from Venue',
              type: 'string',
              description: 'e.g., "2 km", "10 minutes walk"',
            },
            {
              name: 'image',
              title: 'Image',
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
              ],
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'distance',
              media: 'image',
            },
          },
        },
      ],
    }),

    // Additional Details
    defineField({
      name: 'parkingInfo',
      title: 'Parking Information',
      type: 'text',
      group: 'details',
      rows: 3,
    }),
    defineField({
      name: 'publicTransportInfo',
      title: 'Public Transport Information',
      type: 'text',
      group: 'details',
      rows: 3,
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Venue Website',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'mapLocation',
      title: 'Map Coordinates',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
        },
        {
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'mainImage',
    },
  },
});

export default venue;
