<template>
  <div>
    <ul>
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/hot">网易热评</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: ''
  }
</script>

<style lang="less" scoped>
  ul{
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    // max-width: 1200px;
    background-color: #fee;
    li{
      padding: 10px ;
      font-size: 16px;
      a{
        color: #f00;
      }
    }
  }
</style>