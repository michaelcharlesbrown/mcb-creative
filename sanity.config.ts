import { defineConfig } from 'sanity'
import { deskTool, type StructureBuilder } from 'sanity/desk'
import { media } from 'sanity-plugin-media'
import { colorInput } from '@sanity/color-input'
import project from './schemas/project'
import homepage from './schemas/homepage'
import workPage from './schemas/workPage'
import mediaSlide from './schemas/objects/mediaSlide'
import introBlock from './schemas/blocks/introBlock'
import fullWidthBlock from './schemas/blocks/fullWidthBlock'
import twoColumnBlock from './schemas/blocks/twoColumnBlock'
import textMediaBlock from './schemas/blocks/textMediaBlock'
import socialShowcase from './schemas/blocks/socialShowcase'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable')
}

/**
 * "Homepage" and "Work Page" are singletons — exactly one of each, at a fixed
 * document ID. Pin them to the top of the desk list and route straight to
 * that one document instead of the usual "create new" list view.
 */
const SINGLETONS = [
  { id: 'homepage', schemaType: 'homepage', title: 'Homepage' },
  { id: 'workPage', schemaType: 'workPage', title: 'Work Page' },
]
const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.schemaType))

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({ id, schemaType, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(schemaType).documentId(id))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.has(listItem.getId() ?? '')
      ),
    ])

export default defineConfig({
  name: 'default',
  title: 'MCB Creative',
  projectId,
  dataset,
  basePath: '/studio',
  schema: {
    types: [project, homepage, workPage, mediaSlide, introBlock, fullWidthBlock, twoColumnBlock, textMediaBlock, socialShowcase],
  },
  plugins: [deskTool({ structure }), media(), colorInput()],
  document: {
    // Singletons don't get a "new" button or duplicate/delete actions —
    // there is exactly one of each, fixed at its SINGLETONS entry's id.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((item) => !SINGLETON_TYPES.has(item.templateId))
        : prev,
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
        : prev,
  },
})
