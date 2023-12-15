<template>
  <el-container class="main-container">
    <el-aside class="main-aside">
      <div class="box">
        <div class="logo"><img src="logo_60.png" alt="" /></div>
        <ul>
          <li class="head">
            <el-icon color="#f0f0f0" class="head-icon">
              <Menu />
            </el-icon>
            <el-text tag="b" style="font-size: 16px; color: #f0f0f0; line-height: 24px">功能列表</el-text>
          </li>
          <template v-for="menu in menus" :key="menu.id">
            <li>
              <el-icon color="#f0f0f0" class="icon">
                <Files />
              </el-icon>
              <el-text tag="b" style="font-size: 14px; color: #f0f0f0; line-height: 18px">{{ menu.text }}</el-text>
            </li>
            <template v-for="item in menu.items" :key="item.id">
              <li class="item-select" v-if="activePage === 'page_' + item.id">
                <el-icon color="#ffffff" class="icon">
                  <Document />
                </el-icon>
                <el-text style="font-size: 14px; color: #ffffff; line-height: 18px">{{ item.text }}</el-text>
              </li>
              <li class="item" v-else>
                <a href="javascript:;" @click="onMenuClick(item)">
                  <el-icon color="#c0c0c0" class="icon">
                    <Document />
                  </el-icon>
                  <el-text style="font-size: 14px; color: #c0c0c0; line-height: 18px">{{ item.text }}</el-text>
                </a>
              </li>
            </template>
          </template>
        </ul>
      </div>
    </el-aside>
    <el-container class="main-container">
      <el-header class="main-header">
        <div class="box">
          <div class="info">
            <el-icon color="#ffffff" class="icon">
              <User />
            </el-icon>
            <span>管理员({{ userName }})</span>
          </div>
          <el-button icon="SwitchButton" class="button" circle type="danger" @click="onExit"></el-button>
          <el-button icon="Warning" class="button" circle type="info" @click="onAboutCreateOrShow"></el-button>
          <el-button icon="Setting" class="button" circle type="info" @click="onSettingCreateOrShow"></el-button>
        </div>
      </el-header>
      <el-main class="main-area">
        <el-tabs v-model="activePage" @edit="onTabEdit">
          <el-tab-pane label="概览" name="home" class="pane">
            <Overview />
          </el-tab-pane>
          <el-tab-pane v-for="pg in pages" :key="pg.name" :label="pg.label" :name="pg.name" closable class="pane">
            <component :is="pg.component" :args="pg.args"></component>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// 系统组件
import { ref, getCurrentInstance, shallowRef, defineAsyncComponent } from "vue";
import Jues from "../plugins/jues";
import Apis from "../plugins/apis";
// 页面组件
import Overview from "../components/Overview.vue";
import About from "../components/About.vue";
import Setting from "../components/Setting.vue";

// 获取全局组件
let jues = Jues.getCurrent();
const apis = Apis.getCurrent();

// 页签索引
let pageIndex = 0;

// 当前用户
const userName = ref("");
// 当前页面
const activePage = ref("home");
// 所有页面
const pages = shallowRef([]);
// 所有菜单
const menus = shallowRef([]);
// 获取菜单索引
const getMenuIndex = (id) => {
  for (let i = 0; i < menus.value.length; i++) {
    for (let j = 0; j < menus.value[i].items.length; j++) {
      if (menus.value[i].items[j].id === id) return { catalog: i, item: j };
    }
  }
  return { catalog: -1, item: -1 };
}
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
          } else {
            activeName = "home";
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
  // 单页面
  onCreateOrShowSingleTab("page_" + menu.id, menu.text, menu.component, menu.args);
};

// 获取用户名
const getJwtData = async () => {
  let result = await jues.get("/app/base/Jwt/GetJwtData");
  if (result.success) {
    let data = result.data;
    userName.value = data.name;
  }
};

// 获取jwt信息
getJwtData().then(async () => {
  /* 界面初始化 */
});

</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #e0e0e0;
}

/* 顶栏 */
.main-header {
  width: 100%;
  height: 50px;
  padding: 2px 2px 2px 0px !important;
}

.main-header .box {
  width: 100%;
  height: 100%;
  padding: 9px 14px 0px;
  background: #3a3a3a;
  border-radius: 6px;
  overflow: hidden;
}

.main-header .button {
  float: right;
  height: 28px;
  width: 28px;
  margin-left: 14px;
}

.main-header .info {
  float: left;
  height: 28px;
  margin-right: 14px;
  color: #ebebeb;
  line-height: 28px;
}

.main-header .info .icon {
  height: 28px;
  width: 28px;
  border-radius: 14px;
  background: #696969;
  vertical-align: top;
}

.main-header .info span {
  display: inline-block;
  height: 28px;
  vertical-align: top;
  line-height: 28px;
  margin-left: 6px;
}

/* 侧栏 */
.main-aside {
  width: 200px;
  padding: 2px;
}

.main-aside .box {
  width: 100%;
  height: 100%;
  background: #3a3a3a;
  padding: 0px 10px;
  border-radius: 6px;
  overflow: hidden;
}

.main-aside .logo {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #333;
}

.main-aside .logo img {
  margin-top: 10px;
  height: 40px;
}

.main-aside ul {
  padding: 0px;
  margin: 5px 0px 0px;
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
}

.main-aside li {
  padding: 12px 10px;
  margin: 0px 0px 5px;
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

.main-aside .item-select {
  background: #282828;
  padding: 6px 10px 6px 24px !important;
  border-radius: 6px;
}

.main-aside .item a {
  display: block;
  text-decoration: none;
  padding: 6px 10px 6px 24px;
  border-radius: 6px;
}

.main-aside .item a:hover {
  background: #484848;
}

/* 主体 */
.main-area {
  padding: 0px;
  width: 100%;
  height: calc(100% - 50px);
  overflow: hidden;
  padding: 2px 2px 2px 0px !important;
  border-radius: 6px;
}

.main-area .pane {
  padding: 0px 5px;
}
</style>
