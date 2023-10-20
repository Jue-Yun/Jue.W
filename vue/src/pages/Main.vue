<template>
  <el-container class="main-container">
    <el-header class="main-header">
      <div class="logo"><img src="logo_60.png" alt="" /></div>
      <div class="buttons">
        <el-button
          icon="SwitchButton"
          class="button"
          circle
          type="danger"
          @click="onExit"
        ></el-button>
        <el-button icon="Warning" class="button" circle type="info"></el-button>
        <el-button icon="Setting" class="button" circle type="info"></el-button>
      </div>
    </el-header>
    <el-container class="main-container">
      <el-aside class="main-aside">
        <ul>
          <li class="head">
            <el-icon color="#f0f0f0" class="head-icon"><Menu /></el-icon>
            <el-text tag="b" style="font-size: 16px; color: #f0f0f0; line-height: 24px"
              >功能列表</el-text
            >
          </li>
          <li>
            <el-icon color="#f0f0f0" class="icon"><Files /></el-icon>
            <el-text tag="b" style="font-size: 14px; color: #f0f0f0; line-height: 18px"
              >测试分类</el-text
            >
          </li>
          <li class="item">
            <a href="javascript:;">
              <el-icon color="#f0f0f0" class="icon"><Document /></el-icon>
              <el-text style="font-size: 14px; color: #f0f0f0; line-height: 18px"
                >测试功能</el-text
              >
            </a>
          </li>
        </ul>
      </el-aside>
      <el-main class="main-area">
        <el-tabs v-model="page">
          <el-tab-pane label="概览" name="home" class="pane">
            <Overview />
          </el-tab-pane>
          <el-tab-pane label="2页" name="home2" closable="true" class="pane">
            <div>这是2面</div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Overview from "../components/Overview.vue";

export default {
  name: "MainPage",
  components: {
    Overview,
  },
  data() {
    return {
      page: "home",
    };
  },
  methods: {
    // 退出登录
    onExit() {
      let jues = this.$jues;
      jues.Jwt.clear();
      location.reload(true);
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.main-header {
  height: 60px;
  background: #333;
}
.main-header .logo {
  float: left;
  width: 200px;
  height: 100%;
}
.main-header .logo img {
  margin-top: 10px;
  height: 40px;
}
.main-header .buttons {
  float: right;
  height: 100%;
  padding: 14px 14px 0px;
}
.main-header .button {
  float: right;
  height: 32px;
  width: 32px;
  margin-left: 14px;
  /* padding: 0px 10px; */
  /* background: #333; */
  /* color: #ededed; */
}
.main-aside {
  width: 200px;
  background: #3a3a3a;
  padding: 0px 10px;
}
.main-aside ul {
  padding: 0px;
  margin: 0px;
  width: 100%;
}
.main-aside li {
  padding: 10px 10px;
  margin: 0px;
  width: 100%;
  text-align: left;
}
.main-aside .head {
  text-align: center !important;
  border-bottom: 1px solid #333;
}
.main-aside .head-icon {
  margin: 0px 5px 0px 0px;
  height: 24px;
  vertical-align: top;
}
.main-aside .icon {
  margin: 0px 5px 0px 0px;
  height: 18px;
  vertical-align: top;
}
.main-aside .item {
  padding: 0px !important;
}
.main-aside .item a {
  display: block;
  text-decoration: none;
  padding: 5px 10px 5px 24px;
  border-radius: 6px;
}
.main-aside .item a:hover {
  background: #484848;
}
.main-area {
  padding: 0px;
}
.main-area .pane {
  padding: 0px 5px;
}
</style>
