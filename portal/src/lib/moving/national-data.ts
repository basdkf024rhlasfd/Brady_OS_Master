// National moving data - industry-average estimates for moving cost calculation
// Pricing models based on distance, home size, seasonality, and special items

// ============ DISTANCE-BASED PRICING MATRIX ============
// Base cost per mile by home size (industry averages)
export const BASE_COST_PER_MILE = {
  'studio': 0.50,
  '1BR': 0.70,
  '2BR': 0.95,
  '3BR': 1.20,
  '4BR': 1.50,
  '5BR+': 1.85,
  'house': 1.40, // average house
}

// Base labor/loading cost by home size
export const BASE_LABOR_COST = {
  'studio': 800,
  '1BR': 1200,
  '2BR': 1800,
  '3BR': 2600,
  '4BR': 3400,
  '5BR+': 4200,
  'house': 3000,
}

// ============ SPECIAL ITEM COSTS ============
export const SPECIAL_ITEM_COSTS: Record<string, { low: number; high: number; note: string }> = {
  'piano': { low: 800, high: 1500, note: 'Requires piano specialists. Grand pianos at high end.' },
  'grand piano': { low: 1200, high: 2500, note: 'Requires crane for some locations. Get specialist quote.' },
  'pool table': { low: 400, high: 800, note: 'Must be disassembled. Slate top adds cost.' },
  'hot tub': { low: 500, high: 1200, note: 'Requires special equipment. Some movers won\'t touch it.' },
  'gun safe': { low: 200, high: 600, note: 'Price based on weight. Heavy safes need equipment.' },
  'antiques': { low: 200, high: 800, note: 'Per piece. Requires extra packing and insurance.' },
  'artwork': { low: 100, high: 500, note: 'Per piece. Custom crating for valuable pieces.' },
  'wine collection': { low: 150, high: 400, note: 'Climate-controlled transport recommended.' },
  'gym equipment': { low: 150, high: 400, note: 'Treadmills and weight sets need disassembly.' },
  'motorcycle': { low: 300, high: 600, note: 'Usually shipped separately via auto transport.' },
  'aquarium': { low: 200, high: 500, note: 'Fish must be transported separately.' },
}

// ============ SEASONAL MULTIPLIERS ============
export const SEASONAL_MULTIPLIERS: Record<string, number> = {
  'january': 0.85,
  'february': 0.85,
  'march': 0.92,
  'april': 0.98,
  'may': 1.15,
  'june': 1.25,
  'july': 1.28,
  'august': 1.22,
  'september': 1.05,
  'october': 0.92,
  'november': 0.85,
  'december': 0.78
}

