export interface ExtractedData {
  originCity?: string
  destinationCity?: string
  originZip?: string
  destinationZip?: string
  homeSize?: string
  moveDate?: string
  specialItems?: string[]
  flexibility?: 'locked' | 'flexible'
}

export type PanelView = 'orlando' | 'calculator' | 'companies' | 'checklist' | 'tipping' | 'storage' | 'vehicles'
