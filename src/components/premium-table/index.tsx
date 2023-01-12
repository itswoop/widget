import { useEffect, useState } from 'react'
import { URLS } from '../../constants/data'
import { parseRemoteCsv } from '../../utils/parse'

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
  const [data, setData] = useState<Row[]>([])

  useEffect(() => {
    parseRemoteCsv<Row>(URLS.CSV_DATA, { header: true }).then(({ data }) =>
      setData(data),
    )
  }, [])

  const row = data.find(
    row =>
      row.carrier.toLowerCase() === carrier.toLowerCase() &&
      row.state.toLowerCase() === state.toLowerCase(),
  )

  return (
    <div>
      <span>{JSON.stringify(row)}</span>
    </div>
  )
}
