const BrandLayout = () => import("@/layouts/BrandLayout.vue");

export default [
  {
    path: "/brand/dashboard",
    component: BrandLayout,
    meta: { requiresAuth: true, role: "Brand" },
    children: [
      {
        path: "",
        name: "BrandDashboard",
        component: () => import("@/views/Brand/BrandDashboardView.vue"),
      },
      {
        path: "analytics",
        name: "Analytics",
        component: () => import("@/views/Brand/Analytics.vue"),
      },
      {
        path: "discounts",
        name: "DiscountManager",
        component: () => import("@/views/Brand/DiscountManager.vue"),
      },
      {
        path: "courses/:id/edit",
        name: "EditCourse",
        component: () => import("@/views/Brand/EditCourse.vue"),
      },
      {
        path: "instructors/:id/edit",
        name: "EditInstructor",
        component: () => import("@/views/Brand/EditInstructor.vue"),
      },
      {
        path: "articles",
        name: "ArticleManager",
        component: () => import("@/views/Brand/ArticleManager.vue"),
      },
      {
        path: "articles/new",
        name: "NewArticle",
        component: () => import("@/views/Brand/NewArticle.vue"),
      },
      {
        path: "articles/:id/edit",
        name: "EditArticle",
        component: () => import("@/views/Brand/EditArticle.vue"),
      },
    ],
  },
];
