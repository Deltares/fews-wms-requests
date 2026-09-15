/* tslint:disable */

export type ColourMap = ColourMapEntry[]

export interface GetLegendGraphicResponse {
  missingValueColor?: string
  belowRangeColor?: string
  aboveRangeColor?: string
  unit?: string
  /**
   * The class break identifier/name
   */
  name?: string
  /**
   * The class break description/title
   */
  title?: string
  legend: ColourMap
}
export interface ColourMapEntry {
  label?: string
  lowerValue: number
  color: string
  colorSmoothing?: boolean
}
