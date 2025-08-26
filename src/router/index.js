// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import frontRoutes from "./front";
import userRoutes from "./user";
import brandRoutes from "./brand";

// 其他單獨路由
const LoginView = () => import("@/views/LoginView.vue");
const UnauthorizedView = () => import("@/views/UnauthorizedView.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: UnauthorizedView,
  },

  // 合併各模組路由
  ...frontRoutes,
  ...userRoutes,
  ...brandRoutes,
  // fallback 404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守衛
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.token) {
    next("/login");
  } else if (to.meta.role && authStore.role !== to.meta.role) {
    next("/unauthorized");
  } else {
    next();
  }
});

export default router;
