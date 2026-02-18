import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textMediaBlock',
  title: 'Text + Media Block',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Text left, media right', value: 'left' },
          { title: 'Text right, media left', value: 'right' },
        ],
      },
    }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
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
})
