/* tslint:disable */

export type ColourMap = ColourMapEntry[]

export interface GetLegendGraphicResponse {
  missingValueColor?: string
  belowRangeColor?: string
  aboveRangeColor?: string
  unit?: string
  legend: ColourMap
}
export interface ColourMapEntry {
  label?: string
  lowerValue: number
  color: string
  colorSmoothing?: boolean
}
