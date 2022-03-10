<template>
  <div class="excerpt">
    <ul class="out outPad">
      <li class="card" v-for="item in findData" :key="item.id">
        <div class="artcle">
          <el-input v-if="item.id === aId" v-model="item.content" type="textarea" autosize @blur="update(item.id, item.content)" v-focus></el-input>
          <p v-else class="title" :data-id="item.id" @click="edit($event,item.content)">{{item.content}}</p>
          <p class="author" v-if="item.author">--来自“{{item.author}}”</p>
        </div>
        <el-button type="danger" size="mini" class="del" @click="del(item.id)">删除</el-button>
      </li>
    </ul>
    <div class="iptText">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        ref="gainFocus"
        v-model="text">
      </el-input>
      <el-input
        clearable
        placeholder="请输入作者"
        maxlength="30"
        v-model.trim="author">
      </el-input>
      <el-button type="primary" size="medium" @click="addExcerptData">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        findData: [],
        text:"",
        author: "",
        aId: 0,
        compare: ""
      }
    },
    methods: {
      websocketTransfer(){
        const ws = new WebSocket('wss://localhost:10000')
        // const ws = new WebSocket('wss://loveverse.top/socket')
        // 客户端与服务端建立连接时触发，此时可向服务端传递参数
        ws.onopen = function(){
          ws.send(undefined)
        }
        // 客户端收到服务端发来的消息
        ws.onmessage = (res) => {
          this.findData = JSON.parse(res.data)
        }
      },
      async getFindExcerptData(){
        const result = await this.$API.reqFindExcerptData()
        this.findData = result
      },
      // 添加数据
      async addExcerptData(){
        if(!this.text.trim()){
          this.$message.warning("输入的内容不能为空！")
          this.text = ""
        }else{
          const params = {
            content: this.text.trim(),
            author: this.author,
            flag: 1
          }
          await this.$API.reqAddExcerptData(params)
          this.websocketTransfer()
          this.$message.success("内容发布成功！")
          this.text = ""
        }
      },
      // 编辑模式
      edit(e, content){
        // 接口和数据库中id都为数字类型，而event对象是字符串，需要转换
        this.aId = +e.currentTarget.dataset.id
        this.compare = content
      },
      async update(id, content){
        this.aId = 0
        if(this.compare !== content){
          await this.$API.reqUpdateExcerptData(id, content)
          this.$message.success("内容修改成功！")
        }
      },
      async del(id){
        await this.$API.reqDelExcerptData(id)
        this.websocketTransfer()
        this.$message.success("内容删除成功！")
      }
    },
    mounted(){
      this.getFindExcerptData()
      this.$refs.gainFocus.focus()
    },
    directives: {
      focus:{
        inserted: function(el, binding) {
          // 这里input外层包裹了一层div
          el.children[0].focus()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .excerpt{
    .out{
      .card{
        position: relative;
        .artcle{
          margin: 20px auto;
          padding: 15px 20px 20px;
          border-radius: 15px;
          box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.2),
            -18px -18px 30px rgba(255, 255, 255, 1);
          /* 过渡时间 ease-out是指先快速 后慢速 */
          transition: all 0.2s ease-out;
          &:hover{
          /* inset 是内部阴影 默认是外部阴影outset */
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8),
            inset 18px 18px 30px rgba(0, 0, 0, 0.1),
            inset -18px -18px 30px rgba(255, 255, 255, 1);
          }
          .title{
            font-size: 20px;
            // margin-bottom: 10px;
            line-height: 33px;
            white-space: pre-wrap;
          }
          .author{
            margin-top: 10px;
          }
        }
        .del{
          position: absolute;
          right: -80px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .outPad{
      padding-right: 80px;
    }
    .iptText{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 30px auto;
      .el-input {
        margin: 20px auto;
      }
    }  
  }
</style>