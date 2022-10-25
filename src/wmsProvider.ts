import {GetCapabilitiesFilter} from "./requestParameters/getCapabilitiesFilter";
import {GetCapabilitiesResponse} from "./response/getCapabilitiesResponse";
import {GetLegendGraphicFilter} from "./requestParameters/getLegendGraphicFilter";
import {GetLegendGraphicResponse} from "./response/getLegendGraphicResponse";
import {BaseWMSFilter} from "./requestParameters/baseWmsFilter";
import {filterToParamsWMS} from "./utils/filterToParams";
import {WMSRequestType} from "./types/wmsRequestType";
import PiRestService from "./restservice/piRestService";

export class WMSProvider {
    private readonly baseUrl: string
    webservice: PiRestService;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
        this.webservice = new PiRestService(baseUrl);
    }

    async getCapabilities(filter: GetCapabilitiesFilter): Promise<GetCapabilitiesResponse> {
        return this.executeWMSRequest(WMSRequestType.GetCapabilities, filter)
    }

    async getLegendGraphic(filter: GetLegendGraphicFilter): Promise<GetLegendGraphicResponse> {
        filter = {...{service: 'WMS', version: '1.3'}, ...filter}
        return this.executeWMSRequest(WMSRequestType.GetLegendGraphic, filter)
    }

    private async executeWMSRequest<filterType extends BaseWMSFilter, responseType>(requestType: WMSRequestType, filter: filterType): Promise<responseType> {
        const defaults: Partial<BaseWMSFilter> = {
            format: 'application/json',
        }
        const filterWithDefaults = {...defaults, ...filter}
        const queryParameters = filterToParamsWMS(requestType, filterWithDefaults)
        const url = `${this.baseUrl}${queryParameters}`;
        const res = await this.webservice.getData<responseType>(url);
        return res.data;
    }
}
