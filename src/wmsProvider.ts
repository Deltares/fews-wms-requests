import { GetCapabilitiesFilter } from './requestParameters/getCapabilitiesFilter'
import type { GetCapabilitiesResponse } from './response/getCapabilitiesResponse'
import { GetLegendGraphicFilter } from './requestParameters/getLegendGraphicFilter'
import type { GetLegendGraphicResponse } from './response/getLegendGraphicResponse'
import { BaseWMSFilter } from './requestParameters/baseWmsFilter'
import { filterToParamsWMS } from './filterToParams'
import { WMSRequestType } from './wmsRequestType'

import { PiRestService } from '@deltares/fews-web-oc-utils'
import type { TransformRequestFunction } from '@deltares/fews-web-oc-utils'
import { absoluteUrl } from './utils/absoluteUrl'

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
}