// ============ MAJOR CITY COORDINATES (for distance calc) ============
export const CITY_COORDINATES: Record<string, { lat: number; lng: number; state: string }> = {
  // Top 200 US cities + common aliases
  'new york': { lat: 40.7128, lng: -74.0060, state: 'NY' },
  'new york city': { lat: 40.7128, lng: -74.0060, state: 'NY' },
  'nyc': { lat: 40.7128, lng: -74.0060, state: 'NY' },
  'manhattan': { lat: 40.7831, lng: -73.9712, state: 'NY' },
  'brooklyn': { lat: 40.6782, lng: -73.9442, state: 'NY' },
  'queens': { lat: 40.7282, lng: -73.7949, state: 'NY' },
  'bronx': { lat: 40.8448, lng: -73.8648, state: 'NY' },
  'staten island': { lat: 40.5795, lng: -74.1502, state: 'NY' },
  'los angeles': { lat: 34.0522, lng: -118.2437, state: 'CA' },
  'la': { lat: 34.0522, lng: -118.2437, state: 'CA' },
  'chicago': { lat: 41.8781, lng: -87.6298, state: 'IL' },
  'houston': { lat: 29.7604, lng: -95.3698, state: 'TX' },
  'phoenix': { lat: 33.4484, lng: -112.0740, state: 'AZ' },
  'philadelphia': { lat: 39.9526, lng: -75.1652, state: 'PA' },
  'philly': { lat: 39.9526, lng: -75.1652, state: 'PA' },
  'san antonio': { lat: 29.4241, lng: -98.4936, state: 'TX' },
  'san diego': { lat: 32.7157, lng: -117.1611, state: 'CA' },
  'dallas': { lat: 32.7767, lng: -96.7970, state: 'TX' },
  'san jose': { lat: 37.3382, lng: -121.8863, state: 'CA' },
  'austin': { lat: 30.2672, lng: -97.7431, state: 'TX' },
  'jacksonville': { lat: 30.3322, lng: -81.6557, state: 'FL' },
  'fort worth': { lat: 32.7555, lng: -97.3308, state: 'TX' },
  'columbus': { lat: 39.9612, lng: -82.9988, state: 'OH' },
  'san francisco': { lat: 37.7749, lng: -122.4194, state: 'CA' },
  'sf': { lat: 37.7749, lng: -122.4194, state: 'CA' },
  'charlotte': { lat: 35.2271, lng: -80.8431, state: 'NC' },
  'indianapolis': { lat: 39.7684, lng: -86.1581, state: 'IN' },
  'seattle': { lat: 47.6062, lng: -122.3321, state: 'WA' },
  'denver': { lat: 39.7392, lng: -104.9903, state: 'CO' },
  'washington': { lat: 38.9072, lng: -77.0369, state: 'DC' },
  'washington dc': { lat: 38.9072, lng: -77.0369, state: 'DC' },
  'dc': { lat: 38.9072, lng: -77.0369, state: 'DC' },
  'boston': { lat: 42.3601, lng: -71.0589, state: 'MA' },
  'nashville': { lat: 36.1627, lng: -86.7816, state: 'TN' },
  'baltimore': { lat: 39.2904, lng: -76.6122, state: 'MD' },
  'oklahoma city': { lat: 35.4676, lng: -97.5164, state: 'OK' },
  'portland': { lat: 45.5152, lng: -122.6784, state: 'OR' },
  'las vegas': { lat: 36.1699, lng: -115.1398, state: 'NV' },
  'vegas': { lat: 36.1699, lng: -115.1398, state: 'NV' },
  'milwaukee': { lat: 43.0389, lng: -87.9065, state: 'WI' },
  'albuquerque': { lat: 35.0844, lng: -106.6504, state: 'NM' },
  'tucson': { lat: 32.2226, lng: -110.9747, state: 'AZ' },
  'fresno': { lat: 36.7378, lng: -119.7871, state: 'CA' },
  'sacramento': { lat: 38.5816, lng: -121.4944, state: 'CA' },
  'mesa': { lat: 33.4152, lng: -111.8315, state: 'AZ' },
  'atlanta': { lat: 33.7490, lng: -84.3880, state: 'GA' },
  'atl': { lat: 33.7490, lng: -84.3880, state: 'GA' },
  'miami': { lat: 25.7617, lng: -80.1918, state: 'FL' },
  'minneapolis': { lat: 44.9778, lng: -93.2650, state: 'MN' },
  'cleveland': { lat: 41.4993, lng: -81.6944, state: 'OH' },
  'raleigh': { lat: 35.7796, lng: -78.6382, state: 'NC' },
  'tampa': { lat: 27.9506, lng: -82.4572, state: 'FL' },
  'orlando': { lat: 28.5383, lng: -81.3792, state: 'FL' },
  'pittsburgh': { lat: 40.4406, lng: -79.9959, state: 'PA' },
  'cincinnati': { lat: 39.1031, lng: -84.5120, state: 'OH' },
  'st. louis': { lat: 38.6270, lng: -90.1994, state: 'MO' },
  'st louis': { lat: 38.6270, lng: -90.1994, state: 'MO' },
  'saint louis': { lat: 38.6270, lng: -90.1994, state: 'MO' },
  'kansas city': { lat: 39.0997, lng: -94.5786, state: 'MO' },
  'detroit': { lat: 42.3314, lng: -83.0458, state: 'MI' },
  'salt lake city': { lat: 40.7608, lng: -111.8910, state: 'UT' },
  'boise': { lat: 43.6150, lng: -116.2023, state: 'ID' },
  'honolulu': { lat: 21.3069, lng: -157.8583, state: 'HI' },
  'providence': { lat: 41.8240, lng: -71.4128, state: 'RI' },
  // Additional 150+ cities
  'memphis': { lat: 35.1495, lng: -90.0490, state: 'TN' },
  'louisville': { lat: 38.2527, lng: -85.7585, state: 'KY' },
  'richmond': { lat: 37.5407, lng: -77.4360, state: 'VA' },
  'new orleans': { lat: 29.9511, lng: -90.0715, state: 'LA' },
  'nola': { lat: 29.9511, lng: -90.0715, state: 'LA' },
  'buffalo': { lat: 42.8864, lng: -78.8784, state: 'NY' },
  'rochester': { lat: 43.1566, lng: -77.6088, state: 'NY' },
  'hartford': { lat: 41.7658, lng: -72.6734, state: 'CT' },
  'bridgeport': { lat: 41.1865, lng: -73.1952, state: 'CT' },
  'new haven': { lat: 41.3083, lng: -72.9279, state: 'CT' },
  'stamford': { lat: 41.0534, lng: -73.5387, state: 'CT' },
  'newark': { lat: 40.7357, lng: -74.1724, state: 'NJ' },
  'jersey city': { lat: 40.7178, lng: -74.0431, state: 'NJ' },
  'paterson': { lat: 40.9168, lng: -74.1718, state: 'NJ' },
  'trenton': { lat: 40.2171, lng: -74.7429, state: 'NJ' },
  'virginia beach': { lat: 36.8529, lng: -75.9780, state: 'VA' },
  'norfolk': { lat: 36.8508, lng: -76.2859, state: 'VA' },
  'arlington': { lat: 38.8799, lng: -77.1068, state: 'VA' },
  'alexandria': { lat: 38.8048, lng: -77.0469, state: 'VA' },
  'durham': { lat: 35.9940, lng: -78.8986, state: 'NC' },
  'greensboro': { lat: 36.0726, lng: -79.7920, state: 'NC' },
  'winston-salem': { lat: 36.0999, lng: -80.2442, state: 'NC' },
  'wilmington': { lat: 34.2257, lng: -77.9447, state: 'NC' },
  'charleston': { lat: 32.7765, lng: -79.9311, state: 'SC' },
  'columbia': { lat: 34.0007, lng: -81.0348, state: 'SC' },
  'greenville': { lat: 34.8526, lng: -82.3940, state: 'SC' },
  'savannah': { lat: 32.0809, lng: -81.0912, state: 'GA' },
  'augusta': { lat: 33.4735, lng: -81.9748, state: 'GA' },
  'st. petersburg': { lat: 27.7676, lng: -82.6403, state: 'FL' },
  'st petersburg': { lat: 27.7676, lng: -82.6403, state: 'FL' },
  'fort lauderdale': { lat: 26.1224, lng: -80.1373, state: 'FL' },
  'west palm beach': { lat: 26.7153, lng: -80.0534, state: 'FL' },
  'tallahassee': { lat: 30.4383, lng: -84.2807, state: 'FL' },
  'gainesville': { lat: 29.6516, lng: -82.3248, state: 'FL' },
  'sarasota': { lat: 27.3364, lng: -82.5307, state: 'FL' },
  'naples': { lat: 26.1420, lng: -81.7948, state: 'FL' },
  'pensacola': { lat: 30.4213, lng: -87.2169, state: 'FL' },
  'birmingham': { lat: 33.5207, lng: -86.8025, state: 'AL' },
  'montgomery': { lat: 32.3792, lng: -86.3077, state: 'AL' },
  'huntsville': { lat: 34.7304, lng: -86.5861, state: 'AL' },
  'mobile': { lat: 30.6954, lng: -88.0399, state: 'AL' },
  'jackson': { lat: 32.2988, lng: -90.1848, state: 'MS' },
  'baton rouge': { lat: 30.4515, lng: -91.1871, state: 'LA' },
  'shreveport': { lat: 32.5252, lng: -93.7502, state: 'LA' },
  'little rock': { lat: 34.7465, lng: -92.2896, state: 'AR' },
  'fayetteville': { lat: 36.0626, lng: -94.1574, state: 'AR' },
  'knoxville': { lat: 35.9606, lng: -83.9207, state: 'TN' },
  'chattanooga': { lat: 35.0456, lng: -85.3097, state: 'TN' },
  'lexington': { lat: 38.0406, lng: -84.5037, state: 'KY' },
  'toledo': { lat: 41.6528, lng: -83.5379, state: 'OH' },
  'akron': { lat: 41.0814, lng: -81.5190, state: 'OH' },
  'dayton': { lat: 39.7589, lng: -84.1916, state: 'OH' },
  'grand rapids': { lat: 42.9634, lng: -85.6681, state: 'MI' },
  'ann arbor': { lat: 42.2808, lng: -83.7430, state: 'MI' },
  'lansing': { lat: 42.7325, lng: -84.5555, state: 'MI' },
  'madison': { lat: 43.0731, lng: -89.4012, state: 'WI' },
  'green bay': { lat: 44.5133, lng: -88.0133, state: 'WI' },
  'st. paul': { lat: 44.9537, lng: -93.0900, state: 'MN' },
  'st paul': { lat: 44.9537, lng: -93.0900, state: 'MN' },
  'duluth': { lat: 46.7867, lng: -92.1005, state: 'MN' },
  'des moines': { lat: 41.5868, lng: -93.6250, state: 'IA' },
  'cedar rapids': { lat: 41.9779, lng: -91.6656, state: 'IA' },
  'iowa city': { lat: 41.6611, lng: -91.5302, state: 'IA' },
  'omaha': { lat: 41.2565, lng: -95.9345, state: 'NE' },
  'lincoln': { lat: 40.8136, lng: -96.7026, state: 'NE' },
  'wichita': { lat: 37.6872, lng: -97.3301, state: 'KS' },
  'topeka': { lat: 39.0473, lng: -95.6752, state: 'KS' },
  'tulsa': { lat: 36.1540, lng: -95.9928, state: 'OK' },
  'el paso': { lat: 31.7619, lng: -106.4850, state: 'TX' },
  'lubbock': { lat: 33.5779, lng: -101.8552, state: 'TX' },
  'corpus christi': { lat: 27.8006, lng: -97.3964, state: 'TX' },
  'plano': { lat: 33.0198, lng: -96.6989, state: 'TX' },
  'mcallen': { lat: 26.2034, lng: -98.2300, state: 'TX' },
  'amarillo': { lat: 35.2220, lng: -101.8313, state: 'TX' },
  'midland': { lat: 31.9973, lng: -102.0779, state: 'TX' },
  'beaumont': { lat: 30.0802, lng: -94.1266, state: 'TX' },
  'colorado springs': { lat: 38.8339, lng: -104.8214, state: 'CO' },
  'aurora': { lat: 39.7294, lng: -104.8319, state: 'CO' },
  'boulder': { lat: 40.0150, lng: -105.2705, state: 'CO' },
  'fort collins': { lat: 40.5853, lng: -105.0844, state: 'CO' },
  'scottsdale': { lat: 33.4942, lng: -111.9261, state: 'AZ' },
  'tempe': { lat: 33.4255, lng: -111.9400, state: 'AZ' },
  'chandler': { lat: 33.3062, lng: -111.8413, state: 'AZ' },
  'gilbert': { lat: 33.3528, lng: -111.7890, state: 'AZ' },
  'glendale': { lat: 33.5387, lng: -112.1860, state: 'AZ' },
  'flagstaff': { lat: 35.1983, lng: -111.6513, state: 'AZ' },
  'reno': { lat: 39.5296, lng: -119.8138, state: 'NV' },
  'henderson': { lat: 36.0395, lng: -114.9817, state: 'NV' },
  'spokane': { lat: 47.6588, lng: -117.4260, state: 'WA' },
  'tacoma': { lat: 47.2529, lng: -122.4443, state: 'WA' },
  'bellevue': { lat: 47.6101, lng: -122.2015, state: 'WA' },
  'olympia': { lat: 47.0379, lng: -122.9007, state: 'WA' },
  'eugene': { lat: 44.0521, lng: -123.0868, state: 'OR' },
  'salem': { lat: 44.9429, lng: -123.0351, state: 'OR' },
  'bend': { lat: 44.0582, lng: -121.3153, state: 'OR' },
  'oakland': { lat: 37.8044, lng: -122.2712, state: 'CA' },
  'long beach': { lat: 33.7701, lng: -118.1937, state: 'CA' },
  'bakersfield': { lat: 35.3733, lng: -119.0187, state: 'CA' },
  'anaheim': { lat: 33.8366, lng: -117.9143, state: 'CA' },
  'santa ana': { lat: 33.7455, lng: -117.8677, state: 'CA' },
  'riverside': { lat: 33.9533, lng: -117.3962, state: 'CA' },
  'stockton': { lat: 37.9577, lng: -121.2908, state: 'CA' },
  'irvine': { lat: 33.6846, lng: -117.8265, state: 'CA' },
  'santa rosa': { lat: 38.4405, lng: -122.7141, state: 'CA' },
  'modesto': { lat: 37.6391, lng: -120.9969, state: 'CA' },
  'oxnard': { lat: 34.1975, lng: -119.1771, state: 'CA' },
  'santa barbara': { lat: 34.4208, lng: -119.6982, state: 'CA' },
  'santa cruz': { lat: 36.9741, lng: -122.0308, state: 'CA' },
  'pasadena': { lat: 34.1478, lng: -118.1445, state: 'CA' },
  'palm springs': { lat: 33.8303, lng: -116.5453, state: 'CA' },
  'san bernardino': { lat: 34.1083, lng: -117.2898, state: 'CA' },
  'anchorage': { lat: 61.2181, lng: -149.9003, state: 'AK' },
  'juneau': { lat: 58.3005, lng: -134.4197, state: 'AK' },
  'sioux falls': { lat: 43.5446, lng: -96.7311, state: 'SD' },
  'fargo': { lat: 46.8772, lng: -96.7898, state: 'ND' },
  'billings': { lat: 45.7833, lng: -108.5007, state: 'MT' },
  'missoula': { lat: 46.8721, lng: -113.9940, state: 'MT' },
  'cheyenne': { lat: 41.1400, lng: -104.8202, state: 'WY' },
  'rapid city': { lat: 44.0805, lng: -103.2310, state: 'SD' },
  'bismarck': { lat: 46.8083, lng: -100.7837, state: 'ND' },
  'burlington': { lat: 44.4759, lng: -73.2121, state: 'VT' },
  'manchester': { lat: 42.9956, lng: -71.4548, state: 'NH' },
  'portland me': { lat: 43.6591, lng: -70.2568, state: 'ME' },
  'portland maine': { lat: 43.6591, lng: -70.2568, state: 'ME' },
  'bangor': { lat: 44.8016, lng: -68.7712, state: 'ME' },
  'worcester': { lat: 42.2626, lng: -71.8023, state: 'MA' },
  'springfield ma': { lat: 42.1015, lng: -72.5898, state: 'MA' },
  'springfield massachusetts': { lat: 42.1015, lng: -72.5898, state: 'MA' },
  'cambridge': { lat: 42.3736, lng: -71.1097, state: 'MA' },
  'albany': { lat: 42.6526, lng: -73.7562, state: 'NY' },
  'syracuse': { lat: 43.0481, lng: -76.1474, state: 'NY' },
  'yonkers': { lat: 40.9312, lng: -73.8987, state: 'NY' },
  'white plains': { lat: 41.0340, lng: -73.7629, state: 'NY' },
  'harrisburg': { lat: 40.2732, lng: -76.8867, state: 'PA' },
  'scranton': { lat: 41.4090, lng: -75.6624, state: 'PA' },
  'erie': { lat: 42.1292, lng: -80.0851, state: 'PA' },
  'allentown': { lat: 40.6084, lng: -75.4902, state: 'PA' },
  'wilmington de': { lat: 39.7391, lng: -75.5398, state: 'DE' },
  'wilmington delaware': { lat: 39.7391, lng: -75.5398, state: 'DE' },
  'dover': { lat: 39.1582, lng: -75.5244, state: 'DE' },
  'annapolis': { lat: 38.9784, lng: -76.4922, state: 'MD' },
  'charleston wv': { lat: 38.3498, lng: -81.6326, state: 'WV' },
  'charleston west virginia': { lat: 38.3498, lng: -81.6326, state: 'WV' },
  'morgantown': { lat: 39.6295, lng: -79.9559, state: 'WV' },
  'springfield il': { lat: 39.7817, lng: -89.6501, state: 'IL' },
  'springfield illinois': { lat: 39.7817, lng: -89.6501, state: 'IL' },
  'rockford': { lat: 42.2711, lng: -89.0940, state: 'IL' },
  'peoria': { lat: 40.6936, lng: -89.5890, state: 'IL' },
  'naperville': { lat: 41.7508, lng: -88.1535, state: 'IL' },
  'evansville': { lat: 37.9716, lng: -87.5711, state: 'IN' },
  'fort wayne': { lat: 41.0793, lng: -85.1394, state: 'IN' },
  'south bend': { lat: 41.6764, lng: -86.2520, state: 'IN' },
  'santa fe': { lat: 35.6870, lng: -105.9378, state: 'NM' },
  'las cruces': { lat: 32.3199, lng: -106.7637, state: 'NM' },
  'provo': { lat: 40.2338, lng: -111.6585, state: 'UT' },
  'ogden': { lat: 41.2230, lng: -111.9738, state: 'UT' },
  'st. george': { lat: 37.0965, lng: -113.5684, state: 'UT' },
  'st george': { lat: 37.0965, lng: -113.5684, state: 'UT' },
  'idaho falls': { lat: 43.4917, lng: -112.0339, state: 'ID' },
  'coeur d\'alene': { lat: 47.6777, lng: -116.7805, state: 'ID' },
  'great falls': { lat: 47.5002, lng: -111.3008, state: 'MT' },
  'casper': { lat: 42.8666, lng: -106.3131, state: 'WY' },
}

