# Homepage Grid Position Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `gridPosition` field (1–6) to the Sanity case study schema so editors can control which projects appear in the homepage grid and in what order.

**Architecture:** A single optional number field on the `project` document type drives both grid inclusion and slot order. The homepage query filters to projects where `gridPosition` is defined and orders by it ascending. The homepage page component is updated to use Sanity's ordered results as the primary source, with static data as a fallback.

**Tech Stack:** Sanity (schema + GROQ), Next.js App Router, TypeScript

---

### Task 1: Add `gridPosition` field to the project schema

**Files:**
- Modify: `schemas/project.ts`

**Step 1: Add the field**

In `schemas/project.ts`, add a new `defineField` block after the `thumbnail` field and before the `coverImage` field:

```ts
defineField({
  name: 'gridPosition',
  title: 'Homepage Grid Position',
  description: 'Set a number (1–6) to feature this project in the homepage grid at that slot. Leave blank to exclude from the grid.',
  type: 'number',
  validation: (Rule) =>
    Rule.min(1).max(6).integer().warning('Must be a whole number between 1 and 6.'),
}),
```

**Step 2: Verify it looks right**

The full field list order in `schemas/project.ts` should be:
1. `title`
2. `slug`
3. `accentColor`
4. `thumbnail`
5. `gridPosition` ← new
6. `coverImage`
7. `pageContent`

**Step 3: Commit**

```bash
git add schemas/project.ts
git commit -m "feat(sanity): add gridPosition field to case study schema"
```

---

### Task 2: Update the GROQ query

**Files:**
- Modify: `lib/sanity.queries.ts`

**Step 1: Replace `projectsGridQuery`**

Find this in `lib/sanity.queries.ts`:

```ts
export const projectsGridQuery = `*[_type=="project" && defined(slug.current)] | order(_createdAt asc) {
  title,
  "slug": slug.current,
  "accentColor": accentColor.hex,
  "subheadline": pageContent[_type=="introBlock"][0].subheadline,
  "scope": pageContent[_type=="introBlock"][0].scope,
  "thumbnail": thumbnail.asset->url,
  "thumbnailAlt": thumbnail.alt
}`;
```

Replace with:

```ts
export const projectsGridQuery = `*[_type=="project" && defined(slug.current) && defined(gridPosition)] | order(gridPosition asc) {
  title,
  "slug": slug.current,
  "accentColor": accentColor.hex,
  "subheadline": pageContent[_type=="introBlock"][0].subheadline,
  "scope": pageContent[_type=="introBlock"][0].scope,
  "thumbnail": thumbnail.asset->url,
  "thumbnailAlt": thumbnail.alt
}`;
```

The two changes are:
1. Added `&& defined(gridPosition)` to the filter
2. Changed `order(_createdAt asc)` to `order(gridPosition asc)`

**Step 2: Commit**

```bash
git add lib/sanity.queries.ts
git commit -m "feat(sanity): filter and order homepage grid by gridPosition field"
```

---

### Task 3: Update the homepage page component

**Files:**
- Modify: `app/page.tsx`

**Context:** The current logic uses `projects.slice(0, 6)` (static data) as the canonical ordered list and merges Sanity data on top by slug. With the new feature, Sanity's `gridPosition`-ordered results become the source of truth for which projects appear and in what order. Static data in `data/projects.ts` is now only a fallback for fields that Sanity hasn't populated yet.

**Step 1: Replace the merge logic in `app/page.tsx`**

Find this block:

```ts
const sanityBySlug = Object.fromEntries(sanityProjects.map((p) => [p.slug, p]));

const mergedProjects = projects.slice(0, 6).map((project) => {
  const sanity = sanityBySlug[project.slug];
  return {
    ...project,
    accentColor: sanity?.accentColor ?? project.accentColor,
    subheadline: sanity?.subheadline,
    scope: sanity?.scope ?? project.services,
    thumbnail: sanity?.thumbnail ?? project.thumbnail,
    thumbnailAlt: sanity?.thumbnailAlt,
  };
});
```

Replace with:

```ts
const staticBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

// If Sanity has grid projects configured, use them as the ordered source of truth.
// Otherwise fall back to the first 6 static projects.
const mergedProjects = sanityProjects.length > 0
  ? sanityProjects.map((sanity) => {
      const staticProject = staticBySlug[sanity.slug];
      return {
        slug: sanity.slug,
        title: sanity.title ?? staticProject?.title ?? '',
        accentColor: sanity.accentColor ?? staticProject?.accentColor ?? '',
        subheadline: sanity.subheadline ?? staticProject?.tagline,
        scope: sanity.scope ?? staticProject?.services ?? [],
        thumbnail: sanity.thumbnail ?? staticProject?.thumbnail ?? '',
        thumbnailAlt: sanity.thumbnailAlt,
      };
    })
  : projects.slice(0, 6).map((project) => ({
      slug: project.slug,
      title: project.title,
      accentColor: project.accentColor,
      subheadline: project.tagline,
      scope: project.services,
      thumbnail: project.thumbnail,
      thumbnailAlt: undefined,
    }));
```

**Step 2: Update the `SanityGridProject` type** to include `gridPosition` (optional, for completeness — it's not used in rendering but may be useful for debugging):

Find:

```ts
type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
};
```

Replace with:

```ts
type SanityGridProject = {
  slug: string;
  title: string;
  accentColor?: string;
  subheadline?: string;
  scope?: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
  gridPosition?: number;
};
```

**Step 3: Check for linter errors**

Run: `npx tsc --noEmit`
Expected: no errors

**Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(homepage): use Sanity gridPosition as source of truth for featured work grid"
```

---

### Task 4: Manual verification in Sanity Studio

1. Run the dev server: `npm run dev`
2. Open Sanity Studio at `http://localhost:3000/studio`
3. Open any case study and confirm the "Homepage Grid Position" field appears below the thumbnail field
4. Set a value of `1` on one project, `2` on another
5. Check `http://localhost:3000` — the grid should now show those two projects in slots 1 and 2
6. Clear both values — grid should fall back to the static 6 projects
