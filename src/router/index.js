import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: "/hot",
    name: "hot",
    component: () => import('../views/HotWord/HotWord.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
