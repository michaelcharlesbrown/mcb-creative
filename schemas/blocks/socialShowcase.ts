import { defineType, defineField, defineArrayMember } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export default defineType({
  name: 'socialShowcase',
  title: 'Social Showcase',
  type: 'object',
  description:
    'Displays 1–3 social-style vertical clips (Reels/TikTok format) as phone-like screens, with an optional full-bleed background image or video behind them.',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      description: 'Optional full-bleed background sitting behind the screens.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'backgroundVideoFile',
      title: 'Background Video',
      description: 'Optional full-bleed background video. Takes precedence over Background Image if both are set.',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      description: 'Optional solid color background. Only used if no Background Image or Background Video is set.',
      type: 'color',
    }),
    defineField({
      name: 'screens',
      title: 'Screens',
      description: '1–3 screens. Each screen is either an image or a video — fill in whichever applies.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'screen',
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
                title: hasVideo ? 'Video Screen' : 'Image Screen',
                media: hasVideo ? PlayIcon : image,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(3).required(),
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      initialValue: 'full',
      options: {
        layout: 'radio',
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Half Width', value: 'half' },
        ],
      },
    }),
    defineField({
      name: 'layoutStyle',
      title: 'Layout Style',
      type: 'string',
      initialValue: 'grid',
      options: {
        layout: 'radio',
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Marquee', value: 'marquee' },
        ],
      },
    }),
  ],
  preview: {
    select: { screens: 'screens', width: 'width', layoutStyle: 'layoutStyle' },
    prepare: ({ screens, width, layoutStyle }) => {
      const count = Array.isArray(screens) ? screens.length : 0
      const widthLabel = width === 'half' ? 'Half Width' : 'Full Width'
      const layoutLabel = layoutStyle === 'marquee' ? 'Marquee' : 'Grid'
      return {
        title: 'Social Showcase',
        subtitle: `${count} screen${count === 1 ? '' : 's'} · ${widthLabel} · ${layoutLabel}`,
        media: PlayIcon,
      }
    },
  },
})
