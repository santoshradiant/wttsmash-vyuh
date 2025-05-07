import { Settings } from 'lucide-react';
import { defineField, defineType } from 'sanity';

// Schema type for site settings
const siteSettings = defineType({
  name: 'wtt.siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  groups: [
    { name: 'general', title: 'General' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'social', title: 'Social Media' },
    { name: 'seo', title: 'SEO' },
    { name: 'advanced', title: 'Advanced' },
  ],
  fields: [
    // General Info
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'slug',
      description: 'Identifier used to identify the site',
      group: 'general',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the website',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'A short description of the website',
      group: 'general',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Primary logo used in header and other brand touchpoints',
      group: 'general',
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
    }),
    defineField({
      name: 'logo_red',
      title: 'Logo Red',
      type: 'image',
      description: 'Primary logo used in header and other brand touchpoints',
      group: 'general',
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
    }),
    defineField({
      name: 'side_panel_footer_logo',
      title: 'Side Panel Footer Logo',
      description:
        'Secondary logo (light/dark version) used for different contexts',
      type: 'image',
      group: 'general',
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
    }),
    defineField({
      name: 'side_panel_footer_logo_red',
      title: 'Side Panel Footer Logo Red',
      description:
        'Secondary logo (light/dark version) used for different contexts',
      type: 'image',
      group: 'general',
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
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon displayed in browser tabs',
      group: 'general',
    }),
    defineField({
      name: 'coverImage',
      title: 'Default Cover Image',
      description:
        'Default image used for social media sharing when no specific image is provided',
      type: 'image',
      group: 'general',
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
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Contender', value: 'contender' },
          { title: 'Smash (Green)', value: 'smash.green' },
          { title: 'Smash (Blue)', value: 'smash.blue' },
          { title: 'Champions', value: 'champions' },
        ],
      },
    }),

    // Navigation Menus
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      description: 'Links for the main navigation menu',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title_arabic',
              title: 'Title Arabic',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title_chinese',
              title: 'Title Chinese',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'iconName',
              title: 'Icon Name',
              description: 'Icon name from the lucide-react library',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isExternal',
              title: 'Opens in new tab',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'subMenu',
              title: 'Sub Menu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'isExternal',
                      title: 'Opens in new tab',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'link',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link',
              hasSubmenu: 'subMenu',
            },
            prepare({ title, subtitle, hasSubmenu = [] }) {
              return {
                title: title,
                subtitle:
                  hasSubmenu.length > 0
                    ? `${subtitle} (has submenu)`
                    : subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerNavigation',
      title: 'Footer Navigation',
      description: 'Navigation columns for the footer',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'isExternal',
                      title: 'Opens in new tab',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'link',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
            },
            prepare({ title, links = [] }) {
              return {
                title: title,
                subtitle: `${links.length} links`,
              };
            },
          },
        },
      ],
    }),

    // Social Media
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      description: 'Links for terms, privacy policy, etc.',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'link',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Discord', value: 'discord' },
                  { title: 'Twitch', value: 'twitch' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Custom Icon',
              type: 'image',
              description: 'Optional: Override the default platform icon',
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
            prepare({ title, subtitle }) {
              return {
                title: title.charAt(0).toUpperCase() + title.slice(1),
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      group: 'social',
      fields: [
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        },
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          description: 'Default title used for search engine results',
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
          description: 'Default description for search engine results',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'text',
          rows: 1,
          description: 'Default description for search engine results',
        },
        {
          name: 'opengraphtitle',
          title: 'opengraphtitle',
          type: 'string',
          description: 'Default description for search engine results',
        },
        {
          name: 'opengraphdesc',
          title: 'opengraphdesc',
          type: 'string',
          description: 'Default description for search engine results',
        },
        {
          name: 'opengraphsitename',
          title: 'opengraphsitename',
          type: 'string',
          description: 'Default description for search engine results',
        },
        {
          name: 'opengraphtype',
          title: 'opengraphtype',
          type: 'string',
          description: 'Default description for search engine results',
        },
        
        {
          name: 'openGraphImage',
          title: 'Default Open Graph Image',
          type: 'image',
          description: 'Image used when sharing to social media',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // Advanced Settings
    defineField({
      name: 'cookieConsent',
      title: 'Cookie Consent Settings',
      type: 'object',
      group: 'advanced',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Cookie Consent Banner',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'message',
          title: 'Consent Message',
          type: 'text',
          rows: 2,
          hidden: ({ parent }) => !parent?.enabled,
          initialValue:
            'This website uses cookies to enhance your browsing experience.',
        },
        {
          name: 'acceptButtonText',
          title: 'Accept Button Text',
          type: 'string',
          hidden: ({ parent }) => !parent?.enabled,
          initialValue: 'Accept All',
        },
        {
          name: 'declineButtonText',
          title: 'Decline Button Text',
          type: 'string',
          hidden: ({ parent }) => !parent?.enabled,
          initialValue: 'Accept Necessary Only',
        },
        {
          name: 'cookiePolicyLink',
          title: 'Cookie Policy Page',
          type: 'string',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics Settings',
      type: 'object',
      group: 'advanced',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Google Analytics ID (e.g., G-XXXXXXXXXX)',
        },
        {
          name: 'enableIPAnonymization',
          title: 'Enable IP Anonymization',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'maintenance',
      title: 'Maintenance Mode',
      type: 'object',
      group: 'advanced',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Maintenance Mode',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Maintenance Message',
          type: 'text',
          rows: 3,
          hidden: ({ parent }) => !parent?.enabled,
          initialValue:
            'We are currently performing maintenance. Please check back soon.',
        },
        {
          name: 'allowedIPs',
          title: 'Allowed IP Addresses',
          description:
            'IP addresses that can access the site during maintenance',
          type: 'array',
          hidden: ({ parent }) => !parent?.enabled,
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
      };
    },
  },
});

export default siteSettings;
