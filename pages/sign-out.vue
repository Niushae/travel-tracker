<script lang="ts" setup>
const authStore = useAuthStore();

onMounted(() => {
  authStore.signOut();
  navigateTo("/");
});
</script>

<template>
  <div class="container card bg-base-300 min-h-72 mx-auto mt-4 flex items-center justify-center gap-4">
    <span v-if="authStore.loading" class="loading loading-spinner loading-xl" />
  </div>
</template>
