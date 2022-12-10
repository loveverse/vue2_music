<template>
  <el-container class="layout_wrapper">
    <el-header>
      <ComHeader></ComHeader>
    </el-header>
    <el-main>
      <router-view>
        <Transition name="move" mode="out-in"> </Transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.layout_wrapper {
  width: 100%;
  height: 100%;
}
</style>
