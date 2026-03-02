import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'introBlock',
  title: 'Intro Block',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'string' }),
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { headline: 'headline' },
    prepare: ({ headline }) => ({
      title: 'Intro',
      subtitle: headline,
    }),
  },
})
