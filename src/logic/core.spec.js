import {
  prettyString,
  splitScheme,
  getGoalFromScheme,
  getNextScheme,
  hitTargets,
  hitTargetsT3,
  generateNextAfterExercise,
  getFirstNextWorkouts,
  nextWorkout,
  getPlatesArray,
  reducePlates
} from './core'

import defaults from '../data/defaults'

describe('prettyString', () => {
  it('replaces word', () => {
    expect(prettyString('ohp')).toBe('Overhead Press')
  })

  it("Upper cases words that it doesn't know", () => {
    expect(prettyString('pineapple')).toBe('Pineapple')
  })

  it('Upper cases eachword', () => {
    expect(prettyString('pineapple on a pizza')).toBe('Pineapple On A Pizza')
  })

  it('splits tier1 into Tier 1', () => {
    expect(prettyString('tier1')).toBe('Tier 1')
  })
})

describe('splitScheme', () => {
  it('returns correct sets and reps', () => {
    expect(splitScheme('5x3')).toEqual([5, 3])
  })
})

describe('getGoalFromScheme', () => {
  const a = getGoalFromScheme([5, 3])

  it('returns correct sets', () => {
    expect(a.length).toBe(5)
  })

  it('returns the correct reps', () => {
    a.forEach(x => expect(x).toBe(3))
  })
})

describe('getNextScheme', () => {
  const progression = ['5x3', '6x2', '10x1']
  it('returns the next scheme', () => {
    const next = getNextScheme(0, progression)
    expect(next).toBe(1)
  })

  it('wraps to the first scheme if needed', () => {
    const next = getNextScheme(2, progression)
    expect(next).toBe(0)
  })
})

describe('hitTargets', () => {
  it('returns false when target missed every set', () => {
    const result = hitTargets([5, 3])([0, 0, 0, 0, 0])
    expect(result).toBe(false)
  })

  it('returns false when target on one set', () => {
    const result = hitTargets([5, 3])([3, 2, 3, 3, 5])
    expect(result).toBe(false)
  })

  it('returns true when target on every set', () => {
    const result = hitTargets([5, 3])([3, 3, 3, 3, 3])
    expect(result).toBe(true)
  })

  it('returns true with amrap', () => {
    const result = hitTargets([5, 3])([3, 3, 3, 3, 4])
    expect(result).toBe(true)
  })
})

describe('hitTargetsT3', () => {
  it('returns false when under repped', () => {
    const result = hitTargetsT3(25, 15)([15, 15, 14])
    expect(result).toBe(false)
  })

  it('returns false when under repped and last set is good', () => {
    const result = hitTargetsT3(25, 15)([15, 14, 25])
    expect(result).toBe(false)
  })

  it('returns false when all sets good but not at target', () => {
    const result = hitTargetsT3(25, 15)([15, 15, 20])
    expect(result).toBe(false)
  })

  it('returns true when all sets good and at targets', () => {
    const result = hitTargetsT3(25, 15)([15, 15, 25])
    expect(result).toBe(true)
  })

  it('returns true when all sets over targets', () => {
    const result = hitTargetsT3(25, 15)([16, 16, 28])
    expect(result).toBe(true)
  })
})

describe('generateNextAfterExercise', () => {
  // nextWeights[tier][exercise]{scheme:, weight}
  const nextWeights = {
    tier1: {
      bench: {
        scheme: '6x2',
        weight: 57.5
      }
    },
    tier2: {
      bench: {
        scheme: '3x10',
        weight: 40
      }
    },
    tier3: {
      dbrow: {
        weight: 10
      }
    }
  }

  const settings = {
    increments: { kg: 2.5 },
    unit: 'kg',
    progressions: {
      tier1: ['5x3', '6x2', '10x1'],
      tier2: ['3x10', '3x8', '3x6'],
      tier3: ['3x15']
    }
  }

  it('returns an incremented weight if the exercise hit the target', () => {
    const result = generateNextAfterExercise(
      nextWeights,
      x => true,
      { tier: 'tier1', exercise: 'bench', weight: 57.5, scheme: '5x3' },
      settings
    )

    expect(result.tier1.bench.weight).toEqual(60)
  })

  it('returns the same if tier 3 fails target', () => {
    const result = generateNextAfterExercise(
      nextWeights,
      x => false,
      { tier: 'tier3', exercise: 'dbrow', weight: 10 },
      settings
    )

    expect(result.tier3.dbrow.weight).toEqual(10)
  })

  it('increments if tier 3 passes target', () => {
    const result = generateNextAfterExercise(
      nextWeights,
      x => true,
      { tier: 'tier3', exercise: 'dbrow', weight: 10 },
      settings
    )

    expect(result.tier3.dbrow.weight).toEqual(12.5)
  })

  it('returns an incremented scheme if the exercise fails the target', () => {
    const result = generateNextAfterExercise(
      nextWeights,
      x => false,
      { tier: 'tier2', exercise: 'bench', weight: 40, scheme: '3x10' },
      settings
    )

    expect(result.tier2.bench.scheme).toEqual('3x8')
  })

  it('returns a deload', () => {
    const result = generateNextAfterExercise(
      nextWeights,
      x => false,
      { tier: 'tier1', exercise: 'bench', weight: 90, scheme: '10x1' },
      settings
    )

    expect(result.tier1.bench.scheme).toEqual('5x3')
    expect(result.tier1.bench.weight).toEqual(77.5)
  })
})

