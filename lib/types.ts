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
