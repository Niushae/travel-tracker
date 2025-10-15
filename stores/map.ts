import type { MapPoint } from "~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint)
        return;

      const bounds = mapPoints.value.reduce((bounds, points) => {
        return bounds.extend([points.long, points.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));

      map.map?.fitBounds(bounds, { padding: 50 });
    });
  }

  return {
    init,
    mapPoints,
  };
});
