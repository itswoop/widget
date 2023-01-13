import type { Row } from './types'

export const getCarriers = (rows: Row[]) => [
  ...new Set(rows.map(row => row.carrier)),
]
