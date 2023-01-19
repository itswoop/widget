import { useState } from 'react'
import Select from 'react-select'
import { type State, US_STATES } from '../../../../constants/states'
import styles from './styles.module.css'

type StateSelectorProps = {
  stateCodes: string[]
  onChange: (state: State | null) => void
}

export const StateSelector: React.FC<StateSelectorProps> = ({
  stateCodes,
  onChange,
}) => {
  const options = US_STATES.filter(state =>
    stateCodes.includes(state.code),
  ).map(state => ({
    label: state.name,
    value: state.code,
  }))

  const [selectedOption, setSelectedOption] = useState<{
    label: string
    value: string
  } | null>(null)

  return (
    <div className={styles.wrapper}>
      <Select
        placeholder="Select your state..."
        defaultValue={selectedOption}
        noOptionsMessage={() => 'Please select a carrier first.'}
        options={options}
        onChange={e => {
          setSelectedOption(e)
          onChange(US_STATES.find(state => state.code === e?.value) || null)
        }}
      />
    </div>
  )
}
