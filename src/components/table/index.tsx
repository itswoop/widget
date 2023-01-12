import { useEffect, useState } from 'react'
import { URLS } from '../../constants/data'
import { parseRemoteCsv } from '../../utils/parse'

type Row = {
  carrier: string
  state: string
  [key: number]: string
}

type TableProps = {
  filter: {
    carrier?: string
    state?: string
  }
}

export const Table: React.FC<TableProps> = ({ filter }) => {
  const [data, setData] = useState<Row[]>([])

  useEffect(() => {
    parseRemoteCsv<Row>(URLS.CSV_DATA, { header: true }).then(({ data }) =>
      setData(data),
    )
  }, [])

  return (
    <div>
      {data
        .filter(
          row =>
            row.carrier.toLowerCase() === filter.carrier?.toLowerCase() &&
            row.state.toLowerCase() === filter.state?.toLowerCase(),
        )
        .slice(0, 10)
        .map((row, index) => (
          <div key={index}>
            <span>{JSON.stringify(row)}</span>
          </div>
        ))}
    </div>
  )
}
