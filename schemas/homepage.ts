import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
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
