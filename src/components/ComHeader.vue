<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <div class="flex-grow" />

    <el-button type="primary">登录</el-button>
  </el-menu>
</template>

<script lang="ts" setup name="ComHeader">
import { ref, reactive } from "vue";
const activeIndex = ref("1");
const state = reactive({
  menuList: [
    {
      icon: "",
      path: "",
      title: "首页",
      permiss: "1",
      children: [],
    },
    {
      icon: "",
      path: "",
      title: "网易热评",
      permiss: "1",
      children: [],
    },
  ],
});
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
