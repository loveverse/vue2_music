<template>
  <el-container>
    <el-main>
      <h2 class="recommendTitle">歌单推荐</h2>
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "Main",
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    if(this.token){
      this.$store.dispatch("getRecommendList");
    }
  },
};
</script>

<style lang="less" scoped>
.recommendTitle {
}
</style>
