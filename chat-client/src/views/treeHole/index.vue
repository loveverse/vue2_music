<template>
  <div class="excerpt" ref="to_bottom">
    <ul class="out" :class="flag && 'outPad'">
      <li class="card" v-for="item in findData" :key="item.id">
        <div class="artcle">
          <el-input
            v-if="item.id === aId"
            v-model="item.content"
            type="textarea"
            autosize
            @blur="update(item.id, item.content)"
            v-focus
          ></el-input>
          <p
            v-else
            class="title"
            :data-id="item.id"
            @click="edit($event, item.content)"
          >
            {{ item.content }}
          </p>
          <div class="tip">
            <p class="date_now">{{ item.date }}</p>
            <p class="author" v-if="item.author">--来自“{{ item.author }}”</p>
          </div>
        </div>
        <el-button
          v-if="flag"
          type="danger"
          size="mini"
          class="del"
          @click="del(item.id)"
          >删除</el-button
        >
      </li>
    </ul>
    <el-tag type="success"> 共&emsp;{{ findData.length }}&emsp;篇 </el-tag>
    <div class="iptText">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        ref="gainFocus"
        v-model="text"
      >
      </el-input>
      <el-input
        clearable
        placeholder="请输入作者"
        maxlength="30"
        v-model.trim="author"
      >
      </el-input>
      <el-button type="primary" size="medium" @click="handleAddExcerptData"
        >提交</el-button
      >
    </div>
    <el-backtop :bottom="100">
      <div class="backtop"></div>
    </el-backtop>
  </div>
</template>

<script lang="ts" setup>
import {
  getFindExcerptData,
  getAddExcerptData,
  getUpdateExcerptData,
  getDelExcerptData,
} from "@api/treeHole";
import { formatDate } from "@utils/commonFunction";
const state = reactive({
  findData: [],
  text: "",
  author: "",
  aId: 0,
  compare: "",
  flag: false,
});

const handleFindExcerptData = async () => {
  const result = await getFindExcerptData();
  state.findData = result;
};

// 添加数据
const handleAddExcerptData = async () => {
  if (!state.text.trim()) {
    // state.$message.warning("输入的内容不能为空！");
    state.text = "";
  } else {
    let dateData = formatDate(new Date(), "YYYY-MM-DD hh:mm:ss");
    const params = {
      content: state.text.trim(),
      author: state.author,
      flag: 1,
      date: dateData,
    };
    await getAddExcerptData(params);
    // state.websocketTransfer();
    // state.$message.success("内容发布成功！");
    state.text = "";
  }
};
// 编辑模式
const edit = async (
  e: { currentTarget: { dataset: { id: string | number } } },
  content: any
) => {
  if (!state.flag) return;
  // 接口和数据库中id都为数字类型，而event对象是字符串，需要转换
  state.aId = +e.currentTarget.dataset.id;
  state.compare = content;
};
const update = async (id: any, content: any) => {
  state.aId = 0;
  if (state.compare !== content) {
    await getUpdateExcerptData(id, content);
    // state.$message.success("内容修改成功！");
  }
};
const del = async (id: string) => {
  await getDelExcerptData(id);
  // this.websocketTransfer();
  // this.$message.success("内容删除成功！");
};
watch(
  () => state.text,
  (newVal) => {
    if (newVal === "loveverse") {
      state.flag = true;
    } else {
      state.flag = false;
    }
  }
);
onMounted(() => {
  handleFindExcerptData();
  // this.$refs.gainFocus.focus();
  // this.scrollBottom();
});
const { findData, text, author, aId, compare, flag } = toRefs(state);
</script>

<style lang="less" scoped>
.excerpt {
  .out {
    .card {
      position: relative;
      .artcle {
        margin: 20px auto;
        padding: 15px 20px 20px;
        border-radius: 15px;
        box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.2),
          -18px -18px 30px rgba(255, 255, 255, 1);
        /* 过渡时间 ease-out是指先快速 后慢速 */
        transition: all 0.2s ease-out;
        &:hover {
          /* inset 是内部阴影 默认是外部阴影outset */
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8),
            inset 18px 18px 30px rgba(0, 0, 0, 0.1),
            inset -18px -18px 30px rgba(255, 255, 255, 1);
        }
        .title {
          font-size: 20px;
          // margin-bottom: 10px;
          line-height: 33px;
          white-space: pre-wrap;
        }
        .tip {
          display: flex;
          justify-content: space-between;
          .author {
            margin-top: 10px;
          }
          .date_now {
            margin-left: 5px;
            color: #999;
          }
        }
      }
      .del {
        position: absolute;
        right: -80px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .outPad {
    padding-right: 80px;
  }
  .iptText {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px auto;
    .el-input {
      margin: 20px auto;
    }
  }
  /deep/ .el-backtop {
    width: 0;
    height: 0;
    bottom: 55px !important;
  }
  .backtop {
    border: 10px solid #9ddb95;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
  }
  .records {
    margin: 0 auto;
    text-align: center;
  }
}
</style>
