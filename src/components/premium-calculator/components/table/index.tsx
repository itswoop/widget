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

  const { years, yearsWithChange, compoundValues, percentChange } =
    calculateData(item, startingPremium)

  const gridTemplateColumns = `repeat(${years.length + 1}, 1fr)`

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tableWrapper}>
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
        </div>
        <p className={styles.explainer}>
          {carrier} has {percentChange >= 0 ? 'increased' : 'decreased'} their
          premiums by {formatDecimalString(percentChange, 1)}% in {state} over
          the last {years.length - 1} years. This means that if your annual
          insurance payment was{' '}
          <strong>{formatMoneyString(startingPremium)}</strong> in {years[0]},
          you would be paying{' '}
          <strong>
            {formatMoneyString(compoundValues[compoundValues.length - 1])}
          </strong>{' '}
          today.
        </p>
      </div>

      <p className={styles.legal}>
        This information is aggregate data from public insurance filings and is
        only intended for illustrative purposes. Significant variation may occur
        based on individual experience or incomplete data. Please connect your
        policy for specific details based on your individual experience.
      </p>
    </div>
  )
}
