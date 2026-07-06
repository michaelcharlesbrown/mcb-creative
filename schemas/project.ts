import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      description: 'Used for the page transition wipe when navigating to this project.',
      type: 'color',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Mobile Hero / Portrait Card',
      description: 'Portrait image (5:7 ratio, minimum 1000×1400px). Used as the hero on mobile, in the project carousel, and in portrait card grids. Keep the subject centered — hotspot controls the focal point.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Desktop Hero / Landscape Card',
      description: 'Landscape image (16:9 or wider, minimum 2800×1575px). Used as the full-screen hero on desktop and in landscape work grid cards.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroVideoFile',
      title: 'Hero Video',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'introBlock' }),
        defineArrayMember({ type: 'fullWidthBlock' }),
        defineArrayMember({ type: 'twoColumnBlock' }),
        defineArrayMember({ type: 'textMediaBlock' }),
        defineArrayMember({ type: 'socialShowcase' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO / Metadata',
      description:
        'Optional. Controls how this project appears in Google search results and link previews. Leave blank to fall back to the project title and body copy.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          description: 'Aim for ~60 characters — Google typically truncates titles beyond that.',
          type: 'string',
          validation: (Rule) => Rule.max(60).warning('Longer titles are often truncated in Google search results.'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          description: 'Aim for ~155–160 characters — Google typically truncates descriptions beyond that.',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160).warning('Longer descriptions are often truncated in Google search results.'),
        }),
      ],
    }),
  ],
})
