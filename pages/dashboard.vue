<script lang="ts" setup>
const isSidebarOpen = ref(true);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}

const themeStore = useThemeStore();
</script>

<template>
  <div class="flex-1 flex">
    <div
      class="bg-base-200 relative transition-all duration-400"
      :class="{ 'text-gray-800 bg-base-300': !themeStore.isDark, 'bg-base-200': themeStore.isDark, 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <div
        class="absolute -right-8 top-50 bottom-50 rounded-r-full flex justify-center items-center cursor-pointer"
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
        <div class="divider" />
        <SidebarButton
          href="/sign-out"
          :show-label="isSidebarOpen"
          label="Sign Out"
          icon="tabler:logout-2"
        />
      </div>
    </div>
    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>
