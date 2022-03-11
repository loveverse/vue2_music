import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/personal"
  },
  {
    path: "/main",
    name: "main",
    component: () => import('../views/Main/Main.vue')
  },
  {
    path: "/personal",
    name: "perosnal",
    component: () => import('../views/Personal/Personal.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
