export interface GetCapabilitiesResponse {
    title:  string;
    layers: Layer[];
}

export interface Layer {
    name:        string;
    title:       string;
    groupName:   string;
    groupTitle:  string;
    keywordList: KeywordList[];
    styles:      Style[];
    times?:      string[];
}

export interface KeywordList {
    parameterId:      string;
    locationId:       string;
    moduleInstanceId: string;
    timeSeriesType:   TimeSeriesType;
}

export enum TimeSeriesType {
    ExternalForecasting = "EXTERNAL_FORECASTING",
}

export interface Style {
    name:  string;
    title: string;
}
