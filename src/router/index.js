import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: "/hot",
    name: "hot",
    component: () => import('../views/HotWord/HotWord.vue')
  },
  // {
  //   path: "/plot",
  //   name: "plot",
  //   component: () => import('../views/plot.vue')
  // },

  {
    path: "/404",
    name: "404",
    component: () => import('../views/Error404/Error404.vue')
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
