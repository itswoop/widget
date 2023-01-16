import type { Row } from '../../types'

/**
 * Parse a string array of possible years, and return an array of numbers with an additional year at the start.
 */
export const parseYears = (years: string[]) => {
  const validYears = years.map(Number).filter(year => !isNaN(year))
  const minYear = Math.min(...validYears)
  return [minYear - 1, ...validYears]
}

/**
 * Using the year percentage data from a row, map each year to its percentage as an integer.
 */
export const parseChangesPerYear = (years: number[], data: Row) =>
  years.map(year => {
    const value = Number(data[year]?.replace('%', ''))
    return { year, percentInteger: isNaN(value) ? null : value }
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
  const years = parseYears(Object.keys(data))

  const yearsWithChange = parseChangesPerYear(years, data)

  const compoundValues = calculateCompoundValues(
    startingPremium,
    yearsWithChange.slice(1).map(({ percentInteger }) => percentInteger!),
  )

  return { years, yearsWithChange, compoundValues }
}
