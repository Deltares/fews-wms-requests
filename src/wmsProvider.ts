import { GetCapabilitiesFilter } from './requestParameters/getCapabilitiesFilter.js'
import type { GetCapabilitiesResponse } from './response/getCapabilitiesResponse.js'
import { GetLegendGraphicFilter } from './requestParameters/getLegendGraphicFilter.js'
import type { GetLegendGraphicResponse } from './response/getLegendGraphicResponse.js'
import { BaseWMSFilter } from './requestParameters/baseWmsFilter.js'
import { filterToParamsWMS } from './filterToParams.js'
import { WMSRequestType } from './wmsRequestType.js'

import { PiRestService } from '@deltares/fews-web-oc-utils'
import type { TransformRequestFunction } from '@deltares/fews-web-oc-utils'
import { absoluteUrl } from './utils/absoluteUrl.js'
import { GetMapFilter } from './requestParameters/index.js'

export class WMSProvider {
  private readonly _baseUrl: URL
  webservice: PiRestService

  constructor(
    baseUrl: string,
    options: { transformRequestFn?: TransformRequestFunction } = {},
  ) {
    this._baseUrl = absoluteUrl(baseUrl)
    this.webservice = new PiRestService(baseUrl, options.transformRequestFn)
  }

  async getCapabilities(
    filter: GetCapabilitiesFilter,
  ): Promise<GetCapabilitiesResponse> {
    return this.executeWMSRequest(WMSRequestType.GetCapabilities, filter)
  }

  async getLegendGraphic(
    filter: Partial<GetLegendGraphicFilter>,
  ): Promise<GetLegendGraphicResponse> {
    filter = { service: 'WMS', version: '1.3', ...filter }
    return this.executeWMSRequest(WMSRequestType.GetLegendGraphic, filter)
  }

  private async executeWMSRequest<
    filterType extends BaseWMSFilter,
    responseType,
  >(requestType: WMSRequestType, filter: filterType): Promise<responseType> {
    const defaults: Partial<BaseWMSFilter> = {
      format: 'application/json',
    }
    const filterWithDefaults = { ...defaults, ...filter }
    const queryParameters = filterToParamsWMS(requestType, filterWithDefaults)
    const url = new URL(queryParameters, this._baseUrl)
    const res = await this.webservice.getData<responseType>(url.toString())
    return res.data
  }

  getMapUrl(filter: GetMapFilter): URL {
    const queryParameters = filterToParamsWMS(WMSRequestType.GetMap, filter)
    return new URL(queryParameters, this._baseUrl)
  }
}
