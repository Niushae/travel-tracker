<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div v-if="!authStore.loading && authStore.user" class="dropdown dropdown-end">
    <div
      tabindex="0"
      role="button"
      class="flex gap-2 items-center m-1 cursor-pointer"
    >
      <div v-if="authStore.user.image" class="avatar flex">
        <div class="w-8 rounded-full">
          <img :src="authStore.user.image" :alt="authStore.user.name">
        </div>
      </div>
      {{ authStore.user.name }}
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
      <li>
        <NuxtLink to="/sign-out">
          <Icon
            name="tabler:logout-2"
            size="24"
          />
          Sign Out
        </NuxtLink>
      </li>
    </ul>
  </div>
  <button
    v-else
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
