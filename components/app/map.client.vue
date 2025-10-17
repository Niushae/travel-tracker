<script lang="ts" setup>
import type { LngLat } from "maplibre-gl";

import { CENTER_USA } from "~/lib/constants";

const colorMode = useColorMode();
const mapStore = useMapStore();

const style = computed(() =>
  colorMode.value === "dark" ? "/styles/dark.json" : "https://tiles.openfreemap.org/styles/liberty",
);
const center = ref(CENTER_USA);
const zoom = ref(3);

function updateAddedPoint(location: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = location.lat;
    mapStore.addedPoint.long = location.lng;
  }
}

onMounted(() => {
  if (mapStore.mapPoints.length === 0) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          center.value = [position.coords.longitude, position.coords.latitude];
          zoom.value = 6;
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        },
      );
    }
    else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }
  else {
    mapStore.init();
  }
});
</script>

<template>
  <div>
    <MglMap
      :map-style="style"
      :center="center"
      :zoom="zoom"
    >
      <MglNavigationControl />
      <MglMarker
        v-if="mapStore.addedPoint"
        draggable
        :coordinates="CENTER_USA"
        @update:coordinates="updateAddedPoint"
      >
        <template #marker>
          <div
            class="tooltip tooltip-top"
            data-tip="Drag to your desired location"
          >
            <Icon
              name="tabler:map-pin-filled"
              size="35"
              class="text-warning"
            />
          </div>
        </template>
      </MglMarker>
      <MglMarker
        v-for="point in mapStore.mapPoints"
        :key="point.id"
        :coordinates="[point.long, point.lat]"
      >
        <template #marker>
          <div
            class="tooltip tooltip-top cursor-pointer"
            :data-tip="point.name"
            :class="{
              'tooltip-open': mapStore.selectedPoint === point,
            }"
            @mouseenter="mapStore.selectWithoutFlyTo(point)"
            @mouseleave="mapStore.selectWithoutFlyTo(null)"
          >
            <Icon
              name="tabler:map-pin-filled"
              size="32"
              :class="mapStore.selectedPoint === point ? 'text-accent' : 'text-secondary'"
            />
          </div>
        </template>
        <MglPopup>
          <h3 class="text-xl">
            {{ point.name }}
          </h3>
          <p v-if="point.description">
            {{ point.description }}
          </p>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>
