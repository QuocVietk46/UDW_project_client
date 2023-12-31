import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

import routes from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isAuthValid()) {
    if (confirm("Bạn cần đăng nhập để tiếp tục"))
      return {
        name: "Login",
        query: { redirect: to.fullPath },
      };
  }

  if (to.meta.requiresAdmin && !userStore.isAdmin()) {
    if (confirm("Bạn cần đăng nhập với tài khoản admin để tiếp tục"))
      return {
        name: "Login",
        query: { redirect: to.fullPath },
      };
  }
});

export default router;
