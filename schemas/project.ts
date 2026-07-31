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
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Landscape image (16:9, minimum 2800×1575px). Drives the project hero on both desktop (16:9) and mobile (cropped to 5:4), and is the static fallback for grid cards that have no Card Slides. Keep the subject centered — hotspot controls the focal point.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Portrait Thumbnail (legacy — unused)',
      description: 'No longer used by the site — the portrait mobile hero and carousel were retired in favour of a single 16:9 source cropped to 5:4 on mobile. Retained only so existing uploads are not lost; safe to ignore. Slated for removal in a later cleanup.',
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
      name: 'cardSlides',
      title: 'Card Slides',
      description:
        'Ordered sequence of stills and short clips for this project\'s grid card. One set drives both breakpoints — hover-to-play on desktop (16:9) and autoplay-on-scroll on mobile (cropped to 5:4). Additive: leave empty to fall back to the Hero Image as a static card. The first slide must be an image (the static "at rest" frame). Keep it short — 3–5 slides. Drag to reorder.',
      type: 'array',
      of: [defineArrayMember({ type: 'mediaSlide' })],
      validation: (Rule) =>
        Rule.max(5).custom((slides) => {
          if (!slides || slides.length === 0) return true
          const first = slides[0] as { image?: unknown }
          return first?.image ? true : 'The first slide must be an image, not a video.'
        }),
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
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          description:
            'Optional. The card shown when this project is shared on LinkedIn, Slack, iMessage, or X. Export at 2400×1260 (a 2× master — the CDN serves it at 1200×630). Leave blank to fall back to the Hero Image cropped to the same 1.91:1 card. That fallback reads well for photographic heroes, but upload a dedicated card for device mockups or anything carrying small type — share cards render around 500px wide, where screen content turns illegible.',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
})
