import type { MapPoint } from "~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);
  const shouldFlyTo = ref(true);
  const addedPoint = ref<MapPoint | null>(null);

  function selectWithoutFlyTo(point: MapPoint | null) {
    shouldFlyTo.value = false;
    selectedPoint.value = point;
  }

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();

    let bounds: InstanceType<typeof LngLatBounds> | null = null;

    effect(() => {
      const firstPoint = mapPoints.value[0];
      if (!firstPoint)
        return;

      bounds = mapPoints.value.reduce((bounds, points) => {
        return bounds.extend([points.long, points.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));

      map.map?.fitBounds(bounds, { padding: 50 });
    });

    effect(() => {
      if (addedPoint.value) {
        return;
      }
      if (selectedPoint.value) {
        if (shouldFlyTo.value) {
          map.map?.flyTo({
            center: [selectedPoint.value.long, selectedPoint.value.lat],
            zoom: 4,
            speed: 3,
            curve: 1,
            easing(t) {
              return t;
            },
          });
        }
        shouldFlyTo.value = true;
      }
      else if (bounds) {
        map.map?.fitBounds(bounds, { padding: 50 });
      }
    });
  }

  return {
    init,
    mapPoints,
    addedPoint,
    selectedPoint,
    selectWithoutFlyTo,
  };
});
