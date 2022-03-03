<template>
  <div>
    <ul class="out">
      <li class="card">
        <p class="title">4324</p>
        <div class="songName">
          <span>评论者：</span>
          <span>歌曲名：</span>
        </div>
      </li>
      <li class="card">
        <p class="title">4324</p>
        <div class="songName">
          <span>评论者：</span>
          <span>歌曲名：</span>
        </div>
      </li>
      <li class="card">
        <p class="title">4324</p>
        <div class="songName">
          <span>评论者：</span>
          <span>歌曲名：</span>
        </div>
      </li>
    </ul>
    <div class="iptText">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="text">
      </el-input>
      <el-button type="primary" size="medium">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {getFindData} from '../../api/personal';
  export default {
    name: 'Personal',
    data(){
      return {
        findData: [],
        text: ''
      }
    },
    async mounted(){
      // axios.get('http://localhost:3000/find')
      const result = await getFindData()
      this.findData = result
      console.log(result);
    }
  }
</script>

<style lang="less" scoped>
  .out{
    background: linear-gradient(145deg, #e7f0f4, #c2cacd);
    padding: 30px;
    .card{
      // border: 1px solid #454;
      margin: 0 auto 30px;
      padding: 10px;
      border-radius: 15px;
      box-shadow: 5px 5px 10px #868b8d,
             -5px -5px 10px #ffffff;;
      &:last-child{
        margin-bottom: 0;
      }
      &:hover{
        box-shadow: inset 5px 5px 10px #868b8d,
            inset -5px -5px 10px #ffffff;;
      }
      .title{
        font-size: 28px;
        color: #d8f;
        text-align: center;
      }
      .songName{
        text-align: right;
      }
    }
  }
  .iptText{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px auto;
    .el-textarea{
      margin-bottom: 20px !important;
    }
  }  
  
</style>