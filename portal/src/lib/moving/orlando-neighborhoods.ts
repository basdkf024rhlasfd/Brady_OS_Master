export interface OrlandoNeighborhood {
  name: string
  medianPrice: string
  yoyGrowth?: string
  vibe: string
  bestFor: string
  schoolGrade: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'mixed'
  hasCDD: boolean
  promptHint: string
}

export const ORLANDO_NEIGHBORHOODS: OrlandoNeighborhood[] = [
  {
    name: 'Lake Nona',
    medianPrice: '$780K',
    yoyGrowth: '+8%',
    vibe: 'Master-planned tech & medical hub. Modern, amenity-rich.',
    bestFor: 'Medical / tech families, executives',
    schoolGrade: 'A-',
    hasCDD: true,
    promptHint: 'Tell me about Lake Nona — schools, CDD fees, commute, who lives there.',
  },
  {
    name: 'Winter Park',
    medianPrice: '$700K',
    yoyGrowth: '+3%',
    vibe: 'Orlando’s most prestigious suburb. Historic, walkable, top schools.',
    bestFor: 'Affluent families, executives, retirees',
    schoolGrade: 'A',
    hasCDD: false,
    promptHint: 'Tell me about Winter Park — Park Avenue, schools, price range.',
  },
  {
    name: 'Windermere',
    medianPrice: '$782K',
    vibe: 'Luxury lakefront, privacy, prestige. Isleworth.',
    bestFor: 'High net-worth families, athletes, executives',
    schoolGrade: 'A-',
    hasCDD: true,
    promptHint: 'Compare Windermere neighborhoods — Isleworth, Keene’s Pointe, Butler Chain.',
  },
  {
    name: 'Horizon West',
    medianPrice: '$550K',
    yoyGrowth: '+7%',
    vibe: 'Fastest-growing submarket. New everything. Hamlin, Lakeside, Waterleigh.',
    bestFor: 'Young families, move-up buyers, remote workers',
    schoolGrade: 'mixed',
    hasCDD: true,
    promptHint: 'What’s the deal with Horizon West villages and CDD fees?',
  },
  {
    name: 'Baldwin Park',
    medianPrice: '$575K',
    yoyGrowth: '+6%',
    vibe: 'New urbanist, walkable, planned. Town center, parks.',
    bestFor: 'Families wanting walkability + community',
    schoolGrade: 'A-',
    hasCDD: false,
    promptHint: 'Is Baldwin Park worth the HOA premium?',
  },
  {
    name: 'Winter Garden',
    medianPrice: '$570K',
    yoyGrowth: '+2.3%',
    vibe: 'Historic Plant Street meets master-planned suburbia.',
    bestFor: 'Families, downtown lovers',
    schoolGrade: 'B+',
    hasCDD: false,
    promptHint: 'Tell me about Winter Garden — Plant Street, schools, growth.',
  },
  {
    name: 'Dr. Phillips',
    medianPrice: '$650K',
    vibe: 'Upscale, Restaurant Row, international food scene.',
    bestFor: 'Affluent families, international residents',
    schoolGrade: 'A-',
    hasCDD: false,
    promptHint: 'How does Dr. Phillips compare to Windermere?',
  },
  {
    name: 'College Park',
    medianPrice: '$525K',
    yoyGrowth: '+5%',
    vibe: 'Tree-lined streets, bungalows, "Old Orlando" charm.',
    bestFor: 'Families wanting character + downtown access',
    schoolGrade: 'B+',
    hasCDD: false,
    promptHint: 'Is College Park a good buy if I want character vs. new construction?',
  },
  {
    name: 'Maitland',
    medianPrice: '$500K',
    vibe: 'Quiet, lakefront, between Orlando and Winter Park.',
    bestFor: 'Families, professionals',
    schoolGrade: 'B+',
    hasCDD: false,
    promptHint: 'How does Maitland compare to Winter Park for families?',
  },
  {
    name: 'Hunters Creek',
    medianPrice: '$440K',
    vibe: 'Large 1990s master-planned. Diverse, family-oriented.',
    bestFor: 'Affordable entry to south Orange County',
    schoolGrade: 'B',
    hasCDD: false,
    promptHint: 'Is Hunters Creek a smart move-in for a family on a tighter budget?',
  },
]
