/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ColourMap = ColourMapEntry[];

export interface GetLegendGraphicResponse {
  unit?: string;
  legend: ColourMap;
}
export interface ColourMapEntry {
  label?: string;
  lowerValue: number;
  color: string;
  colorSmoothing?: boolean;
}
