import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// 待補每個頁面的meta.title和description
// 待補404頁面
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/user/dashboard",
    name: "UserDashboard",
    component: () => import("@/views/userDashboardView.vue"),
    meta: { requiresAuth: true, role: "User" },
  },
  {
    path: "/brand/dashboard",
    name: "BrandDashboard",
    component: () => import("@/views/BrandDashboardView.vue"),
    meta: { requiresAuth: true, role: "Brand" },
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: () => import("@/views/UnauthorizedView.vue"),
  },
  // fallback功能
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 檢查使用者的訪問權限，導引至對應頁面
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
