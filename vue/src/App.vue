<template>
  <!-- <img src="./assets/logo.png" />
  <div>
    <p>
      If Element Plus is successfully added to this project, you'll see an
      <code v-text="'<el-button>'"></code>
      below
    </p>
    <el-button type="primary">el-button</el-button>
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <Main v-if="isLogin" />
  <Login v-else />
</template>

<script>
import Login from "./pages/Login.vue";
import Main from "./pages/Main.vue";
import { ref } from "vue";
//import HelloWorld from "./components/HelloWorld.vue";

// 更新令牌
let updateToken = async function (jues) {
  if (!jues.Jwt.isExpire() && jues.Jwt.isNeedUpdate()) {
    let result = await jues.put("/app/base/Jwt/UpdateToken");
    if (result.success) {
      let data = result.data;
      let expiresTime = new Date(data.Expires);
      let updateTime = new Date(data.Update);
      jues.Jwt.update(data.Token, expiresTime, updateTime);
      location.reload(true);
    }
  }
};

export default {
  name: "App",
  components: {
    //HelloWorld,
    Login,
    Main,
  },
  setup(props) {},
  data() {
    return {
      isLogin: false,
    };
  },
  async mounted() {
    let jues = this.$jues;
    // 注册Api成功事件
    jues.onSuccess((resp) => {
      console.log("onSuccess");
      updateToken(jues);
    });
    // 获取Jwt信息
    let data = await jues.get(
      "/app/base/Jwt/GetJwtData",
      jues.createApiOption((opt) => {
        opt.IsSuppressEvent = true;
        opt.onSuccess = function (resp) {
          console.log("onSuccess");
          updateToken(jues);
        };
      })
    );
    console.log(data);
    // 更新登录状态
    this.isLogin = data.success;
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
