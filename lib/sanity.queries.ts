export const projectBySlugQuery = `*[_type=="project" && slug.current==$slug][0]{
  title,
  "slug": slug.current,
  coverImage{
    alt,
    asset->{url}
  },
  pageContent[]{
    _type,
    headline, subheadline, scope, team, description,
    heroImage{ alt, asset->{url} },
    "heroVideoFileUrl": heroVideoFile.asset->url,
    image{ alt, asset->{url} },
    "videoFileUrl": videoFile.asset->url,
    imageLeft{ alt, asset->{url} },
    "videoFileLeftUrl": videoFileLeft.asset->url,
    imageRight{ alt, asset->{url} },
    "videoFileRightUrl": videoFileRight.asset->url,
    layout, heading, body
  }
}`;

export const projectSlugsQuery = `*[_type=="project" && defined(slug.current)][]{
  "slug": slug.current
}`;
