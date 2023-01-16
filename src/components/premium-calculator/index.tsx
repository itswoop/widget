import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { State } from '../../constants/states'
import { URLS } from '../../constants/urls'
import { parseRemoteCsv } from '../../utils/parse'
import styles from './calculator.module.css'
import { CarrierSelector } from './components/selectors/carrier'
import { StateSelector } from './components/selectors/state'
import { PremiumTable } from './components/table'
import type { Row } from './types'
import { findRow, getCarriers } from './utils'

export const PremiumCalculator = () => {
  const [carrier, setCarrier] = useState<string | null>(null)
  const [state, setState] = useState<State | null>(null)
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    parseRemoteCsv<Row>(URLS.CSV_DATA, { header: true }).then(({ data }) =>
      setRows(data),
    )
  }, [])

  const carriers = getCarriers(rows)
  const row = findRow(rows, carrier, state?.code)

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.form}>
          <CarrierSelector carriers={carriers} onChange={setCarrier} />
          <StateSelector onChange={setState} />
        </div>

        {!row && (
          <div className={styles.empty}>
            <p>
              Select your insurance carrier and state to see how much your
              carrier has increased your premium over time.
            </p>
          </div>
        )}

        <Transition
          show={!!row && !!carrier && !!state}
          className={styles.table}
          enter={styles.transition}
          enterFrom={styles.transitionFrom}
          enterTo={styles.transitionTo}
          leave={styles.transition}
          leaveFrom={styles.transitionTo}
          leaveTo={styles.transitionFrom}
        >
          <PremiumTable state={state?.name} carrier={carrier} item={row} />
        </Transition>
      </div>
    </div>
  )
}
