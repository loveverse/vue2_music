import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   redirect: "/main"
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/",
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: "/hot",
    name: "hot",
    component: () => import('../views/HotWord/HotWord.vue')
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
