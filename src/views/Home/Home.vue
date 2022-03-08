<template>
  <div class="excerpt">
    <ul class="out">
      <li class="card" v-for="item in findData" :key="item.id">
        <el-input v-if="item.id == aId" v-model="item.content" type="textarea" autosize @blur="update(item.id, item.content)" v-focus></el-input>
        <p v-else class="title" :data-id="item.id" @click="edit($event,item.content)">{{item.content}}</p>
        <p class="author">--来自《{{item.author}}》</p>
      </li>
    </ul>
    <div class="iptText">
      <el-input
        type="textarea"
        
        autosize
        placeholder="请输入内容"
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
        aId: "",
        compare: ""
      }
    },
    methods: {
      websocketTransfer(){
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
      edit(e, content){
        this.aId = e.currentTarget.dataset.id
        this.compare = content.trim()
      },
      async update(id, content){
        this.aId = ''
        content = content.trim()
        if(this.compare !== content){
          await this.$API.reqUpdateExcerptData(id, content)
          this.$message({
            message: "内容修改成功！",
            type: "success"
          })
        }
        this.compare = content.trim()
      },
    },
    mounted(){
      this.getFindExcerptData()
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