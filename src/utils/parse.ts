import { parse, ParseRemoteConfig, ParseResult } from 'papaparse'

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
