<script setup lang="ts">
const props = defineProps<{
  label?: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
const themeStore = useThemeStore();
</script>

<template>
  <div class="tooltip tooltip-right" :data-tip="showLabel ? undefined : props.label">
    <NuxtLink
      :to="props.href"
      :class="{ 'bg-primary': route.path === props.href && themeStore.isDark, 'bg-accent-content text-white': route.path === props.href && !themeStore.isDark, 'hover:bg-primary': themeStore.isDark, 'hover:bg-accent-content hover:text-white': !themeStore.isDark }"
      class="gap-2 py-4 pr-2 pl-5 cursor-pointer flex flex-1 whitespace-nowrap overflow-hidden transition-all"
    >
      <Icon
        :name="props.icon"
        class="flex-shrink-0"
        size="24"
      />
      <Transition name="fade">
        <span v-show="showLabel">
          {{ props.label }}
        </span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
  .fade-leave-active,
.fade-enter-active {
  transition: all 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
