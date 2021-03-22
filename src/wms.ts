import {
  GetCapabilitiesFilter,

  WMSProviderConfig,
  WMSProviders,
  WMSRequestType,
} from './types'
import {
  GetCapabilitiesResponse,
} from './types'

import {
  requestJson,
  filterToParams,
  filterToParamsWMS,
} from './request-utils'

interface WMSApi {
  getCapabilities (filter: GetCapabilitiesFilter): Promise<GetCapabilitiesResponse>
}



class WMSProvider implements WMSApi {
  private baseUrl: string

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getCapabilities (filter: GetCapabilitiesFilter): Promise<GetCapabilitiesResponse> {
    const defaults: Partial<GetCapabilitiesFilter> = {
      format: 'application/json',
    }
    const filterWithDefaults = { ...defaults, ...filter }
    const queryParameters = filterToParamsWMS(WMSRequestType.GetCapabilities, filterWithDefaults)
    const url = `${this.baseUrl}${queryParameters}`
    return requestJson(url) as Promise<GetCapabilitiesResponse>
  }
}

export interface WMS {
  getProviders (): WMSProviders
  getProviderConfig (provider: string): WMSProviderConfig
  getCapabilities (provider: string, filter: GetCapabilitiesFilter,): Promise<GetCapabilitiesResponse>
}

export class WMSServices implements WMS {
  private config: WMSProviders
  private providers: Record<string, WMSApi>

  constructor (config: WMSProviders) {
    this.config = config
    this.providers = Object.entries(config).reduce((map, [key, value]) => {
      const obj: {[k: string]: WMSApi} = {}
      obj[key] = new WMSProvider(value.baseUrl)
      return obj
    }, {})
  }


  getProviders (): WMSProviders {
    return this.config
  }

  getProviderConfig (provider: string): WMSProviderConfig {
    return this.config[provider]
  }

  getCapabilities (provider: string, filter: GetCapabilitiesFilter,): Promise<any> {
    return this.providers[provider].getCapabilities(filter)
  }
}
