<template>
  <div class="login" :style="backgroundStyle">
    <div class="box-bg"></div>
    <div class="box">
      <div class="logo"><img src="logo_1800.png" alt="" /></div>
      <div class="form">
        <div class="line">
          <el-input
            v-model="userName"
            placeholder="用户名"
            :disabled="false"
            :clearable="true"
            prefix-icon="User"
            ref="inputUser"
            @keyup.enter="onPassword()"
          />
        </div>
        <div class="line">
          <el-input
            v-model="userPwd"
            placeholder="密码"
            :disabled="false"
            :clearable="true"
            :show-password="true"
            prefix-icon="Lock"
            ref="inputPassword"
            @keyup.enter="onLogin()"
          />
        </div>
        <div class="line">
          <div class="left link"><el-link icon="Key" type="info">忘记密码</el-link></div>
          <div class="right">
            <el-button type="success" v-on:click="onLogin">登录</el-button>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";

export default {
  name: "LoginPage",
  data() {
    return {
      userName: "",
      userPwd: "",
      backgroundStyle: {
        backgroundImage: "url(" + require("../../public/background.jpg") + ")",
      },
    };
  },
  methods: {
    onPassword() {
      this.$refs.inputPassword.focus();
    },
    async onLogin() {
      let jues = this.$jues;
      let result = await jues.post("/app/base/User/Login", {
        userName: this.userName,
        password: md5("user=" + this.userName + ";pwd=" + this.userPwd + ";"),
      });
      if (result.success) {
        let data = result.data;
        let expiresTime = new Date(data.Expires);
        let updateTime = new Date(data.Update);
        jues.Jwt.update(data.Token, expiresTime, updateTime);
        location.reload(true);
      }
    },
  },
  mounted() {
    //console.log(this.$refs);
    this.$refs.inputUser.focus();
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background-position: center center;
  background-repeat: no-repeat;
}
.login .box {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -220px;
  margin-left: -180px;
  width: 360px;
  z-index: 1;
}
.login .box-bg {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -170px;
  margin-left: -180px;
  width: 360px;
  height: 264px;
  background: #000;
  padding: 20px 0;
  border-radius: 20px;
  opacity: 0.75;
  z-index: 0;
}
.login .logo {
  margin: 0 auto;
  width: 240px;
  background-color: #000;
  border-radius: 60px;
  padding: 20px 40px;
  margin-bottom: 10px;
}
.login .logo img {
  width: 100%;
}
.login .form {
  margin: 0 auto;
  width: 260px;
}
.login .form .line {
  margin: 20px 0 0;
  width: 100%;
}
.login .link {
  margin-top: 8px;
}
.login .left {
  float: left;
}
.login .right {
  float: right;
}
.login .clear {
  clear: both;
}
</style>
