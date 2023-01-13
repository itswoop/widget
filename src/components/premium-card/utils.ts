import type { Row } from './types'

/**
 * Get all unique carriers from the list of rows.
 */
export const getCarriers = (rows: Row[]) => [
  ...new Set(rows.map(row => row.carrier)),
]

/**
 * Find a row by single carrier and state code.
 */
export const findRow = (
  rows: Row[],
  carrier?: string | null,
  stateCode?: string | null,
) => {
  if (!carrier || !stateCode) return null

  return (
    rows.find(
      row =>
        row.carrier.toLowerCase() === carrier.toLowerCase() &&
        row.state.toLowerCase() === stateCode.toLowerCase(),
    ) || null
  )
}