// ============ STATE CENTROIDS (fallback for unrecognized cities) ============
const STATE_CENTROIDS: Record<string, { lat: number; lng: number }> = {
  'AL': { lat: 32.806671, lng: -86.791130 },
  'AK': { lat: 61.370716, lng: -152.404419 },
  'AZ': { lat: 33.729759, lng: -111.431221 },
  'AR': { lat: 34.969704, lng: -92.373123 },
  'CA': { lat: 36.116203, lng: -119.681564 },
  'CO': { lat: 39.059811, lng: -105.311104 },
  'CT': { lat: 41.597782, lng: -72.755371 },
  'DE': { lat: 39.318523, lng: -75.507141 },
  'DC': { lat: 38.9072, lng: -77.0369 },
  'FL': { lat: 27.766279, lng: -81.686783 },
  'GA': { lat: 33.040619, lng: -83.643074 },
  'HI': { lat: 21.094318, lng: -157.498337 },
  'ID': { lat: 44.240459, lng: -114.478828 },
  'IL': { lat: 40.349457, lng: -88.986137 },
  'IN': { lat: 39.849426, lng: -86.258278 },
  'IA': { lat: 42.011539, lng: -93.210526 },
  'KS': { lat: 38.526600, lng: -96.726486 },
  'KY': { lat: 37.668140, lng: -84.670067 },
  'LA': { lat: 31.169546, lng: -91.867805 },
  'ME': { lat: 44.693947, lng: -69.381927 },
  'MD': { lat: 39.063946, lng: -76.802101 },
  'MA': { lat: 42.230171, lng: -71.530106 },
  'MI': { lat: 43.326618, lng: -84.536095 },
  'MN': { lat: 45.694454, lng: -93.900192 },
  'MS': { lat: 32.741646, lng: -89.678696 },
  'MO': { lat: 38.456085, lng: -92.288368 },
  'MT': { lat: 46.921925, lng: -110.454353 },
  'NE': { lat: 41.125370, lng: -98.268082 },
  'NV': { lat: 38.313515, lng: -117.055374 },
  'NH': { lat: 43.452492, lng: -71.563896 },
  'NJ': { lat: 40.298904, lng: -74.521011 },
  'NM': { lat: 34.840515, lng: -106.248482 },
  'NY': { lat: 42.165726, lng: -74.948051 },
  'NC': { lat: 35.630066, lng: -79.806419 },
  'ND': { lat: 47.528912, lng: -99.784012 },
  'OH': { lat: 40.388783, lng: -82.764915 },
  'OK': { lat: 35.565342, lng: -96.928917 },
  'OR': { lat: 44.572021, lng: -122.070938 },
  'PA': { lat: 40.590752, lng: -77.209755 },
  'RI': { lat: 41.680893, lng: -71.511780 },
  'SC': { lat: 33.856892, lng: -80.945007 },
  'SD': { lat: 44.299782, lng: -99.438828 },
  'TN': { lat: 35.747845, lng: -86.692345 },
  'TX': { lat: 31.054487, lng: -97.563461 },
  'UT': { lat: 40.150032, lng: -111.862434 },
  'VT': { lat: 44.045876, lng: -72.710686 },
  'VA': { lat: 37.769337, lng: -78.169968 },
  'WA': { lat: 47.400902, lng: -121.490494 },
  'WV': { lat: 38.491226, lng: -80.954453 },
  'WI': { lat: 44.268543, lng: -89.616508 },
  'WY': { lat: 42.755966, lng: -107.302490 },
}

