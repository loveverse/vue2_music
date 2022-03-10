<template>
  <div class="hotword">
    <ul class="out" v-if="findData">
      <li class="card" v-for="item in findData" :key="item.id">
        <p class="title">{{item.content}}</p>
        <a :href="item.url">
          --来自网易云音乐《{{item.name}}》
        </a>
      </li>
    </ul>
    <el-pagination
      style="text-align: center;margin-bottom: 20px"
      small
      @current-change="handlerPage"
      background
      :current-page="currentPage"
      :page-size="10"
      :pager-count="5"
      layout="prev, pager, next, total"
      :total="total">
    </el-pagination>
    <el-backtop :bottom="100">
      <div class="backtop">
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { reqPageFindData} from '../../api';
  export default {
    name: 'HotWord',
    data() {
      return {
        findData: [],
        limit: 10,    // 每页显示数
        currentPage: parseInt(sessionStorage.getItem('page')),   // 当前页
        total: 0,
        oneDay: 1000 * 60 * 60 * 24,      // 一天时间
      }
    },
    methods: {
      websocketTransfer(){
        // const ws = new WebSocket('wss://loveverse.top/socket')
        const ws = new WebSocket('wss://localhost:10000')
        // 客户端与服务端建立连接时触发，此时可向服务端传递参数
        ws.onopen = function(){
          ws.send(undefined)
        }
        // 客户端收到服务端发来的消息
        ws.onmessage = (res) => {
          this.findData = JSON.parse(res.data)
        }
      },
      // 回到顶部动画效果
      backTop(){
        let top = document.body.scrollTop || document.documentElement.scrollTop
        let timeId = setInterval(() => {
          document.body.scrollTop = document.documentElement.scrollTop = top -= 50
          if(top <= 0){
            clearInterval(timeId)
          } 
        }, 10)
        
      },
      // 改变当前页触发的事件
      async handlerPage(page = 1){
        this.currentPage = page
        sessionStorage.setItem('page', this.currentPage)
        const result = await reqPageFindData(this.limit, this.currentPage)
        this.findData = result.list
        this.total = result.total
        // window.scrollTo(0, 0)
        this.backTop()
      }
    },
    mounted(){
      let page = parseInt(sessionStorage.getItem('page'))
      // 有page就传，没有就传默认值1
      this.handlerPage(page || 1)

      // 当前时间戳大于过期时间，执行一次
      if(Date.now() > ((+localStorage.getItem('expires') || 0) + this.oneDay)){
        localStorage.setItem('expires', Date.now())
        this.$notify({
          message: "点击歌名可跳转到对应歌曲",
          duration: 2000
        })
      }
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
          white-space: pre-wrap;
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
      border: 10px solid #9ddb95;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }
</style>