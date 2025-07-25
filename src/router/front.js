const FrontLayout = () => import("@/layouts/FrontLayout.vue");

export default [
  {
    path: "/",
    component: FrontLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/AboutView.vue"),
      },
      {
        path: "promotions",
        name: "Promotions",
        component: () => import("@/views/PromotionView.vue"),
      },
      {
        path: "/search",
        name: "SearchResults",
        component: () => import("@/views/SearchResultsView.vue"),
      },
      {
        path: "search",
        name: "SearchResults",
        component: () => import("@/views/SearchResultsView.vue"),
      },
      {
        path: "courses",
        name: "Courses",
        component: () => import("@/views/CoursesView.vue"),
      },
      {
        path: "courses/categories/:id",
        name: "CoursesCategories",
        component: () => import("@/views/CoursesCategory.vue"),
      },
      {
        path: "instructors/:id",
        name: "InstructorDetailView",
        component: () => import("@/views/InstructorDetailView.vue"),
      },
      {
        path: "courses/:id",
        name: "CourseDetail",
        component: () => import("@/views/CourseDetailView.vue"),
      },
      {
        path: "articles",
        name: "Articles",
        component: () => import("@/views/ArticlesView.vue"),
      },
      {
        path: "articles/:id",
        name: "ArticleDetail",
        component: () => import("@/views/ArticleDetailView.vue"),
      },
      {
        path: "articles/category/:categoryId",
        name: "ArticlesCategory",
        component: () => import("@/views/ArticlesCategoryView.vue"),
      },
    ],
  },
];