// State name/abbreviation mapping for fallback parsing
const STATE_NAMES: Record<string, string> = {
  'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR',
  'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE',
  'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID',
  'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA', 'kansas': 'KS',
  'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
  'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
  'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV',
  'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY',
  'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK',
  'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
  'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV',
  'wisconsin': 'WI', 'wyoming': 'WY', 'district of columbia': 'DC',
}

// Try to extract state abbreviation from a city string like "Springfield, IL" or "Springfield IL"
function extractStateFromInput(input: string): string | null {
  const cleaned = input.trim().toLowerCase()

  // Try "City, ST" or "City ST" pattern (2-letter abbreviation)
  const abbrMatch = cleaned.match(/,?\s*([a-z]{2})$/)
  if (abbrMatch) {
    const abbr = abbrMatch[1].toUpperCase()
    if (STATE_CENTROIDS[abbr]) return abbr
  }

  // Try full state name at end: "Springfield, Illinois"
  for (const [name, abbr] of Object.entries(STATE_NAMES)) {
    if (cleaned.endsWith(name) || cleaned.includes(`, ${name}`)) return abbr
  }

  return null
}

// ============ NATIONAL MOVING COMPANIES ============
export interface CompanyProfile {
  name: string
  specialties: string[]
  redFlags: string[]
  priceTier: 'budget' | 'mid' | 'premium'
  nationwide: boolean
  phone?: string
  website?: string
  fictional?: boolean
}

