import {BaseWMSFilter} from "../requestParameters/baseWmsFilter";

export interface GetLegendGraphicFilter extends BaseWMSFilter {
    /** (optional, since 2020.02): The format of the GetLegendGraphic response.
     *  Possible values are:  image/png (the default) or application/json. */
    format?: "image/png" | "application/json";

    /** The gridPlotId of the gridPlot which legend should be displayed. Only one
     *  gridPlotId is supported. */
    layers: string;

    /** (optional): width of the legend. Default is 150. */
    width?: number;

    /** (optional): height of the image. The default is based on the number of
     *  legend items, 15 pixels per item. */
    height?: number;

    /** (optional, since 2020.02): rescale the colors in the map by changing the
     *  min and max values of the range. The minimuma value and maximum value are
     *  separated by a , For example: colorscalerange=2.0,10.0. This parameter can
     *  be used for the GetMap as well. */
    colorscalerange?: string;

    /** (optional, since 2020.02 ): a style can be passed as request parameter.
     *  For example: style=Class.Temperature.Extreme. Available styles are
     *  reported by the GetCapabilities request per layer. */
    style?: string;
    /** (optional, since 2020.02 ): Default is false. If true, the display units

     *  as used in FEWS are returned */

    useDisplayUnits?: boolean;
}
