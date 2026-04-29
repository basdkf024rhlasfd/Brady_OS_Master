const ORLANDO_METRO_CITIES = new Set([
  'orlando',
  'winter park',
  'winter garden',
  'lake nona',
  'windermere',
  'kissimmee',
  'sanford',
  'horizon west',
  'dr. phillips',
  'dr phillips',
  'doctor phillips',
  'apopka',
  'ocoee',
  'oviedo',
  'maitland',
  'casselberry',
  'altamonte springs',
  'longwood',
  'lake mary',
  'baldwin park',
  'thornton park',
  'college park',
  'audubon park',
  'belle isle',
  'hunters creek',
  'celebration',
  'st. cloud',
  'st cloud',
  'saint cloud',
  'clermont',
  'mount dora',
  'eustis',
  'tavares',
  'leesburg',
  'minneola',
  'groveland',
  'davenport',
  'hamlin',
  'bay hill',
  'oakland',
  'gotha',
  'ferncreek',
  'union park',
  'pine castle',
  'edgewood',
  'azalea park',
  'conway',
  'meadow woods',
  'bithlo',
  'wekiva springs',
  'forest city',
])

export function isOrlandoMetro(city?: string): boolean {
  if (!city) return false
  const normalized = city
    .toLowerCase()
    .replace(/,\s*(fl|florida)\.?$/i, '')
    .replace(/\s+fl$/i, '')
    .trim()
  return ORLANDO_METRO_CITIES.has(normalized)
}
