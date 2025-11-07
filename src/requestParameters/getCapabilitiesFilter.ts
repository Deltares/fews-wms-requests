import { BaseWMSFilter } from './baseWmsFilter'

export interface GetCapabilitiesFilter extends BaseWMSFilter {
  /** Format of the response. Options are: application/xml or application/json.
   *  The default format is application/xml. */
  format?: 'application/xml' | 'application/json'

  /** (since 2019.02): the layerId of the plot for which the capabilities should
   *  be determined. Only one layerId is currently supported. */
  layers?: string

  /** (optional, since 2019.02): Get the capabilities without the times. The
   *  default is false. */
  onlyHeaders?: boolean

  /* forecastPeriod: By default only the current forecast will be returned by
       the GetCapabilities. To get other forecasts, a forecast period needs to be
       specified. When any forecasts are found, they will be returned as a layer
       with the plotId and external forecast time combined. For example:
           france_gfs_T_forecasts-2019-06-24T00:00:00Z.
       When requesting the capabilities with a forecast period, it is required to
       specify a layerId with the layers parameter. */

  /** (format: yyyy-MM-ddTHH:mm:ssZ, since 2019.02): Start time of search period
   * that looks for timeseries produced by forecasts that have their forecast
   * time within this period. */
  startForecastTime?: string

  /** (format: yyyy-MM-ddTHH:mm:ssZ, since 2019.02): End time of search period
   * that looks for timeseries produced by forecasts that have their forecast
   * time within this period. */
  endForecastTime?: string

  /** (since 2019.02): Number of forecast runs to return when using start- and
   * end- forecast time. Default is 1. */
  forecastCount?: number

  /** (default=false, since 2020.01): apply seamless integration with the
   * archive. Only valid when specifying a forecastPeriod (using
   * startForecastTime, endForecastTime and forecastCount) and layers. */
  importFromExternalDataSource?: boolean
}
