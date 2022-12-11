<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <template v-for="(item, index) in state.menuList" :key="index">
      <ComList :menuItem="item"></ComList>
    </template>
    <!-- <div v-for="item in state.menuList">{{ item.title }}</div> -->
    <div class="flex-grow" />

    <el-button type="primary">登录</el-button>
  </el-menu>
</template>

<script lang="ts" setup name="ComHeader">
const activeIndex = ref("1");
interface IState {
  menuList: object[];
}
const state = reactive<IState>({
  menuList: [
    {
      icon: "",
      path: "1",
      title: "首页",
      permiss: "1",
      children: [],
    },
    {
      icon: "",
      path: "2",
      title: "网易热评",
      permiss: "1",
      children: [],
    },
  ],
});
onMounted(() => {
  console.log("[ state.menuList ] >", state.menuList);
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
