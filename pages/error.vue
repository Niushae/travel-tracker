<script setup>
const route = useRoute();
const error = route.query.error || "An unknown error occurred";
const themeStore = useThemeStore();
</script>

<template>
  <div class="container card bg-base-300 min-h-72 mx-auto mt-4 flex items-center justify-center gap-4">
    <div
      role="alert"
      :class="{ 'alert-outline': !themeStore.isDark }"
      class="alert alert-error flex flex-col font-bold w-1/3"
    >
      <Icon
        name="tabler:alert-circle"
        size="56"
      />
      <span>Oh no! {{ error }}</span>
    </div>
    <NuxtLink to="/" class="btn btn-primary flex gap-0">
      <Icon name="tabler:chevron-left" size="24" />
      <p>
        Go Back
      </p>
    </NuxtLink>
  </div>
</template>
