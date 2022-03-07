<template>
  <div class="hotword">
    <ul class="out">
      <li class="card" v-for="item in findData" :key="item.id">
        <p class="title">{{item.content}}</p>
        <a :href="item.url">
          --来自音乐《{{item.name}}》
        </a>
      </li>
    </ul>
  <el-backtop :bottom="100">
    <div class="backtop">
      
    </div>
  </el-backtop>
  </div>
</template>

<script>
import {reqFindData} from '../../api/personal';
  export default {
    name: 'HotWord',
    data() {
      return {
        findData: []
      }
    },
    methods: {
      websocketTransfer(){
        // const ws = new WebSocket('ws://1.12.252.87:3000')
        const ws = new WebSocket('ws://localhost:3001')
        // 客户端与服务端建立连接时触发，此时可向服务端传递参数
        ws.onopen = function(){
          ws.send(undefined)
        }
        // 客户端收到服务端发来的消息
        ws.onmessage = (res) => {
          this.findData = JSON.parse(res.data)
        }
      },
      async getFindData(){
        const result = await reqFindData()
        this.findData = result
      }
    },
    mounted(){
      this.getFindData()
      this.$notify({
        message: "点击歌名可跳转到对应歌曲",
        duration: 2000
      })
    }
  }
</script>

<style lang="less" scoped>
  .hotword{
    // max-width: 1200px;
    .out{
      // background: #efeeee;;
      .card{
        margin: 20px auto;
        padding: 15px 20px 20px;
        // height: 100px;
        border-radius: 15px;
        box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.2),
          -18px -18px 30px rgba(255, 255, 255, 1);
        /* 过渡时间 ease-out是指先快速 后慢速 */
        transition: all 0.2s ease-out;
        // box-shadow: 5px 5px 10px #868b8d,
        //       -5px -5px 10px #ffffff;
        &:hover{
          /* inset 是内部阴影 默认是外部阴影outset */
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8),
            inset 18px 18px 30px rgba(0, 0, 0, 0.1),
            inset -18px -18px 30px rgba(255, 255, 255, 1);
          // box-shadow: inset 5px 5px 10px #868b8d,
          //     inset -5px -5px 10px #ffffff;
        }
        .title{
          font-size: 20px;
          margin-bottom: 10px;
          line-height: 30px;
        }
        a{
          // display: block;
          color: #656D78;
          
        }
      }
    }
    /deep/ .el-backtop{
      width: 0;
      height: 0;
    }
    .backtop{
      // height: 100%;
      // width: 100%;
      border: 10px solid #9ddb95;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      // background-color: #f2f5f6;
      // box-shadow: 0 0 6px rgba(0,0,0, .12);
      // text-align: center;
      // line-height: 40px;
      // color: #1989fa;
    }
  }
</style>