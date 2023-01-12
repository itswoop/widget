import { useState } from 'react'
import { State } from '../../constants/states'
import type { Carrier } from '../../types/carrier'
import { CarrierSelector } from '../selectors/carrier'
import { StateSelector } from '../selectors/state'
import styles from './styles.module.css'

export const Card = () => {
  const [carrier, setCarrier] = useState<Carrier | null>(null)
  const [state, setState] = useState<State | null>(null)

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashed}>
        <div className={styles.selectors}>
          <div>
            {JSON.stringify({ carrier: carrier?.name, state: state?.name })}
          </div>
          <CarrierSelector onChange={setCarrier} />
          <StateSelector onChange={setState} />
        </div>
      </div>
    </div>
  )
}
