export const projectBySlugQuery = `*[_type=="project" && slug.current==$slug][0]{
  title,
  "slug": slug.current,
  "accentColor": accentColor.hex,
  heroImage{
    alt,
    asset->{url}
  },
  "heroVideoFileUrl": heroVideoFile.asset->url,
  seo{
    metaTitle,
    metaDescription
  },
  pageContent[]{
    _type,
    headline, subheadline, scope, team, description,
    image{ alt, asset->{url} },
    "videoFileUrl": videoFile.asset->url,
    imageLeft{ alt, asset->{url} },
    "videoFileLeftUrl": videoFileLeft.asset->url,
    imageRight{ alt, asset->{url} },
    "videoFileRightUrl": videoFileRight.asset->url,
    layout, textAlignment, heading, body,
    backgroundImage{ alt, asset->{url} },
    "backgroundVideoFileUrl": backgroundVideoFile.asset->url,
    "backgroundColorHex": backgroundColor.hex,
    screens[]{
      image{ alt, asset->{url} },
      "videoFileUrl": videoFile.asset->url
    },
    width, layoutStyle
  }
}`;

/**
 * Slugs of case studies published to each grid — used by app/sitemap.ts to
 * build a sitemap that matches the same curation source of truth as the
 * site itself: a project left out of both grids is left out of the sitemap
 * too, reachable only by direct link.
 */
export const homepageSlugsQuery = `*[_id=="homepage"][0].featuredProjects[]->slug.current`;
export const workPageSlugsQuery = `*[_id=="workPage"][0].projects[]->slug.current`;

/**
 * Curated homepage picks, in editorial order. Sourced from the "Homepage"
 * singleton's `featuredProjects` reference array — order and inclusion are
 * controlled entirely by drag-and-drop reordering that array in the Studio.
 * A project only appears here if it has been explicitly added; there is no
 * fallback list.
 */
export const homepageProjectsQuery = `*[_id=="homepage"][0].featuredProjects[]->{
  title,
  "slug": slug.current,
  "accentColor": accentColor.hex,
  "scope": pageContent[_type=="introBlock"][0].scope,
  heroImage{
    alt,
    asset->{url}
  },
  cardSlides[]{
    image{ asset->{url} },
    "videoFileUrl": videoFile.asset->url,
    alt
  }
}`;

/**
 * Curated Work page catalog, in editorial order. Sourced from the "Work
 * Page" singleton's `projects` reference array — drag-and-drop reordered in
 * the Studio. This is the single source of truth for which case studies are
 * publicly browsable: it also drives the project-detail nav rail and
 * previous/next links, so a project left out here is left out everywhere
 * except its own direct URL. A newly created case study does not appear
 * until it is explicitly added.
 */
export const workPageProjectsQuery = `*[_id=="workPage"][0].projects[]->{
  title,
  "slug": slug.current,
  "accentColor": accentColor.hex,
  "scope": pageContent[_type=="introBlock"][0].scope,
  heroImage{
    alt,
    asset->{url}
  },
  cardSlides[]{
    image{ asset->{url} },
    "videoFileUrl": videoFile.asset->url,
    alt
  }
}`;

/**
 * Homepage sizzle reel — the "Homepage" singleton's `sizzleReelSlides` array,
 * curated and reordered directly in the Studio. Empty means the homepage
 * falls back to the existing hardcoded hero video.
 */
export const homepageSizzleReelQuery = `*[_id=="homepage"][0].sizzleReelSlides[]{
  image{ asset->{url} },
  "videoFileUrl": videoFile.asset->url,
  alt
}`;
