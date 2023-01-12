import { parse, ParseRemoteConfig, ParseResult } from 'papaparse'

/**
 * Parse a CSV file from a remote URL and return a promise with the results.
 */
export const parseRemoteCsv = async <T = unknown>(
  url: string,
  options?: Omit<
    ParseRemoteConfig<T>,
    'download' | 'complete' | 'error' | 'transform' | 'transformHeader'
  >,
) =>
  new Promise((resolve: (results: ParseResult<T>) => void, reject) => {
    parse<T>(url, {
      ...(options || {}),
      download: true,
      complete: resolve,
      error: reject,
      transformHeader: header => header.trim(),
      transform: value => value.trim(),
    })
  })
