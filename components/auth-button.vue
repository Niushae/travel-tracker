<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <button
    :disabled="authStore.loading"
    class="btn btn-accent"
    @click="authStore.signIn"
  >
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <div v-else class="flex gap-2 items-center">
      <p>
        Sign In With Github
      </p>
      <Icon name="tabler:brand-github" size="24" />
    </div>
  </button>
</template>
