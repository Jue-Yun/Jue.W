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
//import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    //HelloWorld,
    Login,
    Main,
  },
  data() {
    return {
      isLogin: false,
    };
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
