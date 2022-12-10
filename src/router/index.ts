import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "/home",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/home/person",
        name: "person",
        component: () => import("@/views/person/index.vue"),
      },
      {
        path: "/home/hotword",
        name: "hotword",
        component: () => import("@/views/hotword/index.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
