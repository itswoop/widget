import type { Row } from './types'

/**
 * Get all unique carriers from the list of rows.
 */
export const getCarriers = (rows: Row[]) => [
  ...new Set(rows.map(row => row.carrier).filter(Boolean)),
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

export const getStateCodesForCarrier = (
  rows: Row[],
  carrier?: string | null,
) => {
  if (!carrier) return []
  return rows
    .filter(row => row.carrier === carrier)
    .map(row => row.state)
    .filter(Boolean)
}
