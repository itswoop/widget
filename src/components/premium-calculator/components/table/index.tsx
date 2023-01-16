import {
  formatDecimalString,
  formatMoneyString,
} from '../../../../utils/format'
import type { Row } from '../../types'
import styles from './table.module.css'
import { calculateData } from './utils'

type PremiumTableProps = {
  item?: Row | null
  carrier?: string | null
  state?: string | null
  startingPremium?: number
}

export const PremiumTable: React.FC<PremiumTableProps> = ({
  item,
  carrier,
  state,
  startingPremium = 1000,
}) => {
  if (!item || !carrier || !state) return null

  const { years, yearsWithChange, percentIncrease, compoundValues } =
    calculateData(item, startingPremium)

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
            {compoundValues.map((value, index) => (
              <td key={index}>{formatMoneyString(value)}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <p>
        {carrier} has increased their premiums by{' '}
        {formatDecimalString(percentIncrease, 1)}% in {state} over the last{' '}
        {years.length - 1} years. This means that if your insurance premium was{' '}
        <strong>{formatMoneyString(startingPremium)}</strong> in {years[0]}, you
        would be paying{' '}
        <strong>
          {formatMoneyString(compoundValues[compoundValues.length - 1])}
        </strong>{' '}
        today.
      </p>
    </div>
  )
}
