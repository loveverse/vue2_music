<template>
  <div class="outer-container">
    <el-header height="70px" class="base-public">
      <ul class="header-container">
        <li><router-link to="/discove">首页</router-link></li>
        <li><span>排行榜</span></li>
        <li><span>歌单</span></li>
        <li class="header-search"><Search></Search></li>
        <li>
          <el-button v-if="!token" @click="login">登录</el-button>
          <el-button type="info" v-else @click="logout">退出登录</el-button>
        </li>
      </ul>
      <el-dialog
        center
        title="手机号登录"
        :visible.sync="dialogVisible"
        width="25%"
        :before-close="handleClose"
      >
        <el-form
          status-icon
          ref="ruleForm"
          :rules="rules"
          :model="user"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号:" label-width="80px" prop="phone">
            <el-input
              placeholder="请输入手机号"
              autocomplete="off"
              v-model="user.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" label-width="80px" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
              v-model="user.password"
            ></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-header>
  </div>
</template>

<script>
import { reqLotout, reqUserDetail } from "../../api";
import Search from "./Search/Search.vue";
import { expPhone, expPassword } from "../../utils/regExp";
import { mapState } from "vuex";
export default {
  name: "Header",
  components: {
    Search,
  },
  computed: {
    ...mapState(["token", "dialogVisible", "id"]),
  },
  data() {
    const validatorPhone = (rule, value, callback) => {
      if (!expPhone.test(value)) {
        callback(new Error("手机号只能为11位数字"));
      } else {
        callback();
      }
    };
    const validatorPass = (rule, value, callback) => {
      if (!expPassword.test(value)) {
        callback(
          new Error("以字母开头，长度在6~18之间，只能包含字母、数字和下划线")
        );
      } else {
        callback();
      }
    };
    return {
      user: {
        phone: "13593899735",
        password: "zcb174749",
      },
      rules: {
        phone: [
          {
            required: true,
            message: "手机号只能为11位数字",
            trigger: "change",
            validator: validatorPhone,
          },
        ],
        password: [
          {
            required: true,
            message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
            trigger: "change",
            validator: validatorPass,
          },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("getLogin", this.user);
          // console.log(this);
          // this.dialogVisible = false
        } else {
          this.$message.error("请检查输入是否合法！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      this.$store.commit("SAVE_DIA", true);
    },
    async logout() {
      const result = await reqLotout();
      if (result.code === 200) {
        this.$store.commit("RESET_TOKEN");
      } else {
        return Promise.reject(new Error("失败"));
      }
    },
    handleClose() {
      this.$store.commit("SAVE_DIA", false);
    },
  },
  // async mounted() {
  //   if(this.token){
  //     console.log(this.id);
  //     const result = await reqUserDetail(1505746291)
  //     console.log(result);
  //   }
  // },
  // watch: {
  //   token: {
  //     immediate: true,
  //     async handler(oldVal, newVal) {
  //       if (oldVal) {
  //         const result = await reqUserDetail(1505746291);
  //         // console.log(result);
  //       }
  //       // console.log(oldVal);
  //     },
  //   },
  // },
};
</script>

<style lang="less">
@bcolor: #fee;
.outer-container {
  background-color: @bcolor;
}
.base-public {
  width: 1200px;
  margin: 0 auto;
}
.el-header {
  // background-color: #b3c0d1;

  background: #4284db; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #29eac4,
    #4284db
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #29eac4,
    #4284db
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: #333;
  text-align: center;
  line-height: 70px;
}
.header-container {
  display: flex;
  justify-content: space-around;
}
/* .header-search{

} */
</style>
