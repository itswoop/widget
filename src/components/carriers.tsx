import { useEffect, useState } from 'react'

type Carrier = {
  carrier_id: string
  name: string
  usernameFieldPlaceholder: string
  thirdFieldPlaceholder?: string
  color: string
  homepageUrl: string
  createAccountUrl: string
  resetPasswordUrl?: string
  disablePasswordField: boolean
  logo?: string
}

export const CarrierList: React.FC<{ startAt: number }> = ({ startAt }) => {
  const [carriers, setCarriers] = useState<Carrier[]>([])

  useEffect(() => {
    fetch(
      'https://devtest-journey-dev.azurewebsites.net/WOOP/journey/1.0.0/canopy/carriers',
    )
      .then(res => res.json())
      .then(data => setCarriers(data))
  }, [])

  return (
    <div>
      {carriers.slice(startAt, startAt + 5).map(carrier => (
        <div key={carrier.carrier_id}>{carrier.name}</div>
      ))}
    </div>
  )
}
