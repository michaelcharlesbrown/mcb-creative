export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  services: string[];
}

export const projects: Project[] = [
  {
    slug: 'bittorrent',
    title: 'BitTorrent',
    tagline: 'Brand refresh and website redesign for one of the original pioneers of the internet.',
    year: '2024',
    services: ['Brand Identity', 'Web Design', 'Art Direction'],
  },
  {
    slug: 'shiftdrink',
    title: 'ShiftDrink',
    tagline: 'Placeholder tagline',
    year: '2024',
    services: ['Placeholder Service'],
  },
];
