<template>
  <el-main>
    <h2 class="recommendTitle">歌单推荐</h2>
    <el-tabs type="border-card" v-model="params.cat" @tab-click="handleClick">
      <el-tab-pane
        :label="item.name"
        v-for="item in hotSongList.tags"
        :key="item.id"
        :name="item.name"
      >
        <div class="outPlayList">
          <div v-for="play in playList" :key="play.id" class="playList">
            <el-image
              style="width: 200px; height: 200px"
              :src="play.coverImgUrl"
            ></el-image>
            <h2>{{ play.name }}</h2>
        </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import { mapState } from "vuex";
import { reqPlayList } from "../../api";
export default {
  name: "Main",
  // 获取网页精选碟歌单不能使用computed，有缓存
  computed: {
    ...mapState(["hotSongList"]),
  },
  data() {
    return {
      params: {
        cat: "华语",
        limit: 10,
      },
      playList: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      this.params.cat = tab.name;
    },
  },
  async mounted() {
    this.$store.dispatch("getHotSongList");
  },
  watch: {
    ["params.cat"]: {
      immediate: true,
      deep: true,
      async handler(newVal,oldVal){
        this.playList = []
        this.params.cat = newVal
        const {cat, limit} = this.params
        // console.log(this.params);
        const result = await reqPlayList(cat,limit)
        // console.log(result);
        this.playList = result.playlists
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-main {
  padding: 0;
  margin: 0 auto;
  .recommendTitle {
    font-size: 24px;
    text-align: center;
    margin: 10px;
  }
  .outPlayList{
    display: flex;
    .playList{
      padding: 0 20px;
    }
  }
}

</style>
