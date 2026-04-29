export interface OrlandoFAQChip {
  label: string
  prompt: string
  category: 'cost' | 'neighborhoods' | 'schools' | 'risk' | 'process' | 'lifestyle'
}

export const ORLANDO_FAQ_CHIPS: OrlandoFAQChip[] = [
  {
    label: 'Property taxes & CDD fees',
    prompt: 'What are property taxes, HOA, and CDD fees in Orlando? Walk me through the full monthly cost of ownership.',
    category: 'cost',
  },
  {
    label: 'Hurricane insurance reality',
    prompt: 'How real is the Florida insurance crisis right now? What should I budget for hurricane and homeowners insurance in Orlando?',
    category: 'risk',
  },
  {
    label: 'Best schools by neighborhood',
    prompt: 'Which Orlando neighborhoods have the best schools for elementary, middle, and high?',
    category: 'schools',
  },
  {
    label: 'Lake Nona vs. Winter Park vs. Windermere',
    prompt: 'Compare Lake Nona, Winter Park, and Windermere for a family with kids. Pricing, schools, vibe, commute.',
    category: 'neighborhoods',
  },
  {
    label: 'Closing cost breakdown',
    prompt: 'Break down typical closing costs for buying a home in Orlando. What should I expect to pay at closing?',
    category: 'cost',
  },
  {
    label: 'New construction vs. resale',
    prompt: 'Should I buy new construction or resale in Orlando? What are the tradeoffs in Horizon West, Lake Nona, and Winter Garden?',
    category: 'process',
  },
  {
    label: 'Flood zones & sinkholes',
    prompt: 'Which Orlando neighborhoods are in flood zones or sinkhole risk areas? How do I check before buying?',
    category: 'risk',
  },
  {
    label: 'Commute to downtown / parks',
    prompt: 'What is the commute like from the major Orlando neighborhoods to downtown, the airport, and the theme parks?',
    category: 'lifestyle',
  },
  {
    label: 'First 90 days in Orlando',
    prompt: 'Help me plan my first 90 days in Orlando — utilities, healthcare, schools, drivers license. What is the playbook?',
    category: 'process',
  },
  {
    label: 'Investment / rental potential',
    prompt: 'Which Orlando submarkets are best for long-term rentals and which for short-term/Airbnb? Cap rates and cash flow?',
    category: 'cost',
  },
  {
    label: 'Family-friendly walkable areas',
    prompt: 'Which Orlando neighborhoods are walkable and family-friendly? I want sidewalks, parks, and community feel.',
    category: 'lifestyle',
  },
  {
    label: 'Down payment assistance',
    prompt: 'What financing programs are available in Orlando? FHA, VA, USDA, and any local down payment assistance?',
    category: 'process',
  },
]
