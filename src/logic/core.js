export const splitScheme = (scheme, delineator = 'x') =>
  scheme.split(delineator).map(Number)

export const getGoalFromScheme = ([sets, reps]) => Array(sets).fill(reps)

export const getSchemeIndex = (scheme, progression) =>
  progression.indexOf(scheme)

export const getNextScheme = (index, progression) =>
  (index + 1) % progression.length

export const hitTargets = ([sets, reps]) => setResults =>
  setResults.length >= sets && setResults.every(r => r >= reps)

export const hitTargetsT3 = (target, normalTarget) => setResults =>
  setResults.every(
    (x, i) => (i + 1 === setResults.length ? x >= target : x >= normalTarget)
  )

export const deload = (weight, increment, percentage = 0.85) =>
  Math.round(weight * percentage / increment) * increment

export const generateNextAfterExercise = (
  nextWeights,
  didSucceedTest,
  { exercise, tier, weight, scheme, setResults },
  { progressions, increments, unit }
) => {
  const newNextWeights = { ...nextWeights }
  // if target hit then increment weight
  if (didSucceedTest(setResults)) {
    newNextWeights[tier][exercise].weight = weight + increments[unit]
    return newNextWeights
  }

  // if tier 3 just leave it the same (but copy the weight incase the user set it)
  if (tier === 'tier3') {
    newNextWeights[tier][exercise].weight = weight
    return newNextWeights
  }

  // else proceed to next scheme
  const progression = progressions[tier]
  const schemeIndex = getSchemeIndex(scheme, progression)
  const nextSchemeIndex = getNextScheme(schemeIndex, progression)

  if (nextSchemeIndex > schemeIndex) {
    // leave weight the same, bump schemeIndex
    newNextWeights[tier][exercise].scheme = progression[nextSchemeIndex]
    return newNextWeights
  }

  // if tier 1 or 2 and the next scheme is starting again, then lower the weight
  newNextWeights[tier][exercise] = {
    ...newNextWeights[tier][exercise],
    weight: deload(weight, increments[unit]),
    scheme: progression[nextSchemeIndex]
  }
  return newNextWeights
}

export default {
  splitScheme,
  getGoalFromScheme,
  getNextScheme,
  hitTargets,
  deload,
  generateNextAfterExercise
}
