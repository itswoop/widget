import { formatMoneyString } from '../../../../utils/format'
import type { Row } from '../../types'
import styles from './table.module.css'
import {
  calculateCompoundValues,
  parseYears,
  parseChangesPerYear,
} from './utils'

type PremiumTableProps = {
  item?: Row | null
  startingPremium?: number
}

export const PremiumTable: React.FC<PremiumTableProps> = ({
  item,
  startingPremium = 1000,
}) => {
  if (!item) return null

  const years = parseYears(Object.keys(item))
  const yearsWithChange = parseChangesPerYear(years, item)
  const compound = calculateCompoundValues(
    startingPremium,
    yearsWithChange.slice(1).map(({ percentInteger }) => percentInteger!),
  )

  const gridTemplateColumns = `repeat(${years.length + 1}, 1fr)`

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr style={{ gridTemplateColumns }}>
            <th></th>
            {years.map(year => (
              <th key={year}>{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={{ gridTemplateColumns }}>
            <th>% Change</th>
            {yearsWithChange.map(({ year, percentInteger }) => (
              <td key={year}>
                {percentInteger === null ? '–' : `${percentInteger}%`}
              </td>
            ))}
          </tr>

          <tr className={styles.summary} style={{ gridTemplateColumns }}>
            <th>Premium</th>
            {compound.map((value, index) => (
              <td key={index}>{formatMoneyString(value)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
