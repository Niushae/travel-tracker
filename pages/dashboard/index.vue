<script lang="ts" setup>
const locationsStore = useLocationStore();
const { locations, status } = storeToRefs(locationsStore);

onMounted(() => {
  locationsStore.refresh();
});
</script>

<template>
  <div class="px-12 py-8 overflow-hidden">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div v-else-if="locations && locations.length > 0" class="flex flex-nowrap mt-4 gap-2 overflow-x-auto">
      <div
        v-for="location in locations"
        :key="location.id"
        class="card card-compact bg-base-300 min-h-40 w-72 p-4 shrink-0"
      >
        <h3 class="text-xl">
          {{ location.name }}
        </h3>
        <p>{{ location.description }}</p>
      </div>
    </div>
    <div v-else class="flex flex-col gap-2">
      <p>Add a location to get started</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary w-40 mt-4">
        Add Location
        <Icon name="tabler:tabler:circle-plus-filled" size="24" />
      </NuxtLink>
    </div>
  </div>
</template>
