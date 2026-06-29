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
  /** Accent color used for page transition wipe */
  accentColor: string;
  /** Hero intro tagline (shorter than main tagline) - used in project hero */
  heroTagline?: string;
  /** Scope items for hero (e.g. "Visual Design System") */
  scope?: string[];
  /** Team credits for hero (e.g. "Creative Director - Name") */
  team?: string[];
  /** Description paragraphs for hero right column */
  description?: string[];
  /** Override hero image for work page slide (default: 01-full or first full image) */
  heroImage?: string;
}

export const projects: Project[] = [
  {
    slug: 'bittorrent',
    accentColor: '#00c853',
    title: 'BitTorrent',
    tagline: 'Brand refresh and website redesign for one of the original pioneers of the internet.',
    heroTagline: 'Updating a classic brand for one of the original pioneers of the internet.',
    scope: ['Visual Design System', 'Brand Guidelines', 'Website Redesign'],
    team: [
      'Creative Director - Michael Charles Brown',
      'Visual Designer - Johann Banta',
      'UX Designer - Briana Jackson',
    ],
    description: [
      "As the world's largest distributed network BitTorrent is a force that powers massive data movement across the web, utilized by industry giants like Facebook, Twitter, and Wikipedia. However, with time, its brand identity had become fragmented and inconsistent.",
      "Our mission was to give BitTorrent a fresh, cohesive visual language that reflects its groundbreaking role in the internet's evolution and bring clarity to the entire ecosystem viewed by millions of users worldwide.",
    ],
    year: '2024',
    client: 'BitTorrent Inc.',
    services: ['Brand Identity', 'Web Design', 'Art Direction'],
    thumbnail: '/images/projects/bittorrent/thumb.jpg',
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
    slug: 'red-moon-apostles',
    accentColor: '#b71c1c',
    title: 'Red Moon Apostles',
    tagline: 'Brand identity and visual design.',
    heroTagline: 'Developing a distinctive visual identity for an emerging rock band.',
    scope: ['Band Identity', 'Album Artwork', 'Merchandise Design'],
    description: [
      "Red Moon Apostles is a Los Angeles-based rock band blending psychedelic influences with modern alternative sound. As they prepared to release their debut album, they needed a cohesive visual identity that would capture their sonic aesthetic and establish their presence in the indie music scene.",
      "We created a mysterious, evocative identity system drawing from lunar imagery, vintage rock poster art, and contemporary design sensibilities. The visual language spans album packaging, merchandise, social media, and live show materials, giving the band a distinct, memorable presence that resonates with their audience.",
    ],
    year: '2024',
    client: 'Red Moon Apostles',
    services: ['Brand Identity', 'Visual Design', 'Art Direction'],
    thumbnail: '/images/projects/red-moon-apostles/thumb.jpg',
    media: [],
  },
  {
    slug: 'protools',
    accentColor: '#cc0000',
    title: 'ProTools',
    tagline: 'Creative direction and visual design for the industry-standard digital audio workstation.',
    heroTagline: 'Reimagining the visual language for the world\'s leading professional audio platform.',
    scope: ['Creative Direction', 'Marketing Campaign Design', 'Product UI Concepts'],
    team: [
      'Creative Director - Michael Charles Brown',
      'Senior Designer - Marcus Williams',
      'Art Director - Lisa Chen',
    ],
    description: [
      "Pro Tools by Avid is the industry-standard digital audio workstation used by top recording studios, mixing engineers, and post-production houses worldwide. As the platform evolved, it needed creative direction that would modernize its visual presence while honoring its legacy of professional excellence.",
      "We developed campaign concepts and visual directions that speak to both seasoned audio professionals and the next generation of music creators. Our work emphasizes precision, creativity, and the emotional power of sound, reinforcing Pro Tools' position as the definitive standard for professional audio.",
    ],
    year: '2024',
    client: 'Avid Technology',
    services: ['Creative Direction', 'Visual Design', 'Brand Identity'],
    thumbnail: '/images/projects/protools/thumb.jpg',
    media: [],
  },
  {
    slug: 'mad-denizen',
    accentColor: '#7c3aed',
    title: 'Mad Denizen',
    tagline: 'Brand identity and visual design for an independent music label.',
    heroTagline: 'Creating a bold visual identity for underground electronic music culture.',
    scope: ['Brand Identity', 'Album Artwork', 'Event Graphics'],
    description: [
      "Mad Denizen is an independent electronic music label pushing boundaries in experimental sound. They needed a visual identity that captured the raw energy and avant-garde spirit of their roster while establishing recognition in the crowded independent music scene.",
      "We created a flexible, bold identity system that adapts across album releases, event posters, and digital platforms. Drawing inspiration from underground club culture and glitch aesthetics, the visual language we developed is distinctive, energetic, and unmistakably Mad Denizen.",
    ],
    year: '2024',
    client: 'Mad Denizen',
    services: ['Brand Identity', 'Visual Design', 'Art Direction'],
    thumbnail: '/images/projects/mad-denizen/thumb.jpg',
    media: [],
  },
  {
    slug: 'shiftdrink',
    accentColor: '#ff6b00',
    title: 'ShiftDrink',
    tagline: 'Brand identity and digital experience for a modern beverage company.',
    heroImage: '/images/projects/shiftdrink/08-full.jpg',
    heroTagline: 'Building a vibrant brand for the next generation of energy drinks.',
    scope: ['Brand Identity System', 'Product Packaging', 'Digital Experience Design'],
    team: [
      'Creative Director - Michael Charles Brown',
      'Brand Designer - Sarah Mitchell',
      'Digital Designer - Alex Chen',
    ],
    description: [
      "ShiftDrink entered a crowded energy drink market with a fresh perspective focused on natural ingredients and sustainable practices. They needed a brand identity that would resonate with health-conscious millennials and Gen Z consumers while standing out in a category dominated by established players.",
      "We developed a bold, energetic visual system that balances vibrancy with sophistication. The identity celebrates movement and transformation through dynamic typography, bright color gradients, and lifestyle imagery that positions ShiftDrink as the go-to choice for active, mindful consumers.",
    ],
    year: '2024',
    client: 'ShiftDrink',
    services: ['Brand Identity', 'UI/UX Design', 'Art Direction'],
    thumbnail: '/images/projects/shiftdrink/thumb.jpg',
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
    accentColor: '#1a73e8',
    title: 'Alluvial',
    tagline: 'Visual identity and digital platform design for a forward-thinking technology company.',
    heroTagline: 'Crafting a sophisticated brand for institutional blockchain infrastructure.',
    scope: ['Visual Identity System', 'Product Interface Design', 'Motion Design'],
    description: [
      "Alluvial builds institutional-grade blockchain infrastructure for digital asset custody. Operating in a complex, trust-driven industry, they needed a visual identity that conveyed security, sophistication, and technical excellence while remaining approachable to enterprise clients.",
      "Our solution balances technical precision with warmth through a refined color palette, clean typography, and subtle motion design. The identity system we created positions Alluvial as both deeply knowledgeable and forward-thinking, bridging traditional finance with the future of digital assets.",
    ],
    year: '2024',
    client: 'Alluvial',
    services: ['Brand Identity', 'Web Design', 'Motion Graphics'],
    thumbnail: '/images/projects/alluvial/thumb.jpg',
    media: [],
  },
  {
    slug: 'rainberry',
    accentColor: '#00bcd4',
    title: 'Rainberry',
    tagline: 'Complete brand identity and digital experience design.',
    heroTagline: 'Launching a consumer technology brand with clarity and confidence.',
    scope: ['Brand Strategy', 'Visual Identity', 'Digital Product Design'],
    description: [
      "Rainberry is building next-generation consumer technology products that prioritize privacy and user control. As a new entrant in a market dominated by tech giants, they needed a brand identity that would establish trust and convey technical sophistication while remaining approachable.",
      "We crafted a modern, clean identity system that emphasizes transparency and user empowerment. The visual language combines soft, organic forms with precise technical details, creating a brand presence that feels both human and cutting-edge.",
    ],
    year: '2024',
    client: 'Rainberry',
    services: ['Brand Identity', 'Web Design', 'UI/UX Design'],
    thumbnail: '/images/projects/rainberry/thumb.png',
    media: [],
  },
  {
    slug: 'utorrent',
    accentColor: '#26a69a',
    title: 'uTorrent',
    tagline: 'Brand refresh and user experience redesign for a leading file-sharing platform.',
    heroTagline: 'Modernizing the interface for millions of users worldwide.',
    scope: ['Product Redesign', 'Brand Refresh', 'User Experience Strategy'],
    team: [
      'Creative Director - Michael Charles Brown',
      'Visual Designer - Johann Banta',
      'UX Designer - Briana Jackson',
    ],
    description: [
      "uTorrent has been the lightweight torrent client of choice for over a decade, but its interface had become dated and cluttered. With millions of daily users across the globe, any redesign needed to balance modernization with the familiarity users depend on.",
      "Our approach focused on streamlining the user experience while introducing a refined visual language. We simplified navigation, improved information hierarchy, and updated the brand with contemporary colors and typography that signal quality and reliability to both existing and new users.",
    ],
    year: '2024',
    client: 'uTorrent',
    services: ['Brand Identity', 'UI/UX Design', 'Web Design'],
    thumbnail: '/images/projects/utorrent/thumb.jpg',
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
