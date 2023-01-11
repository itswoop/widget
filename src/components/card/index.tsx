import { useState } from 'react'
import styles from './styles.module.css'

export const Card = () => {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashed}>
        <h1>{count}</h1>

        <div>
          <button onClick={() => setCount(c => c - 1)}>-1</button>
          <button onClick={() => setCount(c => c + 1)}>+1</button>
        </div>
      </div>
    </div>
  )
}
