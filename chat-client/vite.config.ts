import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
//引入自动引入插件
import AutoImport from "unplugin-auto-import/vite";

function reslovePath(path: string) {
  return resolve(__dirname, path);
}

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  // const data = await asyncFunction();
  // return {

  // };
  if (command === "serve") {
    // dev配置
    return {
      plugins: [
        vue(),
        AutoImport({
          imports: ["vue", "vue-router"],
          dts: "src/auto-import.d.ts",
        }),
      ],
      resolve: {
        alias: {
          "@": reslovePath("./src"),
          "@components": reslovePath("./src/components"),
          "@views": reslovePath("./src/views"),
          "@utils": reslovePath("./src/utils"),
          "@api": reslovePath("./src/api"),
          "@assets": reslovePath("./src/assets"),
        },
      },
    };
  } else {
    // build配置
    return {};
  }
});
function asyncFunction() {
  // 需要调用的异步函数
  throw new Error("Function not implemented.");
}
