import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  await useAsyncData("auth-store-init", async () => {
    await authStore.init();
    return null;
  });
});
