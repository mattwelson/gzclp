export default {
  unit: 'kg',
  increments: {
    kg: 2.5,
    lb: 5
  },
  bars: {
    kg: 20,
    lb: 45
  },
  plates: {
    kg: [20, 15, 10, 5, 2.5, 1.25]
  },
  baseWorkouts: [
    {
      tier1: ['squat'],
      tier2: ['bench'],
      tier3: ['latpull']
    },
    {
      tier1: ['ohp'],
      tier2: ['deadlift'],
      tier3: ['dbrow']
    },
    {
      tier1: ['bench'],
      tier2: ['squat'],
      tier3: ['latpull']
    },
    {
      tier1: ['deadlift'],
      tier2: ['ohp'],
      tier3: ['dbrow']
    }
  ],
  progressions: {
    tier1: ['5x3', '6x2', '10x1'],
    tier2: ['3x10', '3x8', '3x6'],
    tier3: ['3x15']
  },
  targets: {
    tier3: 25
  },
  prettyText: {
    ohp: 'overhead press',
    latpull: 'lat pulldown',
    dbrow: 'dumbbell row',
    bench: 'bench press',
    tier1: 'tier 1',
    tier2: 'tier 2',
    tier3: 'tier 3'
  },
  rest: {
    tier1: {
      min: 180,
      max: 300
    },
    tier2: {
      min: 120,
      max: 180
    },
    tier3: {
      min: 60,
      max: 90
    }
  }
}
