import { useState } from 'react'
import Select from 'react-select'
import { type State, US_STATES } from '../../constants/states'
import styles from './styles.module.css'

type StateSelectorProps = {
  onChange: (state: State | null) => void
}

const options = US_STATES.map(state => ({
  label: state.name,
  value: state.code,
}))

export const StateSelector: React.FC<StateSelectorProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<{
    label: string
    value: string
  } | null>(null)

  return (
    <div className={styles.wrapper}>
      <Select
        placeholder="Select a state..."
        defaultValue={selectedOption}
        options={options}
        onChange={e => {
          setSelectedOption(e)
          onChange(US_STATES.find(state => state.code === e?.value) || null)
        }}
      />
    </div>
  )
}
