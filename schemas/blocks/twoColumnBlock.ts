import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'twoColumnBlock',
  title: 'Two Column Block',
  type: 'object',
  fields: [
    defineField({
      name: 'imageLeft',
      title: 'Left Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'videoFileLeft',
      title: 'Left Video',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'imageRight',
      title: 'Right Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'videoFileRight',
      title: 'Right Video',
      type: 'file',
      options: { accept: 'video/*' },
    }),
  ],
  preview: {
    select: { media: 'imageLeft' },
    prepare: ({ media }) => ({ title: 'Two Column', media }),
  },
})