describe('getFirstNextWorkouts', () => {
  const startingWeights = {
    tier1: {
      bench: 85,
      squat: 130,
      deadlift: 140,
      ohp: 40
    },
    tier2: {
      bench: 60,
      squat: 90,
      deadlift: 90,
      ohp: 20
    },
    tier3: {
      latpull: 30,
      dbrow: 10
    }
  }

  it('generates workout from starting weights', () => {
    const result = getFirstNextWorkouts(startingWeights, defaults.progressions)
    expect(result.tier1.bench.scheme).toEqual('5x3')
  })
})

describe('nextWorkout', () => {
  const nextWeights = {
    tier1: {
      squat: {
        scheme: '6x2',
        weight: 57.5
      },
      bench: {}
    },
    tier2: {
      bench: {
        scheme: '3x10',
        weight: 40
      }
    },
    tier3: {
      latpull: {
        weight: 10
      }
    }
  }
  it('generates a plan', () => {
    const result = nextWorkout(nextWeights, defaults.baseWorkouts[0])
    expect(result).toEqual({
      tier1: {
        squat: {
          scheme: '6x2',
          weight: 57.5
        }
      },
      tier2: {
        bench: {
          scheme: '3x10',
          weight: 40
        }
      },
      tier3: {
        latpull: {
          weight: 10
        }
      }
    })
  })
})

describe('reducePlates', () => {
  const firstReduce = reducePlates({ remainder: 55 }, 20)
  it('reduces the remainder value', () => {
    expect(firstReduce.remainder).toBe(15)
  })

  it('adds the correct plate value', () => {
    expect(firstReduce.used).toEqual([[20, 2]])
  })

  it('preserves the plate values', () => {
    const secondReduce = reducePlates(firstReduce, 10)
    expect(secondReduce.remainder).toBe(5)
    expect(secondReduce.used).toEqual([[20, 2], [10, 1]])
  })

  it("does't act if not needed", () => {
    const result = reducePlates({ remainder: 10 }, 25)
    expect(result.remainder).toBe(10)
  })
})

describe('getPlatesArray', () => {
  it('returns an empty object if weight is equal to bar', () => {
    const result = getPlatesArray(20, 'kg')
    expect(result.used).toEqual([])
  })

  it('returns the correct array for 22.5', () => {
    const result = getPlatesArray(22.5, 'kg')
    expect(result.used).toEqual([[1.25, 1]])
  })

  it('returns the correct array for multiple different plates', () => {
    const result = getPlatesArray(77.5, 'kg')
    expect(result.used).toEqual([[20, 1], [5, 1], [2.5, 1], [1.25, 1]])
  })

  it('returns the correct array for multiple 20kg plates', () => {
    const result = getPlatesArray(177.5, 'kg')
    expect(result.used).toEqual([[20, 3], [15, 1], [2.5, 1], [1.25, 1]])
  })

  it('works in pounds', () => {
    const result = getPlatesArray(400, 'lb')
    expect(result.used).toEqual([[45, 3], [35, 1], [5, 1], [2.5, 1]])
  })

  it('returns remainder', () => {
    const result = getPlatesArray(26, 'kg')
    expect(result.used).toEqual([[2.5, 1]])
    expect(result.remainder).toEqual(0.5)
  })
})
