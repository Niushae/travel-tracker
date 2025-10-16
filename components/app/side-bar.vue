<script lang="ts" setup>
const isSidebarOpen = ref(true);
const route = useRoute();
const sidebarStore = useSidebarStore();
const locationsStore = useLocationStore();
const mapStore = useMapStore();

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
  if (route.path !== "/dashboard") {
    locationsStore.refresh();
  }
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}

const themeStore = storeToRefs(useThemeStore());
</script>

<template>
  <div
    class="relative transition-all duration-400"
    :class="{ 'text-gray-800': !themeStore.isDark, 'bg-base-200': themeStore.isDark, 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
  >
    <div
      class="absolute h-24 -right-8 top-50 bottom-50 rounded-r-full flex justify-center items-center cursor-pointer"
      :class="!themeStore.isDark ? 'bg-base-300' : 'bg-base-200'"
      @click="toggleSidebar"
    >
      <Icon
        :class="{ 'rotate-180 ': isSidebarOpen }"
        class="transition-all duration-300 cursor-pointer rounded-full"
        name="tabler:chevron-left"
        size="32"
      />
    </div>
    <div class="flex flex-col absolute left-0 right-0">
      <SidebarButton
        href="/dashboard"
        :show-label="isSidebarOpen"
        label="Locations"
        icon="tabler:map"
      />
      <SidebarButton
        href="/dashboard/add"
        :show-label="isSidebarOpen"
        label="Add Location"
        icon="tabler:circle-plus-filled"
      />
      <div v-if="sidebarStore.loading || sidebarStore.sidebarItems.length" class="divider" />
      <div v-if="sidebarStore.loading" class="px-4">
        <div class="skeleton h-4 w-full" />
      </div>
      <div v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length" class="flex flex-col">
        <SidebarButton
          v-for="item in sidebarStore.sidebarItems"
          :key="item.id"
          :show-label="isSidebarOpen"
          :label="item.label"
          :icon="item.icon"
          :href="item.href"
          :icon-color="mapStore.selectedPoint === item.location ? 'text-accent' : ''"
          @mouseenter="mapStore.selectedPoint = item.location ?? null"
          @mouseleave="mapStore.selectedPoint = null"
        />
      </div>
      <div class="divider" />
      <SidebarButton
        href="/sign-out"
        :show-label="isSidebarOpen"
        label="Sign Out"
        icon="tabler:logout-2"
      />
    </div>
  </div>
</template>
