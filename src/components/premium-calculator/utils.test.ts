import { findRow, getCarriers, getStateCodesForCarrier } from './utils'

describe(getCarriers, () => {
  it('should return an array of unique carriers', () => {
    const carriers = getCarriers([
      { carrier: 'Carrier A', state: 'CA' },
      { carrier: 'Carrier B', state: 'CB' },
      { carrier: 'Carrier A', state: 'CA' },
    ])

    expect(carriers).toEqual(['Carrier A', 'Carrier B'])
  })

  it('should filter out falsy carriers', () => {
    const carriers = getCarriers([
      { carrier: 'Carrier A', state: 'CA' },
      { carrier: '', state: 'CB' },
    ])

    expect(carriers).toEqual(['Carrier A'])
  })
})

describe(findRow, () => {
  it('should return null if no carrier or state code is provided', () => {
    const row = findRow([{ carrier: 'Carrier A', state: 'CA' }], null, null)

    expect(row).toBeNull()
  })

  it('should return null if no matching row is found', () => {
    const row = findRow(
      [{ carrier: 'Carrier A', state: 'CA' }],
      'Carrier B',
      'CB',
    )

    expect(row).toBeNull()
  })

  it('should return the matching row', () => {
    const row = findRow(
      [{ carrier: 'Carrier A', state: 'CA' }],
      'Carrier A',
      'CA',
    )

    expect(row).toEqual({ carrier: 'Carrier A', state: 'CA' })
  })

  it('should ignore case of carrier and state', () => {
    const row = findRow(
      [{ carrier: 'Carrier A', state: 'CA' }],
      'cArRiEr a',
      'cA',
    )

    expect(row).toEqual({ carrier: 'Carrier A', state: 'CA' })
  })
})

describe(getStateCodesForCarrier, () => {
  it('should return an array of state codes for a given carrier', () => {
    const stateCodes = getStateCodesForCarrier(
      [
        { carrier: 'Carrier A', state: 'CA' },
        { carrier: 'Carrier B', state: 'CB' },
      ],
      'Carrier A',
    )

    expect(stateCodes).toEqual(['CA'])
  })

  it('should filter out falsy state codes', () => {
    const stateCodes = getStateCodesForCarrier(
      [
        { carrier: 'Carrier A', state: 'CA' },
        { carrier: 'Carrier B', state: '' },
      ],
      'Carrier B',
    )

    expect(stateCodes).toEqual([])
  })

  it('should return an empty array if no carrier is provided', () => {
    const stateCodes = getStateCodesForCarrier(
      [
        { carrier: 'Carrier A', state: 'CA' },
        { carrier: 'Carrier B', state: 'CB' },
      ],
      null,
    )

    expect(stateCodes).toEqual([])
  })
})
