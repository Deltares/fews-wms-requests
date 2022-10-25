import {Layer} from "../response/layer";

export interface GetCapabilitiesResponse {
    title:  string;
    layers: Layer[];
}