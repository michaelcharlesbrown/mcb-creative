import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredProjects',
      title: 'Work Grid',
      description:
        'Drag to reorder. Projects listed here appear on the homepage work grid in this exact order. Remove a project to take it off the homepage — it stays reachable from the project nav rail and sitemap.',
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
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage — Work Grid' }),
  },
})
