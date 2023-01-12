import { useEffect, useState } from 'react'
import { URLS } from '../../constants/data'
import { parseRemoteCsv } from '../../utils/parse'
import styles from './table.module.css'

type Row = {
  carrier: string
  state: string
  [key: number]: string
}

type PremiumTableProps = {
  carrier: string
  state: string
}

export const PremiumTable: React.FC<PremiumTableProps> = ({
  carrier,
  state,
}) => {
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    parseRemoteCsv<Row>(URLS.CSV_DATA, { header: true }).then(({ data }) =>
      setRows(data),
    )
  }, [])

  const data = rows.find(
    row =>
      row.carrier.toLowerCase() === carrier.toLowerCase() &&
      row.state.toLowerCase() === state.toLowerCase(),
  )

  if (!data) return null

  return (
    <div className={styles.wrapper}>
      <div>{data.carrier}</div>
      <div>{data.state}</div>

      {[2018, 2019, 2020, 2021, 2022].map(year => (
        <div key={year}>{data[year]}</div>
      ))}
    </div>
  )
}
