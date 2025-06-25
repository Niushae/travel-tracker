export const useThemeStore = defineStore("useThemeStore", () => {
  const colorMode = useColorMode();
  const isDark = computed({
    get() {
      return colorMode.value === "dark";
    },
    set(value) {
      colorMode.preference = value ? "dark" : "light";
    },
  });

  return { isDark };
});