export const NATIONAL_COMPANIES: CompanyProfile[] = [
  {
    name: 'United Van Lines',
    specialties: ['long-distance', 'corporate', 'international'],
    redFlags: [],
    priceTier: 'premium',
    nationwide: true,
    website: 'unitedvanlines.com'
  },
  {
    name: 'Allied Van Lines',
    specialties: ['long-distance', 'corporate', 'piano'],
    redFlags: [],
    priceTier: 'premium',
    nationwide: true,
    website: 'allied.com'
  },
  {
    name: 'Mayflower',
    specialties: ['long-distance', 'antiques', 'corporate'],
    redFlags: [],
    priceTier: 'premium',
    nationwide: true,
    website: 'mayflower.com'
  },
  {
    name: 'North American Van Lines',
    specialties: ['long-distance', 'corporate'],
    redFlags: [],
    priceTier: 'premium',
    nationwide: true,
    website: 'northamerican.com'
  },
  {
    name: 'Two Men and a Truck',
    specialties: ['local', 'long-distance', 'last-minute'],
    redFlags: [],
    priceTier: 'mid',
    nationwide: true,
    website: 'twomenandatruck.com'
  },
  {
    name: 'College Hunks Hauling Junk & Moving',
    specialties: ['local', 'junk removal', 'small moves'],
    redFlags: [],
    priceTier: 'mid',
    nationwide: true,
    website: 'collegehunkshaulingjunk.com'
  },
  {
    name: 'PODS',
    specialties: ['self-pack', 'storage', 'flexible timing'],
    redFlags: [],
    priceTier: 'mid',
    nationwide: true,
    website: 'pods.com'
  },
  {
    name: 'U-Pack',
    specialties: ['self-load', 'budget', 'long-distance'],
    redFlags: [],
    priceTier: 'budget',
    nationwide: true,
    website: 'upack.com'
  },
  {
    name: 'Safeway Moving',
    specialties: ['long-distance', 'full-service'],
    redFlags: [],
    priceTier: 'mid',
    nationwide: true,
    website: 'safewaymoving.com'
  },
  {
    name: 'International Van Lines',
    specialties: ['international', 'long-distance', 'corporate'],
    redFlags: [],
    priceTier: 'premium',
    nationwide: true,
    website: 'internationalvanlines.com'
  },
  // WARNING PATTERN EXAMPLES (fictional — these illustrate red flags to watch for)
  {
    name: '(Example) Suspiciously Cheap Movers',
    specialties: [],
    redFlags: ['bait-and-switch pricing', 'BBB F rating', 'hostage load reports'],
    priceTier: 'budget',
    nationwide: false,
    fictional: true,
  },
  {
    name: '(Example) No-Name Budget LLC',
    specialties: [],
    redFlags: ['significant damage complaints', 'poor communication', 'hidden fees'],
    priceTier: 'budget',
    nationwide: false,
    fictional: true,
  },
  {
    name: '(Example) Too-Good-To-Be-True Movers',
    specialties: [],
    redFlags: ['unlicensed in multiple states', 'no insurance verification', 'cash-only demands'],
    priceTier: 'budget',
    nationwide: false,
    fictional: true,
  }
]

