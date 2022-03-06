<template>
  <div>
    <ul class="out" :class="isDel && 'outPad'" >
      <li class="card" v-for="item in findData" :key="item.id">
        <div class="artcle" >
          <el-input type="textarea" autosize v-if="item.id == aId" v-model="item.content" @blur="update(item.id, item.content)" @keyup.enter.native="blur" v-focus></el-input>
          <p class="title" v-else :data-id="item.id" @click="edit($event,item.content)">{{item.content}}</p>
          <div class="songName" v-if="item.name">
            <span>评论者：{{item.name}}--</span>
            <span>歌曲名：{{item.songname}}</span>
          </div>
        </div>
        <el-button type="danger" size="mini" class="del" v-show="isDel" @click="delOneData(item.id)">删除</el-button>
      </li>
    </ul>
    <div class="iptText">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="text">
      </el-input>
      <el-button type="primary" size="medium" @click="addContent">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {getFindData, getAddData, getUpdateData,getDelData} from '../../api/personal';

  export default {
    name: 'Personal',
    data(){
      return {
        findData: [],
        text: '',
        isShowEdit: true,
        aId: '',
        compare: '',
        isDel: !!localStorage.getItem('flag')
      }
    },
    methods: {
      websocketTransfer(){
        // const ws = new WebSocket('ws://1.12.252.87:3000')
        const ws = new WebSocket('ws://localhost:3000')
        // 客户端与服务端建立连接时触发，此时可向服务端传递参数
        ws.onopen = function(){
          ws.send(undefined)
        }
        // 客户端收到服务端发来的消息
        ws.onmessage = (res) => {
          this.findData = JSON.parse(res.data)
        }
      },
      async addContent(){
        if(!this.text.trim()){
          this.$message({
            message: "输入的内容不能为空！",
            type: "warning"
          })
          this.text = ''
        }else {
          const result = await getAddData(this.text)
          this.websocketTransfer()
          this.$message({
            message: "内容发布成功！",
            type: "success"
          })
          this.text = ''
        }
      },
      // 编辑模式
      edit(e,content){
        if(this.isDel){
          this.aId = e.currentTarget.dataset.id
          this.compare = content.trim()
        }
        // console.log(e, content);
        
      },
      blur(e){
        e.target.blur()
      },
      async delOneData(id){
        // console.log(id);
        const result = await getDelData(id)
        this.websocketTransfer()
        // console.log(result);
        this.$message({
          message: "内容删除成功！",
          type: "success"
        })
      },
      async update(id, content){
        this.aId = ''
        content = content.trim()
        if(this.compare !== content){
          if(!content) this.delOneData(id)
          await getUpdateData(id, content)
          this.$message({
            message: "内容修改成功！",
            type: "success"
          })
        }
        this.compare = content.trim()
      },
      async getFindData(){
        const result = await getFindData()
        this.findData = result
      }
    },
    mounted(){
      // console.log(this.isDel);
      // this.isDel = 
      // console.log(this.isDel);
      this.getFindData()
      this.$bus.$on('isDelFn', (flag) => {
        localStorage.setItem('flag', flag)
        this.isDel = flag
      })
    },
    // beforeDestroy(){
    //   this.$bus.$off('isDel')
    // },
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
  
  .out{
    background: #efeeee;;
    padding: 30px;
    .card{
      position: relative;
      // border: 1px solid #454;
      
      &:last-child{
        margin-bottom: 0;
      }
      .artcle{
        margin: 0 auto 30px;
        padding: 10px;
        height: 100px;
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
          color: #66b1ff;
          text-align: center;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .songName{
          text-align: right;
        }
      }
      
      // a{
      //   display: block;
      // }
      
      .del{
        position: absolute;
        right: -70px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .outPad{
    padding-right: 100px;
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