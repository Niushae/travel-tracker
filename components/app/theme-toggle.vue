<script lang="ts" setup>
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.value = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <!-- this hidden checkbox controls the state -->
    <input v-model="isDark" type="checkbox">

    <!-- sun icon -->
    <Icon
      class="swap-on"
      size="24"
      name="tabler:sun"
    />

    <!-- moon icon -->
    <Icon
      class="swap-off"
      size="24"
      name="tabler:moon-filled"
    />

  </label>
</template>
