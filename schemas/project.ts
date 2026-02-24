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
      title: 'Portfolio Grid Thumbnail',
      description: 'Used for the project card in the home page portfolio grid (5:7 aspect ratio recommended).',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
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
      ],
    }),
  ],
})
