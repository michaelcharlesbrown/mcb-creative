import { defineConfig } from 'sanity'
import { deskTool, type StructureBuilder } from 'sanity/desk'
import { media } from 'sanity-plugin-media'
import { colorInput } from '@sanity/color-input'
import project from './schemas/project'
import homepage from './schemas/homepage'
import introBlock from './schemas/blocks/introBlock'
import fullWidthBlock from './schemas/blocks/fullWidthBlock'
import twoColumnBlock from './schemas/blocks/twoColumnBlock'
import textMediaBlock from './schemas/blocks/textMediaBlock'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable')
}

/**
 * "Homepage" is a singleton — there is exactly one, with a fixed document ID.
 * Pin it to the top of the desk list and route straight to that one document
 * instead of the usual "create new" list view.
 */
const HOMEPAGE_DOC_ID = 'homepage'

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id(HOMEPAGE_DOC_ID)
        .child(
          S.document().schemaType('homepage').documentId(HOMEPAGE_DOC_ID)
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'homepage'
      ),
    ])

export default defineConfig({
  name: 'default',
  title: 'MCB Creative',
  projectId,
  dataset,
  basePath: '/studio',
  schema: {
    types: [project, homepage, introBlock, fullWidthBlock, twoColumnBlock, textMediaBlock],
  },
  plugins: [deskTool({ structure }), media(), colorInput()],
  document: {
    // Singletons don't get a "new" button or duplicate/delete actions —
    // there is exactly one Homepage document, fixed at HOMEPAGE_DOC_ID.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((item) => item.templateId !== 'homepage')
        : prev,
    actions: (prev, { schemaType }) =>
      schemaType === 'homepage'
        ? prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
        : prev,
  },
})
