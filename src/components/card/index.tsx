import { State } from '../../constants/states'
import type { Carrier } from '../../types/carrier'
import { CarrierSelector } from '../selectors/carrier'
import { StateSelector } from '../selectors/state'
import styles from './styles.module.css'

export const Card = () => {
  const onCarrierChange = (carrier: Carrier | null) => {
    console.log(carrier?.name)
  }

  const onStateChange = (state: State | null) => {
    console.log(state?.code)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashed}>
        <div className={styles.selectors}>
          <CarrierSelector onChange={onCarrierChange} />
          <StateSelector onChange={onStateChange} />
        </div>
      </div>
    </div>
  )
}
