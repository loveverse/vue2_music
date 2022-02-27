<template>
  <div>
    <h2>手机号登录</h2>
    <div>
      <div>手机号：<input type="text" name="" id="" v-model="username" /></div>
      <div>
        密&ensp;&ensp;码：<input type="text" name="" id="" v-model="password" />
      </div>
    </div>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "13593899735",
      password: "zcb174749",
    };
  },
  methods: {
    async onSubmit() {
      /* axios.post('https://music-api-delta.vercel.app/login/cellphone',{phone:this.username, password: this.password}).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      }) */
      this.$store.dispatch("getLogin")
      // await reqLogin(this.username, this.password);
      // console.log(result);
    },
  },
};
</script>

<style></style>
