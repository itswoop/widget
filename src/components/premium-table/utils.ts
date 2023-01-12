import { Row } from '.'

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
  years.map(year => ({
    year,
    percentInteger: Number(data[year]?.replace('%', '')) || null,
  }))

/**
 * Calculate the compound percentage interest for a given start value and an array of percentages.
 *
 * Returns an array of values, not the final interest, with the first value being the start value.
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
