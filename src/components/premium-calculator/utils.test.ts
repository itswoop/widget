import { findRow, getCarriers, getStateCodesForCarrier } from './utils'

describe(getCarriers, () => {
  it('should return an array of unique carriers', () => {
    const carriers = getCarriers([
      { carrier: 'Carrier A', state: 'CA', 2020: '5%' },
      { carrier: 'Carrier B', state: 'CB', 2020: '5%' },
      { carrier: 'Carrier A', state: 'CA', 2020: '5%' },
    ])

    expect(carriers).toEqual(['Carrier A', 'Carrier B'])
  })

  it('should filter out falsy carriers', () => {
    const carriers = getCarriers([
      { carrier: 'Carrier A', state: 'CA', 2020: '5%' },
      { carrier: '', state: 'CB' },
    ])

    expect(carriers).toEqual(['Carrier A'])
  })
})

describe(findRow, () => {
  it('should return null if no carrier or state code is provided', () => {
    const row = findRow(
      [{ carrier: 'Carrier A', state: 'CA', 2020: '5%' }],
      null,
      null,
    )

    expect(row).toBeNull()
  })

  it('should return null if no matching row is found', () => {
    const row = findRow(
      [{ carrier: 'Carrier A', state: 'CA', 2020: '5%' }],
      'Carrier B',
      'CB',
    )

    expect(row).toBeNull()
  })

  it('should return the matching row', () => {
    const row = findRow(
      [{ carrier: 'Carrier A', state: 'CA', 2020: '5%' }],
      'Carrier A',
      'CA',
    )

    expect(row).toEqual({ carrier: 'Carrier A', state: 'CA', 2020: '5%' })
  })

  it('should ignore case of carrier and state', () => {
    const row = findRow(
      [{ carrier: 'Carrier A', state: 'CA', 2020: '5%' }],
      'cArRiEr a',
      'cA',
    )

    expect(row).toEqual({ carrier: 'Carrier A', state: 'CA', 2020: '5%' })
  })
})

describe(getStateCodesForCarrier, () => {
  it('should return an array of state codes for a given carrier', () => {
    const stateCodes = getStateCodesForCarrier(
      [
        { carrier: 'Carrier A', state: 'CA', 2020: '5%' },
        { carrier: 'Carrier B', state: 'CB', 2020: '5%' },
      ],
      'Carrier A',
    )

    expect(stateCodes).toEqual(['CA'])
  })

  it('should filter out falsy state codes', () => {
    const stateCodes = getStateCodesForCarrier(
      [
        { carrier: 'Carrier A', state: 'CA', 2020: '5%' },
        { carrier: 'Carrier B', state: '', 2020: '5%' },
      ],
      'Carrier B',
    )

    expect(stateCodes).toEqual([])
  })

  it('should filter out states with no year data', () => {
    const stateCodes = getStateCodesForCarrier(
      [
        { carrier: 'Carrier A', state: 'CA' },
        { carrier: 'Carrier A', state: 'CB' },
      ],
      'Carrier A',
    )

    expect(stateCodes).toEqual([])
  })

  it('should return an empty array if no carrier is provided', () => {
    const stateCodes = getStateCodesForCarrier(
      [
        { carrier: 'Carrier A', state: 'CA', 2020: '5%' },
        { carrier: 'Carrier B', state: 'CB', 2020: '5%' },
      ],
      null,
    )

    expect(stateCodes).toEqual([])
  })
})
