<script lang="ts" setup>
const route = useRoute();
const locationsStore = useLocationStore();

onMounted(() => {
  if (route.path !== "/dashboard") {
    locationsStore.refresh();
  }
});
</script>

<template>
  <div>
    <div class="absolute bg-base-200 flex flex-col flex-1 z-10 h-full">
      <AppSideBar />
    </div>
    <div class="flex-1 grid grid-rows-2 overflow-hidden max-w-5xl mx-auto">
      <NuxtPage />
      <AppMap />
    </div>
  </div>
</template>
