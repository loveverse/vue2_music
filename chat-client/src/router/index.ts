import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@views/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@views/home/index.vue"),
      },
      {
        path: "/article",
        name: "article",
        component: () => import("@views/article/index.vue"),
      },
      {
        path: "/treehole",
        name: "treehole",
        component: () => import("@views/treeHole/index.vue"),
      },
      {
        path: "/pigeonhole",
        name: "pigeonhole",
        component: () => import("@views/pigeonhole/index.vue"),
      },
      {
        path: "/aboutme",
        name: "aboutme",
        component: () => import("@views/aboutMe/index.vue"),
      },
    ],
  },
];
const staticRoutes: Array<RouteRecordRaw> = [...asyncRoutes];

const routes = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
});

export default routes;
