<template>
  <el-menu
    :default-active="activeIndex"
    class="love-menu"
    mode="horizontal"
    :ellipsis="false"
    :router="true"
  >
    <h4 class="title">love诗</h4>
    <div class="flex-grow" />
    <el-menu-item v-for="item in menu" :key="item.path" :index="item.path">{{
      item.label
    }}</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { menuTab } from "@utils/common";

const route = useRoute();
const activeIndex = ref("/home");
onMounted(() => {
  activeIndex.value = route.path;
});

const state = reactive<any>({
  menu: menuTab,
});
const { menu } = toRefs(state);
</script>

<style lang="less" scoped>
.flex-grow {
  flex-grow: 1;
}
.love-menu {
  .title {
    font-size: 30px;
    line-height: 60px;
    margin-left: 20px;
    white-space: nowrap;
  }
}
</style>