// ============ TIPPING GUIDE ============
export const TIPPING_GUIDE = {
  local: {
    standard: '15-20% of total bill or $20-$30 per mover',
    exceptional: '$30-$50 per mover for excellent service',
    minimum: '$10-$15 per mover for small/quick moves',
    factors: [
      'Weather conditions (heat, rain, snow)',
      'Stairs and difficult access',
      'Heavy or awkward items',
      'Speed and care taken',
      'Attitude and professionalism'
    ]
  },
  longDistance: {
    loadingCrew: '$20-$40 per mover at origin',
    unloadingCrew: '$20-$40 per mover at destination',
    driver: '$50-$100 for the driver/foreman',
    note: 'Long-distance moves often have different crews for loading and unloading. Tip each crew separately.'
  },
  timing: 'Tip in cash at the END of each leg of the move, after inspecting for damage.',
  meals: 'Offering water, snacks, or buying lunch is appreciated but not expected.'
}

// ============ STORAGE COSTS ============
export const STORAGE_COSTS = {
  selfStorage: {
    '5x5': { low: 30, high: 75, description: 'Closet-size, boxes only' },
    '5x10': { low: 50, high: 100, description: 'Walk-in closet, studio apt' },
    '10x10': { low: 75, high: 150, description: '1BR apartment' },
    '10x15': { low: 100, high: 200, description: '2BR apartment' },
    '10x20': { low: 125, high: 275, description: '3BR home' },
    '10x30': { low: 175, high: 350, description: '4BR+ home' },
  },
  climateControlled: 'Add 25-50% for climate control',
  moverStorage: 'Moving company storage: $150-$300/month for portable container',
  firstMonthFree: 'Many facilities offer first month free or discounted'
}

// ============ VEHICLE SHIPPING ============
export const VEHICLE_SHIPPING = {
  openTransport: {
    under500: { low: 400, high: 700 },
    '500-1000': { low: 500, high: 900 },
    '1000-1500': { low: 700, high: 1100 },
    '1500-2000': { low: 800, high: 1200 },
    over2000: { low: 1000, high: 1500 },
  },
  enclosedTransport: 'Add 40-60% for enclosed carrier (luxury/classic cars)',
  motorcycle: { low: 300, high: 700, note: 'Varies by distance' },
  timing: '1-2 weeks typical. Expedited available at premium.',
  preparation: [
    'Remove personal items (not covered by insurance)',
    'Document existing damage with photos',
    'Keep fuel at 1/4 tank',
    'Disable alarm systems',
    'Provide one set of keys'
  ]
}

// ============ MOVING CHECKLIST ============
export const MOVING_CHECKLIST = {
  '8_weeks_before': [
    'Research moving companies and get at least 3 quotes',
    'Create a moving budget',
    'Start decluttering - donate, sell, or trash items',
    'If renting, give notice to landlord',
    'Research schools if you have children',
    'Gather important documents (birth certificates, medical records)',
  ],
  '6_weeks_before': [
    'Book your moving company (binding estimate)',
    'Arrange time off work for moving days',
    'Start using up frozen food and pantry items',
    'Begin collecting free boxes (grocery stores, liquor stores)',
    'Order specialty boxes for fragile items',
    'Notify your employer of address change',
  ],
  '4_weeks_before': [
    'Start packing non-essential items',
    'Notify utilities of disconnect/connect dates',
    'File change of address with USPS',
    'Update address with banks, subscriptions, etc.',
    'Arrange pet/child care for moving day',
    'Confirm details with moving company',
  ],
  '2_weeks_before': [
    'Continue packing - label boxes by room',
    'Confirm utility setup at new address',
    'Refill prescriptions',
    'Arrange to transfer or close gym memberships, etc.',
    'Plan travel if moving long distance',
    'Backup computer files and photos',
  ],
  '1_week_before': [
    'Finish packing everything except essentials',
    'Prepare an essentials box (toiletries, phone chargers, etc.)',
    'Defrost freezer',
    'Confirm arrival time with movers',
    'Get cash for tipping movers',
    'Take photos of electronics setup for re-assembly',
  ],
  'moving_day': [
    'Do final walkthrough of old home',
    'Check all closets, cabinets, drawers',
    'Read meter readings and take photos',
    'Be present to direct movers',
    'Inspect items before signing off',
    'Tip movers',
  ],
  'after_move': [
    'Unpack essentials box first',
    'Check all items against inventory for damage claims',
    'Update driver\'s license within 30 days',
    'Register to vote at new address',
    'Find new doctors, dentists, etc.',
    'Meet your neighbors!',
  ]
}

