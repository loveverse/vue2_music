import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
import "./assets/css/index.css";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);
app.use(ElementPlus).use(router).mount("#app");

// 全局注册element-plus icon图标组件
Object.keys(Icons).forEach((key) => {
  //循环遍历组件名称
  if ("Menu" !== key) {
    //如果不是图标组件不是Menu，就跳过，否则加上ICon的后缀
    app.component(key, Icons[key as keyof typeof Icons]);
  } else {
    app.component(key + "Icon", Icons[key]); //MenuIcon
  }
});
