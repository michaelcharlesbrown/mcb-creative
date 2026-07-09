import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export default defineType({
  name: 'mediaSlide',
  title: 'Media Slide',
  type: 'object',
  description: 'A single hero slide — an image or a short video clip. Fill in whichever applies.',
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
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
    }),
  ],
  preview: {
    select: { image: 'image', videoFile: 'videoFile', alt: 'alt' },
    prepare: ({ image, videoFile, alt }) => {
      const hasVideo = !!videoFile?.asset
      return {
        title: alt || (hasVideo ? 'Video Slide' : 'Image Slide'),
        media: hasVideo ? PlayIcon : image,
      }
    },
  },
})
