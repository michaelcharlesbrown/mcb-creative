export const projectBySlugQuery = `*[_type=="project" && slug.current==$slug][0]{
  title,
  "slug": slug.current,
  "accentColor": accentColor.hex,
  heroImage{
    alt,
    asset->{url}
  },
  thumbnail{
    alt,
    asset->{url}
  },
  "heroVideoFileUrl": heroVideoFile.asset->url,
  pageContent[]{
    _type,
    headline, subheadline, scope, team, description,
    image{ alt, asset->{url} },
    "videoFileUrl": videoFile.asset->url,
    imageLeft{ alt, asset->{url} },
    "videoFileLeftUrl": videoFileLeft.asset->url,
    imageRight{ alt, asset->{url} },
    "videoFileRightUrl": videoFileRight.asset->url,
    layout, textAlignment, heading, body
  }
}`;

export const projectSlugsQuery = `*[_type=="project" && defined(slug.current)][]{
  "slug": slug.current
}`;

/** Full project catalog, unfiltered — used for the project-page nav rail and adjacent-project links. */
export const projectsGridQuery = `*[_type=="project" && defined(slug.current)] | order(_createdAt asc) {
  title,
  "slug": slug.current,
  "accentColor": accentColor.hex,
  "subheadline": pageContent[_type=="introBlock"][0].subheadline,
  "scope": pageContent[_type=="introBlock"][0].scope,
  heroImage{
    alt,
    asset->{url}
  },
  thumbnail{
    alt,
    asset->{url}
  }
}`;

/**
 * Curated homepage picks, in editorial order. Sourced from the "Homepage"
 * singleton's `featuredProjects` reference array — order and inclusion are
 * controlled entirely by drag-and-drop reordering that array in the Studio.
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
  thumbnail{
    alt,
    asset->{url}
  }
}`;
