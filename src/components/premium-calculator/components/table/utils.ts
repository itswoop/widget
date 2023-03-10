import type { Row } from '../../types'

/**
 * Parse a string array of possible years, and return an array of numbers with an additional year at the start.
 */
export const parseAndPadYears = (years: string[]) => {
  const validYears = years
    .map(year => {
      if (year === '') return null
      const yearNumber = Number(year)
      if (Number.isNaN(yearNumber)) return null
      return yearNumber
    })
    .filter(Boolean) as number[]

  if (validYears.length === 0) return []
  const minYear = Math.min(...validYears)
  return [minYear - 1, ...validYears]
}

/**
 * Using the year percentage data from a row, map each year to its percentage as an integer.
 */
export const parseChangesPerYear = (years: number[], data: Row) =>
  years.map(year => {
    const str = data[year]?.replace('%', '')
    const percentInteger = str === '' || str === undefined ? null : Number(str)
    return { year, percentInteger }
  })

/**
 * Calculate the compound percentage interest for a given start value and an array of percentages.
 *
 * @returns An array of values, with the first being the start value.
 */
export const calculateCompoundValues = (
  start: number,
  percentages: number[],
) => {
  let acc = start
  const values = [start]
  percentages.forEach(percent => values.push((acc += acc * (percent / 100))))
  return values
}

/**
 * Calculate all display data for a row.
 */
export const calculateData = (data: Row, startingPremium = 1000) => {
  const years = parseAndPadYears(Object.keys(data))

  const yearsWithChange = parseChangesPerYear(years, data)

  const compoundValues = calculateCompoundValues(
    startingPremium,
    yearsWithChange.slice(1).map(({ percentInteger }) => percentInteger!),
  )

  const finalValue = compoundValues[compoundValues.length - 1]
  const diff = finalValue - startingPremium
  const percentChange = (diff / startingPremium) * 100

  return { years, yearsWithChange, compoundValues, percentChange }
}
