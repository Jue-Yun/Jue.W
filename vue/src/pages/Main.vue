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
        <el-button
          icon="Warning"
          class="button"
          circle
          type="info"
          @click="onAboutCreateOrShow"
        ></el-button>
        <el-button
          icon="Setting"
          class="button"
          circle
          type="info"
          @click="onSettingCreateOrShow"
        ></el-button>
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
          <template v-for="menu in menus" :key="menu.id">
            <li>
              <el-icon color="#f0f0f0" class="icon"><Files /></el-icon>
              <el-text
                tag="b"
                style="font-size: 14px; color: #f0f0f0; line-height: 18px"
                >{{ menu.text }}</el-text
              >
            </li>
            <li class="item" v-for="item in menu.items" :key="item.id">
              <a href="javascript:;" @click="onMenuClick(item)">
                <el-icon color="#f0f0f0" class="icon"><Document /></el-icon>
                <el-text style="font-size: 14px; color: #f0f0f0; line-height: 18px">{{
                  item.text
                }}</el-text>
              </a>
            </li>
          </template>
        </ul>
      </el-aside>
      <el-main class="main-area">
        <el-tabs v-model="activePage" @edit="onTabEdit">
          <el-tab-pane label="概览" name="home" class="pane">
            <Overview />
          </el-tab-pane>
          <el-tab-pane
            v-for="pg in pages"
            :key="pg.name"
            :label="pg.label"
            :name="pg.name"
            closable="true"
            class="pane"
          >
            <component :is="pg.component" :args="pg.args"></component>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import Overview from "../components/Overview.vue";
import About from "../components/About.vue";
import Setting from "../components/Setting.vue";
import TestDemo from "../components/TestDemo.vue";
import Jues from "../plugins/jues";

// 获取全局组件
// const instance = getCurrentInstance();
// const global = instance?.appContext.config.globalProperties;
let jues = Jues.getCurrent();
console.log(jues);

let pageIndex = 0;

const activePage = ref("home");
const pages = ref([]);
const menus = ref([
  {
    id: 1,
    text: "分类01",
    items: [
      { id: 101, text: "测试功能0101", component: TestDemo },
      { id: 102, text: "测试功能0102", component: TestDemo },
    ],
  },
]);

// 退出登录
const onExit = () => {
  jues.Jwt.clear();
  location.reload(true);
};

// 标签编辑
const onTabEdit = (targetName, action) => {
  if (action === "remove") {
    const tabs = pages.value;
    let activeName = activePage.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }
    activePage.value = activeName;
    pages.value = tabs.filter((tab) => tab.name !== targetName);
  }
};

// 创建标签页
const onCreateTab = (name, label, component, args) => {
  const tabs = pages.value;
  if (typeof args === "undefined") args = {};
  tabs.push({ name: name, label: label, component: component, args: args });
  pages.value = tabs;
  activePage.value = name;
};

// 创建或显示标签页
const onCreateOrShowSingleTab = (name, label, component, args) => {
  const tabs = pages.value;
  const tabFound = tabs.filter((tab) => tab.name === name)[0];
  if (typeof tabFound !== "undefined") {
    activePage.value = name;
    return;
  }
  // 创建标签页
  onCreateTab(name, label, component, args);
};

// 显示关于
const onAboutCreateOrShow = () => {
  onCreateOrShowSingleTab("about", "关于", About);
};

// 显示关于
const onSettingCreateOrShow = () => {
  onCreateOrShowSingleTab("setting", "设置", Setting);
};

// 显示关于
const onMenuClick = (menu) => {
  pageIndex++;
  onCreateTab("page_" + pageIndex, menu.text, menu.component, { text: menu.text });
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
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.main-area .pane {
  padding: 0px 5px;
}
</style>
