<template>
  <el-container class="main-container">
    <el-header class="main-header">Header</el-header>
    <el-container class="main-container">
      <el-aside class="main-aside">Aside</el-aside>
      <el-main class="main-area">
        <el-tabs v-model="page">
          <el-tab-pane label="主页" name="home" class="pane">
            <div>这是主界面</div>
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
export default {
  name: "MainPage",
  data() {
    return {
      page: "home",
    };
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
.main-aside {
  width: 200px;
  background: #666;
}
.main-area {
  padding: 0px;
}
.main-area .pane {
  padding: 0px 5px;
}
</style>
