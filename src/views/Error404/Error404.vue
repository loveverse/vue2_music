<template>
  <div>
    页面不存在
  </div>
</template>

<script>
  export default {
    name: 'Error404',
    data() {
      return {
        timeId: null
      }
    },
    mounted(){
      this.$message.warning("您访问的页面不存在，将在3秒后跳转到主页！")
      this.timeId = setTimeout(() => {
        this.$router.push({name: "home"})
      }, 3000)
    },
    beforeDestroy(){
      clearTimeout(this.timeId)
    }
  }
</script>

<style lang="less" scoped>
  
</style>