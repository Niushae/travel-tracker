<script lang="ts" setup>
import { CENTER_USA } from "~/lib/constants";

const colorMode = useColorMode();

const style = computed(() =>
  colorMode.value === "dark" ? "/styles/dark.json" : "https://tiles.openfreemap.org/styles/liberty",
);
const center = ref((CENTER_USA));
const zoom = ref(3);

onMounted(() => {
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
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
