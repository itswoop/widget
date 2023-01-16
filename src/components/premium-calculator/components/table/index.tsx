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

  const { years, yearsWithChange, compoundValues } = calculateData(
    item,
    startingPremium,
  )

  const gridTemplateColumns = `repeat(${years.length + 1}, 1fr)`

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr style={{ gridTemplateColumns }}>
            <th className={styles.fixed} />
            {years.map(year => (
              <th key={year}>{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={{ gridTemplateColumns }}>
            <th className={styles.fixed}>% Change</th>
            {yearsWithChange.map(({ year, percentInteger }) => (
              <td key={year}>
                {percentInteger === null
                  ? '–'
                  : `${formatDecimalString(percentInteger, 1)}%`}
              </td>
            ))}
          </tr>

          <tr className={styles.summary} style={{ gridTemplateColumns }}>
            <th className={styles.fixed}>Annual payment</th>
            {compoundValues.map((value, index) => (
              <td key={index}>{formatMoneyString(value)}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <p className={styles.explainer}>
        {carrier} has increased their premiums in {state} over the last{' '}
        {years.length - 1} years. This means that if your annual insurance
        payment was <strong>{formatMoneyString(startingPremium)}</strong> in{' '}
        {years[0]}, you would be paying{' '}
        <strong>
          {formatMoneyString(compoundValues[compoundValues.length - 1])}
        </strong>{' '}
        today.
      </p>
    </div>
  )
}
