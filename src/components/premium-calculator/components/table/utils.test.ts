import {
  calculateCompoundValues,
  parseAndPadYears,
  parseChangesPerYear,
} from './utils'

describe(parseAndPadYears, () => {
  it('should return an array of years', () => {
    const years = parseAndPadYears(['2016', '2017', '2018', ''])
    expect(years).toEqual([2015, 2016, 2017, 2018])
  })

  it('should return an empty array if no years are provided', () => {
    const years = parseAndPadYears([''])
    expect(years).toEqual([])
  })
})

describe(parseChangesPerYear, () => {
  it('should return an array of years and percentages', () => {
    const years = parseChangesPerYear([2015, 2016, 2017, 2018], {
      carrier: 'Carrier',
      state: 'ST',
      2016: '10%',
      2017: '20%',
      2018: '30%',
    })
    expect(years).toEqual([
      { year: 2015, percentInteger: null },
      { year: 2016, percentInteger: 10 },
      { year: 2017, percentInteger: 20 },
      { year: 2018, percentInteger: 30 },
    ])
  })

  it('should handle empty and zero percentages', () => {
    const years = parseChangesPerYear([2015, 2016, 2017, 2018], {
      carrier: 'Carrier',
      state: 'ST',
      2016: '',
      2017: '0%',
      2018: '30%',
    })
    expect(years).toEqual([
      { year: 2015, percentInteger: null },
      { year: 2016, percentInteger: null },
      { year: 2017, percentInteger: 0 },
      { year: 2018, percentInteger: 30 },
    ])
  })
})

describe(calculateCompoundValues, () => {
  it('should return an array of values', () => {
    const values = calculateCompoundValues(1000, [10, 20, 30])
    expect(values).toEqual([1000, 1100, 1320, 1716])
  })
})
