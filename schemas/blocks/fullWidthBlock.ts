import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fullWidthBlock',
  title: 'Full Width Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'videoFile',
      title: 'Video',
      type: 'file',
      options: { accept: 'video/*' },
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare: ({ media }) => ({ title: 'Full Width', media }),
  },
})
