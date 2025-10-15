<script lang="ts" setup>
import { CENTER_USA } from "~/lib/constants";

const colorMode = useColorMode();
const mapStore = useMapStore();

const style = computed(() =>
  colorMode.value === "dark" ? "/styles/dark.json" : "https://tiles.openfreemap.org/styles/liberty",
);
const center = ref(CENTER_USA);
const zoom = ref(3);

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
        v-for="point in mapStore.mapPoints"
        :key="point.id"
        :coordinates="[point.long, point.lat]"
      >
        <template #marker>
          <div class="tooltip tooltip-top" :data-tip="point.name">
            <Icon
              name="tabler:map-pin-filled"
              size="32"
              class="text-secondary"
            />
          </div>
        </template>
      </MglMarker>
    </MglMap>
  </div>
</template>
