<template>
  <div>
    <ul class="out">
      <li class="card" v-for="item in findData" :key="item.id">
        <div class="artcle" :data-id="item.id" @click="edit($event,item.content)">
          <el-input v-if="item.id == aId" v-model="item.content" @blur="update(item.id, item.content)" v-focus></el-input>
          <p class="title" v-else>{{item.content}}</p>
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
  import {getFindData, getAddData, getUpdateData} from '../../api/personal';
  

  export default {
    name: 'Personal',
    data(){
      return {
        findData: [],
        text: '',
        isShowEdit: true,
        aId: '',
        compare: '',
        isDel: !!sessionStorage.getItem('flag')
      }
    },
    methods: {
      async addContent(){
        if(!this.text){
          this.$message({
            message: "输入的内容不能为空！",
            type: "warning"
          })
        }else {
          const result = await getAddData(this.text)
          const ws = new WebSocket('ws://localhost:3000')
          // 客户端与服务端建立连接时触发，此时可向服务端传递参数
          ws.onopen = function(){
            ws.send(undefined)
          }
          // 客户端收到服务端发来的消息
          ws.onmessage = (res) => {
            this.findData = JSON.parse(res.data)
          }
          this.$message({
            message: "内容发布成功！",
            type: "success"
          })
          this.text = ''
        }
      },
      edit(e,content){
        // if(localStorage.getItem('token_key')){

        // }
        // console.log(e, content);
        this.aId = e.currentTarget.dataset.id
        this.compare = content
      },
      delOneData(id){
        console.log(id);
      },
      async update(id, content){
        this.aId = ''
        if(this.compare !== content){
          await getUpdateData(id, content)
          this.$message({
            message: "内容修改成功！",
            type: "success"
          })
        }
        
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
      // this.$bus.$on('isDelFn', (flag) => {
      //   sessionStorage.setItem('flag', flag)
      //   this.isDel = flag
      // })
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
    background: linear-gradient(145deg, #e7f0f4, #c2cacd);
    padding: 30px 100px;
    .card{
      position: relative;
      // border: 1px solid #454;
      
      &:last-child{
        margin-bottom: 0;
      }
      .artcle{
        margin: 0 auto 30px;
        padding: 10px;
        border-radius: 15px;
        box-shadow: 5px 5px 10px #868b8d,
              -5px -5px 10px #ffffff;
        &:hover{
          box-shadow: inset 5px 5px 10px #868b8d,
              inset -5px -5px 10px #ffffff;;
        }
        .title{
          font-size: 20px;
          color: #d8f;
          text-align: center;
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