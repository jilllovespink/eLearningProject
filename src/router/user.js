const BaseLayout = () => import("@/layouts/BaseLayout.vue");

export default [
  {
    path: "/user/dashboard",
    component: BaseLayout,
    meta: { requiresAuth: true, role: "User" },
    children: [
      {
        path: "",
        name: "UserDashboard",
        component: () => import("@/views/User/UserDashboardView.vue"),
      },
      {
        path: "courses",
        name: "UserCourses",
        component: () => import("@/views/User/UserCourses.vue"),
      },
      {
        path: "courses/:id",
        name: "CoursePlayer",
        component: () => import("@/views/User/CoursePlayer.vue"),
      },
      {
        path: "profile",
        name: "UserProfile",
        component: () => import("@/views/User/UserProfile.vue"),
      },
    ],
  },
];
