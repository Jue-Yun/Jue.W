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
  <component v-if="isLoaded" :is="componentCurrent"></component>
  <!-- <Main v-if="isLogin" />
  <Login v-else /> -->
  <!-- <MessageBox /> -->
</template>

<script setup>
// import Login from "./pages/Login.vue";
// import Main from "./pages/Main.vue";
//import MessageBox from "./pages/MessageBox.vue";
import { ref, shallowRef, defineAsyncComponent, nextTick } from "vue";
import { ElLoading } from "element-plus";
import Jues from "./plugins/jues";
//import HelloWorld from "./components/HelloWorld.vue";
// 获取全局对象
let global = Jues.getGlobal();
let jues = global.$jues;
//console.log(global);
// 异步加载的组件
const componentLogin = defineAsyncComponent(() => import("./pages/Login.vue"));
const componentMain = defineAsyncComponent(() => import("./pages/Main.vue"));
const componentCurrent = shallowRef({});
const isLoaded = ref(false);

// 更新令牌
let updateToken = async function (jues) {
  if (!jues.Jwt.isExpire() && jues.Jwt.isNeedUpdate()) {
    let result = await jues.put("/app/base/Jwt/UpdateToken");
    if (result.success) {
      let data = result.data;
      let expiresTime = new Date(data.expires);
      let updateTime = new Date(data.update);
      jues.Jwt.update(data.token, expiresTime, updateTime);
      location.reload(true);
    }
  }
};

let serviceOption = {
  fullscreen: true,
  background: "rgba(0,0,0,0.2)",
};
// 注册Api加载事件
jues.onLoad((opt) => {
  let loadingInstance = ElLoading.service(serviceOption);
});
// 注册Api失败事件
jues.onFail((result) => {
  let loadingInstance = ElLoading.service(serviceOption);
  nextTick(() => {
    // 以服务的方式调用的 Loading 需要异步关闭
    loadingInstance.close();
  });
  global.$notify({
    message: result.message,
    type: "warning",
    showClose: true,
  });
});
// 注册Api异常事件
jues.onError((resp) => {
  let loadingInstance = ElLoading.service(serviceOption);
  nextTick(() => {
    // 以服务的方式调用的 Loading 需要异步关闭
    loadingInstance.close();
  });
  global.$notify({
    message: "Status " + resp.status,
    type: "error",
    showClose: true,
  });
});
// 注册Api成功事件
jues.onSuccess((resp) => {
  let loadingInstance = ElLoading.service(serviceOption);
  nextTick(() => {
    // 以服务的方式调用的 Loading 需要异步关闭
    loadingInstance.close();
  });
  updateToken(jues);
});
// 获取Jwt信息
jues.get(
  "/app/base/Jwt/GetJwtData",
  jues.createApiOption((opt) => {
    opt.IsSuppressEvent = true;
    opt.onSuccess = function (resp) {
      //console.log("onSuccess");
      updateToken(jues);
    };
  })
).then((data) => {
  //console.log(data);
  // 更新登录状态
  if (data.success) {
    componentCurrent.value = componentMain;
  } else {
    componentCurrent.value = componentLogin;
  }
  isLoaded.value = true;
});
</script>

<style scoped></style>
