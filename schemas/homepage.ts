import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'sizzleReelSlides',
      title: 'Sizzle Reel Slides',
      description:
        'Ordered sequence of stills and short clips for the homepage hero. Additive: leave empty to keep the current video hero. The first slide must be an image (the static "at rest" frame). Drag to reorder.',
      type: 'array',
      of: [defineArrayMember({ type: 'mediaSlide' })],
      validation: (Rule) =>
        Rule.custom((slides) => {
          if (!slides || slides.length === 0) return true
          const first = slides[0] as { image?: unknown }
          return first?.image ? true : 'The first slide must be an image, not a video.'
        }),
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      description:
        'Drag to reorder, up to 4. Projects listed here appear on the homepage in this exact order. Remove a project to take it off the homepage — it’s still public if it’s also in the Work Page grid; otherwise it’s reachable only by direct link, and won’t be included in the sitemap.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
          options: {
            disableNew: true,
          },
        }),
      ],
      validation: (Rule) => Rule.unique().max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage — Featured Projects' }),
  },
})
