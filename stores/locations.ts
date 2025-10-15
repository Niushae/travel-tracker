import type { MapPoint } from "~/lib/types";

import { useMapStore } from "./map";

export const useLocationStore = defineStore("useLocationStore", () => {
  const { data, status, refresh } = useFetch<MapPoint[]>("/api/locations", {
    lazy: true,
  });

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (data.value) {
      const locations = data.value;
      sidebarStore.loading = false;
      sidebarStore.sidebarItems = locations.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:map-pin",
        href: "#",
      }));
      mapStore.mapPoints = locations.map(location => ({
        id: location.id,
        name: location.name,
        lat: location.lat,
        long: location.long,
      }));
    }
    sidebarStore.loading = status.value === "pending";
  });

  return {
    locations: data,
    status,
    refresh,
  };
});
