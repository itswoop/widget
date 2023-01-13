import { useEffect, useState } from 'react'
import { URLS } from '../../constants/data'
import { State } from '../../constants/states'
import { parseRemoteCsv } from '../../utils/parse'
import { Button } from '../form/button'
import styles from './card.module.css'
import { CarrierSelector } from './components/selectors/carrier'
import { StateSelector } from './components/selectors/state'
import { PremiumTable } from './components/table'
import type { Row } from './types'
import { getCarriers } from './utils'

export const PremiumCard = () => {
  const [carrier, setCarrier] = useState<string | null>(null)
  const [state, setState] = useState<State | null>(null)
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    parseRemoteCsv<Row>(URLS.CSV_DATA, { header: true }).then(({ data }) =>
      setRows(data),
    )
  }, [])

  const carriers = getCarriers(rows)

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.form}>
          <CarrierSelector carriers={carriers} onChange={setCarrier} />
          <StateSelector onChange={setState} />
          <Button>Submit</Button>
        </div>

        {carrier && state && (
          <PremiumTable rows={rows} carrier={carrier} state={state.code} />
        )}
      </div>
    </div>
  )
}
