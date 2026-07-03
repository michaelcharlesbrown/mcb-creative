import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'workPage',
  title: 'Work Page',
  type: 'document',
  fields: [
    defineField({
      name: 'projects',
      title: 'Work Grid',
      description:
        'Drag to reorder. Add a case study to publish it to the Work page grid, in this order; leave it off to keep it unlisted — it’s reachable only by direct link, and won’t be included in the sitemap. New case studies are never added here automatically.',
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
    prepare: () => ({ title: 'Work Page — Grid Order' }),
  },
})
