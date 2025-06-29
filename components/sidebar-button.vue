<script setup lang="ts">
const props = defineProps<{
  label?: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div class="tooltip tooltip-right" :data-tip="showLabel ? undefined : props.label">
    <NuxtLink
      :to="props.href"
      :class="{ 'bg-primary': route.path === props.href }"
      class="gap-2 py-2 pr-2 pl-5 hover:bg-primary cursor-pointer flex flex-1 whitespace-nowrap overflow-hidden"
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
