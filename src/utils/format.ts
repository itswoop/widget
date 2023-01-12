/**
 * Format a number as a currency string in USD.
 */
export const formatMoneyString = (value: number, decimals = 2) =>
  Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
