import type { UserWithId } from "./auth";

declare module "h3" {
// eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: UserWithId;
  }
}

export type Location = {
  id: string;
  name: string;
  description?: string;
};

export type MapPoint = Location & { lat: number; long: number };

export type NominatimResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
};