// ============ QUESTIONS TO ASK MOVERS ============
export const QUESTIONS_FOR_MOVERS = [
  { question: 'Are you licensed and insured?', why: 'Legit movers have USDOT numbers. Check at FMCSA.gov.' },
  { question: 'Is your estimate binding or non-binding?', why: 'Binding = final price. Non-binding = can increase.' },
  { question: 'What\'s included in the quote?', why: 'Packing, disassembly, long carry, stairs often extra.' },
  { question: 'Do you use subcontractors?', why: 'Subcontractors = less accountability if problems arise.' },
  { question: 'What\'s your damage claim rate?', why: 'Good companies track this. Expect under 5%.' },
  { question: 'What insurance options do you offer?', why: 'Basic is $0.60/lb. Full value costs more but covers actual value.' },
  { question: 'How do you handle delays?', why: 'Get specifics on compensation for late delivery.' },
  { question: 'Can I get references?', why: 'Reputable companies will provide recent customer contacts.' },
  { question: 'What\'s your cancellation policy?', why: 'Understand fees if your plans change.' },
  { question: 'Will you do a walkthrough before quoting?', why: 'Phone/video estimates are less accurate. In-person is better.' },
]

// ============ DISTANCE CALCULATOR ============
function haversineDistance(
  oLat: number, oLng: number, dLat: number, dLng: number
): number {
  const R = 3959 // Earth's radius in miles
  const dLatR = (dLat - oLat) * Math.PI / 180
  const dLngR = (dLng - oLng) * Math.PI / 180
  const a =
    Math.sin(dLatR/2) * Math.sin(dLatR/2) +
    Math.cos(oLat * Math.PI / 180) * Math.cos(dLat * Math.PI / 180) *
    Math.sin(dLngR/2) * Math.sin(dLngR/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

function resolveCoords(input: string): { lat: number; lng: number; exact: boolean } | null {
  // Try exact city match first
  const city = CITY_COORDINATES[input.toLowerCase().trim()]
  if (city) return { lat: city.lat, lng: city.lng, exact: true }

  // Try stripping state suffix: "Dallas, TX" -> "Dallas"
  const withoutState = input.replace(/,?\s*[A-Za-z]{2}$/, '').trim()
  const cityNoState = CITY_COORDINATES[withoutState.toLowerCase()]
  if (cityNoState) return { lat: cityNoState.lat, lng: cityNoState.lng, exact: true }

  // Fallback: use state centroid if we can extract a state
  const stateAbbr = extractStateFromInput(input)
  if (stateAbbr && STATE_CENTROIDS[stateAbbr]) {
    const centroid = STATE_CENTROIDS[stateAbbr]
    return { lat: centroid.lat, lng: centroid.lng, exact: false }
  }

  // Try looking up the city entry's state to find a centroid
  // (handles cases where CITY_COORDINATES has the city but under a different key)
  return null
}

export interface DistanceResult {
  miles: number
  approximate: boolean // true if based on state centroids
}

export function calculateDistance(origin: string, destination: string): number | null {
  const result = calculateDistanceDetailed(origin, destination)
  return result ? result.miles : null
}

export function calculateDistanceDetailed(origin: string, destination: string): DistanceResult | null {
  const o = resolveCoords(origin)
  const d = resolveCoords(destination)

  if (!o || !d) return null

  const distance = haversineDistance(o.lat, o.lng, d.lat, d.lng)
  // Add 15% for road vs straight-line distance
  const roadDistance = Math.round(distance * 1.15)
  const approximate = !o.exact || !d.exact

  return { miles: roadDistance, approximate }
}

// ============ ESTIMATE CALCULATOR ============
export interface EstimateResult {
  range: { low: number; high: number }
  confidence: number // 0-100
  factors: Array<{ label: string; impact: string; applied: boolean }>
  warnings: string[]
}

export function calculateEstimate(params: {
  origin?: string
  destination?: string
  homeSize?: string
  moveMonth?: string
  specialItems?: string[]
  flexibility?: 'locked' | 'flexible'
}): EstimateResult {
  const factors: EstimateResult['factors'] = []
  const warnings: string[] = []
  let confidence = 20 // Start with national average confidence
  let baseCost = 3500 // National average
  let lowMultiplier = 0.7
  let highMultiplier = 1.4

  // Distance factor
  if (params.origin && params.destination) {
    const distResult = calculateDistanceDetailed(params.origin, params.destination)
    if (distResult) {
      const sizeKey = params.homeSize?.toLowerCase().replace('-', '').replace(' ', '') || '2BR'
      const perMile = BASE_COST_PER_MILE[sizeKey as keyof typeof BASE_COST_PER_MILE] || 0.95
      const laborCost = BASE_LABOR_COST[sizeKey as keyof typeof BASE_LABOR_COST] || 1800

      baseCost = laborCost + (distResult.miles * perMile)
      const distLabel = distResult.approximate
        ? `Distance: ~${distResult.miles.toLocaleString()} mi (approx)`
        : `Distance: ${distResult.miles.toLocaleString()} mi`
      factors.push({
        label: distLabel,
        impact: `+$${Math.round(distResult.miles * perMile).toLocaleString()}`,
        applied: true
      })

      if (distResult.approximate) {
        // Partial confidence for state-centroid-based distance
        confidence += 15
        lowMultiplier = 0.75
        highMultiplier = 1.35
      } else {
        confidence += 25
        lowMultiplier = 0.85
        highMultiplier = 1.25
      }

      // Hawaii warning
      if (params.origin.toLowerCase().includes('honolulu') || params.destination?.toLowerCase().includes('honolulu')) {
        warnings.push('Hawaii moves require ocean freight. Estimate may be significantly higher.')
        baseCost *= 1.8
      }
    } else {
      factors.push({ label: 'Distance', impact: 'Need both cities', applied: false })
    }
  } else {
    factors.push({ label: 'Distance', impact: 'Unknown', applied: false })
  }

  // Home size factor
  if (params.homeSize) {
    const sizeKey = params.homeSize.toLowerCase().replace('-', '').replace(' ', '')
    const laborCost = BASE_LABOR_COST[sizeKey as keyof typeof BASE_LABOR_COST]
    if (laborCost) {
      factors.push({
        label: `Home size: ${params.homeSize}`,
        impact: `Base: $${laborCost.toLocaleString()}`,
        applied: true
      })
      confidence += 20
    }
  } else {
    factors.push({ label: 'Home size', impact: 'Unknown', applied: false })
  }

  // Seasonal factor
  if (params.moveMonth) {
    const month = params.moveMonth.toLowerCase()
    const multiplier = SEASONAL_MULTIPLIERS[month] || 1.0
    if (multiplier !== 1.0) {
      const impact = multiplier > 1
        ? `+${Math.round((multiplier - 1) * 100)}%`
        : `-${Math.round((1 - multiplier) * 100)}%`
      factors.push({
        label: `Season: ${params.moveMonth}`,
        impact,
        applied: true
      })
      baseCost *= multiplier
      confidence += 10

      if (multiplier >= 1.2) {
        warnings.push('Peak season (May-Aug) means higher prices and less availability. Book early!')
      }
    }
  } else {
    factors.push({ label: 'Move date', impact: 'Unknown', applied: false })
  }

  // Special items
  if (params.specialItems && params.specialItems.length > 0) {
    let specialTotal = 0
    for (const item of params.specialItems) {
      const itemData = SPECIAL_ITEM_COSTS[item.toLowerCase()]
      if (itemData) {
        const avgCost = (itemData.low + itemData.high) / 2
        specialTotal += avgCost
        factors.push({
          label: `Special: ${item}`,
          impact: `+$${itemData.low}-$${itemData.high}`,
          applied: true
        })
      }
    }
    baseCost += specialTotal
    confidence += 5
  }

  // Flexibility factor
  if (params.flexibility === 'flexible') {
    factors.push({
      label: 'Flexible dates',
      impact: '-5-10%',
      applied: true
    })
    lowMultiplier *= 0.92
    confidence += 5
  } else if (params.flexibility === 'locked') {
    factors.push({
      label: 'Fixed date',
      impact: 'No flexibility discount',
      applied: true
    })
    confidence += 5
  } else {
    factors.push({ label: 'Date flexibility', impact: 'Unknown', applied: false })
  }

  // Cap confidence at 95
  confidence = Math.min(confidence, 95)

  return {
    range: {
      low: Math.round(baseCost * lowMultiplier / 100) * 100,
      high: Math.round(baseCost * highMultiplier / 100) * 100
    },
    confidence,
    factors,
    warnings
  }
}

// ============ RFQ EMAIL GENERATOR ============
export function generateRFQEmail(params: {
  origin: string
  destination: string
  homeSize: string
  moveDate: string
  specialItems?: string[]
  companyName: string
}): string {
  const specialItemsList = params.specialItems?.length
    ? `\n\nSpecial items requiring extra care:\n${params.specialItems.map(i => `• ${i}`).join('\n')}`
    : ''

  return `Subject: Quote Request: ${params.origin} to ${params.destination} - ${params.homeSize}

Hi ${params.companyName} team,

I'm planning a move and would like to request a quote:

Move Details:
• From: ${params.origin}
• To: ${params.destination}
• Home size: ${params.homeSize}
• Target date: ${params.moveDate}${specialItemsList}

I'm comparing several companies and looking for:
1. A binding estimate (not non-binding)
2. Full breakdown of what's included vs. extra charges
3. Your insurance options and damage claim rate
4. References from recent customers on this route

Please let me know your availability for an in-home or video estimate.

Thank you,
[Your name]
[Your phone]
[Your email]`
}

// ============ SHARE WITH MOVER TEMPLATE ============
export function generateMoveSheet(params: {
  origin: string
  destination: string
  homeSize: string
  moveDate: string
  specialItems?: string[]
  estimateRange: { low: number; high: number }
}): string {
  return `
═══════════════════════════════════════════════════════════
                      MOVE SUMMARY
═══════════════════════════════════════════════════════════

ROUTE
  From: ${params.origin}
  To:   ${params.destination}

DETAILS
  Home size:    ${params.homeSize}
  Target date:  ${params.moveDate}
  ${params.specialItems?.length ? `Special items: ${params.specialItems.join(', ')}` : ''}

EXPECTED COST RANGE
  $${params.estimateRange.low.toLocaleString()} - $${params.estimateRange.high.toLocaleString()}
  (Based on industry pricing models and distance calculation)

═══════════════════════════════════════════════════════════

QUESTIONS I'LL BE ASKING:
□ Is your estimate binding or non-binding?
□ What's included vs. extra (packing, stairs, long carry)?
□ What's your damage claim rate?
□ Can you provide references for this route?
□ What are your insurance options?

═══════════════════════════════════════════════════════════
`
}
