import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { media } from 'sanity-plugin-media'
import { colorInput } from '@sanity/color-input'
import project from './schemas/project'
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

export default defineConfig({
  name: 'default',
  title: 'MCB Creative',
  projectId,
  dataset,
  basePath: '/studio',
  schema: {
    types: [project, introBlock, fullWidthBlock, twoColumnBlock, textMediaBlock],
  },
  plugins: [deskTool(), media(), colorInput()],
})
