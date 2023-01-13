import { useState } from 'react'
import Select from 'react-select'
import styles from './styles.module.css'

type CarrierSelectorProps = {
  carriers: string[]
  onChange: (carrier: string | null) => void
}

export const CarrierSelector: React.FC<CarrierSelectorProps> = ({
  carriers,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<{
    label: string
    value: string
  } | null>(null)

  return (
    <div className={styles.wrapper}>
      <Select
        placeholder="Select your insurance carrier..."
        defaultValue={selectedOption}
        options={carriers.map(carrier => ({ label: carrier, value: carrier }))}
        onChange={e => {
          setSelectedOption(e)
          onChange(carriers.find(carrier => carrier === e?.value) || null)
        }}
      />
    </div>
  )
}
