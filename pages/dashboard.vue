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
    <div
      class="grid overflow-hidden min-h-screen"
      :class="{ 'grid-cols-4': route.path !== '/dashboard', 'grid-rows-2 max-w-5xl mx-auto': route.path === '/dashboard' }"
    >
      <NuxtPage :class="{ 'col-span-2': route.path !== '/dashboard' }" />
      <AppMap :class="{ 'col-span-2': route.path !== '/dashboard' }" />
    </div>
  </div>
</template>
