import { formatMoneyString } from '../../../../utils/format'
import type { Row } from '../../types'
import styles from './table.module.css'
import {
  calculateCompoundValues,
  parseYears,
  parseChangesPerYear,
} from './utils'

type PremiumTableProps = {
  rows: Row[]
  carrier: string
  state: string
}

export const PremiumTable: React.FC<PremiumTableProps> = ({
  rows,
  carrier,
  state,
}) => {
  if (!rows) return null

  const data = rows.find(
    row =>
      row.carrier.toLowerCase() === carrier.toLowerCase() &&
      row.state.toLowerCase() === state.toLowerCase(),
  )

  if (!data) return null

  const years = parseYears(Object.keys(data))
  const yearsWithChange = parseChangesPerYear(years, data)
  const compound = calculateCompoundValues(
    1000,
    yearsWithChange.slice(1).map(({ percentInteger }) => percentInteger!),
  )

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            {years.map(year => (
              <th key={year}>{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Change</th>
            {yearsWithChange.map(({ year, percentInteger }) => (
              <td key={year}>
                {percentInteger === null ? '–' : `${percentInteger}%`}
              </td>
            ))}
          </tr>

          <tr className={styles.summary}>
            <th>Example</th>
            {compound.map((value, index) => (
              <td key={index}>{formatMoneyString(value)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
