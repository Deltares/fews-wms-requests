import { BaseWMSFilter } from "./baseWmsFilter";

export interface GetMapFilter extends BaseWMSFilter {
    /** (required): the layerId of the plot to display. Only one layerid is
     *  supported. */
    layers: string;

    /** (required, optional since 2021.01): the time for which the grid has to be
     *  plotted. Only one time is supported. Time ranges are NOT supported. Time
     *  has to be in the xml dateformat:  yyyy-MM-ddTHH:mm:ssZ. The times returned
     *  by the GetCapabilities are in this format as well. Since 2020.02
     *  milliseconds are supported as well in the format:
     *      yyyy-MM-ddTHH:mm:ss.sssZ.
     *  Since 2021.01 the default time as reported by the GetCapabilities will be
     *  used if no time parameter was specified. */
    time: string;

    /** (optional, since 2020.02): for 3d grids an elevation can be specified. The
     *  elevations should be inside the range as reported by the GetCapabilities. */
    elevation?: number;

    /** (optional): width of the image. Default is 800. */
    width?: number;

    /** (optional): height of the image. Default is 600 */
    height?: number;

    /** (optional): supported version is 1.3 and is the default if not set. Older
     *  versions might work, but are not supported */
    version?: '1.3';

    /** (required): the output projection of the plot. Only supported projection
     *  is: EPSG:3857 */
    crs?: 'EPSG:3857';

    /** (required): the bounding box (in the projection as defined by the SRS
     *  parameter) of the extent that should be plot. You can find your bbox at
     *  http://bboxfinder.com/ */
    bbox: string;

    /** (optional, since 2020.02 ): a style can be passed as request parameter by
     *  passing the styles parameter. N.B. only one style can currently be passed
     *  to the GetMap request. For example:
     *      styles=Class.Temperature.Extreme.
     *  Available styles are reported by GetCapabilities per layer. */
    styles?: string;

    /** (optional, image/png is the default): image/png or image/tiff is
     *  supported. Image tiff is only supported for wind layers using u and v time
     *  series in combination with the following vendor parameters:
     *      convertUVtoRG or convertMagnitudeDirectiontoRG. */
    format?: 'image/png' | 'image/tiff';

    /** (optional, since 2018.02): Display contour lines if enabled in the
     *  gridplot. Default is false. Set to true to show contour lines. */
    showContours?: boolean;

    /** (optional, dateTime: yyyy-MM-ddTHH:mm:ssZ, since 2019.02): get the map for
     *  a specific forecast time. If omitted the latest/current forecast is
     *  returned */
    externalForecastTime?: string;

    /** (boolean, optional, default=false, since 2020.01): apply seamless
     *  integration with the archive. Only valid for external forecasts. Both an
     *  externalForecast time and layers have to be specified as well. */
    importFromExternalDataSource?: boolean;

    /** (optional). Since 2020.01. Specify the ensemble id of the requested grid.
     *  When using this parameter, specifying the ensembleMemberId is required as
     *  well. The available ensembleId is reported by the GetCapabilities request. */
    ensembleId?: string;

    /** (optional). Since 2020.01. Specify the ensemble member id of the requested
     *  grid. When using this parameter, specifying the ensembleId is required as
     *  well. The available ensembleMemberIds are reported by the GetCapabilities
     *  request. */
    ensembleMemberId?: string;

    /** (optional). Since 2020.01. This parameter can be used instead of the
     *  ensembleId and ensembleMemberId parameters and follow the recommendations
     *  in: https://docs.opengeospatial.org/bp/16-086r3/16-086r3.html#23.
     *  This parameter can be used to pass both the ensembleId and
     *  ensembleMemberId separated by a underscore. For example:
     *      dim_ensemble_member=MOSurge_1 */
    dim_ensemble_member?: string;

    /** (optional, since 2020.02): rescale the colors in the map by changing the
     *  min and max values of the range. The minimum value and maximum value are
     *  separated by a comma, For example: colorscalerange=2.0,10.0. This option
     *  can be used for legends as well. */
    colorscalerange?: string;

    /** (optional, default = false, since 2021.02):  Only supported in combination
     *  with format=image/tiff for wind layers using u and v time series sets. The
     *  u and v values will be stored in the R and G values of a TIFF image. The
     *  alpha channel is set to 255 if the pixel maps to a grid value. If the
     *  pixel is outside the grid, the alpha channel is set to 0. The scales and
     *  offsets are stored in geo tiff tags: ModelPixelScaleTag (first double
     *  contains the scale for u values, the second double contains the scale for
     *  v values) and ModelTiepointTag (first double contains the offset for u
     *  values, the second double contains the offset for v values). To calculate
     *  the u an v values the pixel values for R and G channels should be
     *  multiplied by the scale value and the offet should be added. For example.
     *  The R value of a pixel in the TIFF value has value: 200, the u scale = 0.1
     *  and the u offset is 1.0. The u value = 200*0.1 + 1.0 = 21.0. A missing
     *  value is indicated by setting the R and G value to 255. */
    convertUVtoRG?: boolean;

    /**
     * Since 2021.02. Export values using display units.
     * The default is false.
     */
    useDisplayUnits?: boolean;

    /**
     * Since 2023.02. In case of multiple layers where time steps don't always match,
     * use the last value for layers that don't have a value for the selected time.
     */
    useLastValue?: boolean;

}