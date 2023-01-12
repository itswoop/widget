import { Row } from '.'

export const formatYears = (years: string[]) => {
  const validYears = years.map(Number).filter(year => !isNaN(year))
  const minYear = Math.min(...validYears)
  return [minYear - 1, ...validYears]
}

export const parseChangesPerYear = (years: number[], data: Row) =>
  years.map(year => ({
    year,
    percentInteger: Number(data[year]?.replace('%', '')) || null,
  }))

export const calculateCompound = (start: number, percentages: number[]) => {
  let values = [start]
  let acc = start
  percentages.forEach(percent => values.push((acc += acc * (percent / 100))))
  return values
}
