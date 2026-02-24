import { defineType, defineField } from 'sanity'
import { ImageIcon, PlayIcon } from '@sanity/icons'

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
    select: { image: 'image', videoFile: 'videoFile' },
    prepare: ({ image, videoFile }) => {
      const hasVideo = !!videoFile?.asset
      return {
        title: 'Full Width',
        subtitle: hasVideo ? 'Video' : 'Image',
        media: hasVideo ? PlayIcon : (image ?? ImageIcon),
      }
    },
  },
})
