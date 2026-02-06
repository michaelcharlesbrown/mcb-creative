interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

interface MediaRow {
  layout: 'full' | 'half';
  items: MediaItem[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  client: string;
  services: string[];
  thumbnail: string;
  media: MediaRow[];
}

export const projects: Project[] = [
  {
    slug: 'bittorrent',
    title: 'BitTorrent',
    tagline: 'Brand refresh and website redesign for one of the original pioneers of the internet.',
    year: '2024',
    client: 'BitTorrent Inc.',
    services: ['Brand Identity', 'Web Design', 'Art Direction'],
    thumbnail: '/images/projects/bittorrent/thumb-bittorrent.jpg',
    media: [
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/bittorrent/bit-sign.jpg', alt: 'BitTorrent sign' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/bittorrent/bit-user.jpg', alt: 'BitTorrent user' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/bittorrent/bt-crowd.jpg', alt: 'BitTorrent crowd' },
        ],
      },
      {
        layout: 'half',
        items: [
          { type: 'image', src: '/images/projects/bittorrent/bt-mobile.jpg', alt: 'BitTorrent mobile' },
          { type: 'image', src: '/images/projects/bittorrent/bt-screen.jpg', alt: 'BitTorrent screen' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/bittorrent/bt-square.jpg', alt: 'BitTorrent square' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/bittorrent/bt-style-guide.jpg', alt: 'BitTorrent style guide' },
        ],
      },
      {
        layout: 'half',
        items: [
          { type: 'image', src: '/images/projects/bittorrent/bt-color.jpg', alt: 'BitTorrent color' },
          { type: 'image', src: '/images/projects/bittorrent/bt-type.jpg', alt: 'BitTorrent typography' },
        ],
      },
    ],
  },
  {
    slug: 'shiftdrink',
    title: 'ShiftDrink',
    tagline: 'Brand identity and digital experience for a modern beverage company.',
    year: '2024',
    client: 'ShiftDrink',
    services: ['Brand Identity', 'UI/UX Design', 'Art Direction'],
    thumbnail: '/images/projects/shiftdrink/thumb-shiftdrink.jpg',
    media: [
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/shiftdrink/shiftdrink-logo-hero.jpg', alt: 'ShiftDrink logo hero' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/shiftdrink/shiftdrink-logo.jpg', alt: 'ShiftDrink logo' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'video', src: '/video/projects/shiftdrink/sd-iphone-mock.mp4', alt: 'ShiftDrink iPhone mockup video' },
        ],
      },
      {
        layout: 'half',
        items: [
          { type: 'image', src: '/images/projects/shiftdrink/shiftdrink-color-palette.jpg', alt: 'ShiftDrink color palette' },
          { type: 'image', src: '/images/projects/shiftdrink/shiftdrink-type.jpg', alt: 'ShiftDrink typography' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'video', src: '/video/projects/shiftdrink/sd-lifestyle.mp4', alt: 'ShiftDrink lifestyle video' },
        ],
      },
      {
        layout: 'half',
        items: [
          { type: 'image', src: '/images/projects/shiftdrink/shiftdrink-app-icon.jpg', alt: 'ShiftDrink app icon' },
          { type: 'image', src: '/images/projects/shiftdrink/shiftdrink-app-icon-mockup.jpg', alt: 'ShiftDrink app icon mockup' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/shiftdrink/sd-tagline.jpg', alt: 'ShiftDrink tagline' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'video', src: '/video/projects/shiftdrink/sd-people.mp4', alt: 'ShiftDrink people video' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/shiftdrink/shiftdrink-social-screens.jpg', alt: 'ShiftDrink social screens' },
        ],
      },
      {
        layout: 'full',
        items: [
          { type: 'image', src: '/images/projects/shiftdrink/sd-style-guide.jpg', alt: 'ShiftDrink style guide' },
        ],
      },
    ],
  },
  {
    slug: 'alluvial',
    title: 'Alluvial',
    tagline: 'Visual identity and digital platform design for a forward-thinking technology company.',
    year: '2024',
    client: 'Alluvial',
    services: ['Brand Identity', 'Web Design', 'Motion Graphics'],
    thumbnail: '/images/projects/alluvial/thumb-alluvial.jpg',
    media: [],
  },
  {
    slug: 'avid',
    title: 'Avid',
    tagline: 'Creative direction and visual design for professional media solutions.',
    year: '2024',
    client: 'Avid Technology',
    services: ['Creative Direction', 'Visual Design', 'Brand Identity'],
    thumbnail: '/images/projects/avid/thumb-avid.jpg',
    media: [],
  },
  {
    slug: 'mad-denizen',
    title: 'Mad Denizen',
    tagline: 'Brand identity and visual design for an independent music label.',
    year: '2024',
    client: 'Mad Denizen',
    services: ['Brand Identity', 'Visual Design', 'Art Direction'],
    thumbnail: '/images/projects/mad-denizen/thumb-mad-denizen.jpg',
    media: [],
  },
  {
    slug: 'rainberry',
    title: 'Rainberry',
    tagline: 'Complete brand identity and digital experience design.',
    year: '2024',
    client: 'Rainberry',
    services: ['Brand Identity', 'Web Design', 'UI/UX Design'],
    thumbnail: '/images/projects/rainberry/thumb-rainberry.jpg',
    media: [],
  },
  {
    slug: 'utorrent',
    title: 'uTorrent',
    tagline: 'Brand refresh and user experience redesign for a leading file-sharing platform.',
    year: '2024',
    client: 'uTorrent',
    services: ['Brand Identity', 'UI/UX Design', 'Web Design'],
    thumbnail: '/images/projects/utorrent/thumb-utorrent.jpg',
    media: [],
  },
];

/**
 * Get the previous and next projects for carousel navigation
 * @param currentSlug - The slug of the current project
 * @returns An object with `previous` and `next` projects, or null if not found
 */
export function getAdjacentProjects(currentSlug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  const previousIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
  
  return {
    previous: projects[previousIndex] || null,
    next: projects[nextIndex] || null,
  };
}
