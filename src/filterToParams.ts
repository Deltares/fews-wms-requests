import { WMSRequestType } from './wmsRequestType'

export function filterToParams(filter: Record<string, any>): string {
  const filterArgs = Object.entries(filter).flatMap(([key, value]) => {
    if (value === undefined) return []

    const encodedValue = encodeURIComponent(value)
    return [`${key}=${encodedValue}`]
  })

  return filterArgs.length ? '?' + filterArgs.join('&') : ''
}

export function filterToParamsWMS(
  requestType: WMSRequestType,
  filter: Record<string, any>,
): string {
  return filterToParams({ ...{ request: requestType }, ...filter })
}
