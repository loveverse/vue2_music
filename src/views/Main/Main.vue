<template>
  <el-main width="1200px">
    <h2 class="recommendTitle">歌单推荐</h2>
    <el-tabs type="border-card">
      <el-tab-pane :label="item.name" v-for="item in hotSongList.tags" :key="item.id">{{item.name}}</el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Main",
  computed: {
    ...mapState(["hotSongList"]),
  },
  mounted() {
    this.$store.dispatch("getHotSongList")
  },
};
</script>

<style lang="less" scoped>
.el-main{
  padding: 0;
  .recommendTitle{
    font-size: 24px;
    text-align: center;
    margin: 10px;
  }
}
// #main {
//   width: 1200px;
//   margin: 0 auto;
//   padding: 0;
// }
// /deep/.el-main{
//   padding: 0;
// }
</style>
