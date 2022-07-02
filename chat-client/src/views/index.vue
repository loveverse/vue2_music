<template>
  <el-container class="wrapper">
    <el-header class="love-header"> <ComHeader /> </el-header>
    <router-view />
    <el-footer>备案号：鄂ICP备2021020610号</el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import ComHeader from "@components/ComHeader.vue";
</script>

<style lang="less" scoped>
.wrapper {
  width: 1200px;
  // max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  .love-header {
    padding: 0;
  }
}
</style>
