import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/trucks",
      name: "trucks",
      component: () => import("../views/trucks/Index.vue"),
    },
  ],
});

export default router;
