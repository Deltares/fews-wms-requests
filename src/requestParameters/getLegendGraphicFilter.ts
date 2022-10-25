import {BaseWMSFilter} from "../requestParameters/baseWmsFilter";

export interface GetLegendGraphicFilter extends BaseWMSFilter {
    layers?: string
}
