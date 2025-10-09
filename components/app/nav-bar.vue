<script lang="ts" setup>
const themeStore = storeToRefs(useThemeStore());
</script>

<template>
  <ClientOnly>
    <div
      class="navbar"
      :class="{ 'bg-base-300': !themeStore.isDark, 'bg-base-200': themeStore.isDark }"
    >
      <div class="navbar-start">
        <NuxtLink to="/" class="btn btn-ghost text-xl">
          Travel Log
        </NuxtLink>
      </div>
      <div class="navbar-end">
        <AppThemeToggle />
        <AuthButton />
      </div>
    </div>
  </ClientOnly>
</template>
