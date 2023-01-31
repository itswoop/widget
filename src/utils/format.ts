/**
 * Format a number as a currency string in USD.
 */
export const formatMoneyString = (value: number, decimals = 0) =>
  Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value || 0)

/**
 * Format a number as a decimal with a fixed number of decimals.
 */
export const formatDecimalString = (value: number, decimals = 2) =>
  Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value || 0)
