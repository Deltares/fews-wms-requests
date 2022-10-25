import {TimeSeriesType} from "../response/timeSeriesType";

export interface KeywordList {
    parameterId:      string;
    locationId:       string;
    moduleInstanceId: string;
    timeSeriesType:   TimeSeriesType;
}