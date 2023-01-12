import { useEffect, useState } from 'react'
import Select from 'react-select'
import type { Carrier } from '../../types/carrier'
import styles from './styles.module.css'

type CarrierSelectorProps = {
  onChange: (carrier: Carrier | null) => void
}

export const CarrierSelector: React.FC<CarrierSelectorProps> = ({
  onChange,
}) => {
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [selectedOption, setSelectedOption] = useState<{
    label: string
    value: string
  } | null>(null)

  useEffect(() => {
    fetch(
      'https://devtest-journey-dev.azurewebsites.net/WOOP/journey/1.0.0/canopy/carriers',
    )
      .then(res => res.json())
      .then(data => setCarriers(data))
  }, [])

  return (
    <div className={styles.wrapper}>
      <Select
        placeholder="Select a carrier..."
        defaultValue={selectedOption}
        options={carriers.map(carrier => ({
          label: carrier.name,
          value: carrier.carrier_id,
        }))}
        onChange={e => {
          setSelectedOption(e)
          onChange(
            carriers.find(carrier => carrier.carrier_id === e?.value) || null,
          )
        }}
      />
    </div>
  )
}
