export interface ThurmanAgent {
  name: string
  role: string
  bio: string
  photo: string
  linkedinUrl?: string
}

export interface ThurmanConfig {
  groupName: string
  websiteUrl: string
  tagline: string
  agents: ThurmanAgent[]
  serviceArea: string
  brokerage: {
    name: string
    address: string
    phone: string
  }
}

export const THURMAN_CONFIG: ThurmanConfig = {
  groupName: 'Thurman Advisory Group',
  websiteUrl: 'https://lifeinsurance.thurmanadvisorygroup.com/',
  tagline: 'Husband-and-wife team helping families relocate to Central Florida — real estate, insurance, and the life-stage decisions in between.',
  serviceArea: 'Greater Orlando metro — Lake Nona, Winter Park, Windermere, Horizon West, Winter Garden, Dr. Phillips, and surrounding submarkets.',
  agents: [
    {
      name: 'Ana Thurman',
      role: 'Founder & CEO · Realtor (WRA Business and Real Estate)',
      bio: 'Orlando-area realtor focused on family relocations — schools, neighborhood fit, and Florida-specific costs of ownership.',
      photo: '/calculators/moving/thurman/ana.png',
      linkedinUrl: 'https://www.linkedin.com/in/ana-thurman-870788341/',
    },
    {
      name: 'Brandon Thurman',
      role: 'Founder & COO · US Army Veteran',
      bio: 'Co-founded Thurman Advisory Group to bundle real estate with life, home, and family insurance — so relocators land in Orlando with the full stack handled.',
      photo: '/calculators/moving/thurman/brandon.png',
      linkedinUrl: 'https://www.linkedin.com/in/lukethurman/',
    },
  ],
  brokerage: {
    name: 'WRA Business and Real Estate',
    address: '7065 Westpointe Blvd, Suite 102, Orlando, FL 32835',
    phone: '(407) 512-1008',
  },
}
