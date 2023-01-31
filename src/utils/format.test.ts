import { formatDecimalString, formatMoneyString } from './format'

describe(formatMoneyString, () => {
  it('should format a number as a decimal with a fixed number of decimals', () => {
    expect(formatMoneyString(5)).toEqual('$5')
    expect(formatMoneyString(5, 1)).toEqual('$5.0')
    expect(formatMoneyString(3.14159, 1)).toEqual('$3.1')
    expect(formatMoneyString(3.14159, 2)).toEqual('$3.14')
    expect(formatMoneyString(3.14159, 3)).toEqual('$3.142')
    expect(formatMoneyString(3141.592)).toEqual('$3,142')
    expect(formatMoneyString(3141.592, 2)).toEqual('$3,141.59')
  })

  it('can handle negative values', () => {
    expect(formatMoneyString(-5)).toEqual('-$5')
    expect(formatMoneyString(-5, 1)).toEqual('-$5.0')
    expect(formatMoneyString(-3.14159, 1)).toEqual('-$3.1')
    expect(formatMoneyString(-3.14159, 2)).toEqual('-$3.14')
    expect(formatMoneyString(-3.14159, 3)).toEqual('-$3.142')
    expect(formatMoneyString(-3.14159, 4)).toEqual('-$3.1416')
    expect(formatMoneyString(-3141.592)).toEqual('-$3,142')
    expect(formatMoneyString(-3141.592, 2)).toEqual('-$3,141.59')
  })

  it('can handle zero values', () => {
    expect(formatMoneyString(0)).toEqual('$0')
    expect(formatMoneyString(-0.0)).toEqual('$0') // -0.0 is a thing
    expect(formatMoneyString(0, 1)).toEqual('$0.0')
    expect(formatMoneyString(0, 2)).toEqual('$0.00')
    expect(formatMoneyString(0, 3)).toEqual('$0.000')
    expect(formatMoneyString(0, 4)).toEqual('$0.0000')
  })
})

describe(formatDecimalString, () => {
  it('should format a number as a decimal with a fixed number of decimals', () => {
    expect(formatDecimalString(5)).toEqual('5.00')
    expect(formatDecimalString(5, 1)).toEqual('5.0')
    expect(formatDecimalString(3.14159, 1)).toEqual('3.1')
    expect(formatDecimalString(3.14159, 2)).toEqual('3.14')
    expect(formatDecimalString(3.14159, 3)).toEqual('3.142')
    expect(formatDecimalString(3.14159, 4)).toEqual('3.1416')
  })

  it('can handle negative values', () => {
    expect(formatDecimalString(-5)).toEqual('-5.00')
    expect(formatDecimalString(-5, 1)).toEqual('-5.0')
    expect(formatDecimalString(-3.14159, 1)).toEqual('-3.1')
    expect(formatDecimalString(-3.14159, 2)).toEqual('-3.14')
    expect(formatDecimalString(-3.14159, 3)).toEqual('-3.142')
    expect(formatDecimalString(-3.14159, 4)).toEqual('-3.1416')
  })

  it('can handle zero values', () => {
    expect(formatDecimalString(0)).toEqual('0.00')
    expect(formatDecimalString(-0.0)).toEqual('0.00') // -0.0 is a thing
    expect(formatDecimalString(0, 1)).toEqual('0.0')
    expect(formatDecimalString(0, 2)).toEqual('0.00')
    expect(formatDecimalString(0, 3)).toEqual('0.000')
    expect(formatDecimalString(0, 4)).toEqual('0.0000')
  })
})
