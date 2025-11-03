import {WMSRequestType} from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterToParams (filter: Record<string, any>): string {
    const filterArgs = Object.entries(filter).flatMap(([key, value]) => {
        if (value === undefined) return []

        const encodedValue = encodeURIComponent(value)
        return [`${key}=${encodedValue}`]
    })

    return filterArgs.length ? '?' + filterArgs.join('&') : ''
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterToParamsWMS (requestType: WMSRequestType, filter: Record<string, any>): string {
    return filterToParams({ ...{ request: requestType }, ...filter })
}