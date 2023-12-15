<template>
  <div class="setting">
    <div class="area">
      <h1>修改密码</h1>
      <ul>
        <li>
          <el-input v-model="userName" type="text" class="input" disabled>
            <template #prepend>用户名</template>
          </el-input>
        </li>
        <li>
          <el-input v-model="oldPassword" type="text" class="input" :clearable="true" :show-password="true">
            <template #prepend>原密码</template>
          </el-input>
        </li>
        <li>
          <el-input v-model="newPassword" type="text" class="input" :clearable="true" :show-password="true">
            <template #prepend>新密码</template>
          </el-input>
        </li>
        <li>
          <el-input v-model="newPasswordRepeat" type="text" class="input" :clearable="true" :show-password="true">
            <template #prepend>重复密码</template>
          </el-input>
        </li>
        <li>
          <el-button type="success" icon="Check" @click="changePassword">确认修改</el-button>
        </li>
      </ul>
    </div>
  </div>
  <!-- <div style="color: #0094ff">决云·致力于更高效的管理</div> -->
</template>

<script setup>
import { ref } from "vue";
import Jues from "../plugins/jues";
import md5 from "js-md5";

// 获取全局变量
const global = Jues.getGlobal();
const jues = global.$jues;

// 定义变量
const userName = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const newPasswordRepeat = ref("");

let isChangePasswordWorking = false;

// 修改密码核心业务
const changePasswordCore = async () => {
  // 新密码不允许为空
  if (newPassword.value === "") {
    global.$notify({
      message: "新密码不允许为空",
      type: "error",
      showClose: true,
    });
    return;
  }
  // 两次输入的密码必须一致
  if (newPassword.value !== newPasswordRepeat.value) {
    global.$notify({
      message: "两次输入的新密码不一致",
      type: "error",
      showClose: true,
    });
    return;
  }
  // 提交保存
  let result = await jues.post("/app/base/UserInfo/ChangePassword", {
    oldPassword: md5("user=" + userName.value + ";pwd=" + oldPassword.value + ";"),
    newPassword: md5("user=" + userName.value + ";pwd=" + newPassword.value + ";"),
  });
  if (result.success) {
    oldPassword.value = "";
    newPassword.value = "";
    newPasswordRepeat.value = "";
    global.$notify({
      message: "修改成功",
      type: "success",
      showClose: true,
    });
  }
};

// 修改密码 - 带重复提交过滤
const changePassword = async () => {
  if (isChangePasswordWorking) return;
  isChangePasswordWorking = true;
  await changePasswordCore();
  isChangePasswordWorking = false;
};

// 获取用户名
const getJwtData = async () => {
  let result = await jues.get("/app/base/Jwt/GetJwtData");
  if (result.success) {
    let data = result.data;
    userName.value = data.Name;
  }
};
getJwtData();
</script>

<style scoped>
.setting {
  width: 100%;
  height: 100%;
  margin: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #f0f0f0;
}

.setting .area {
  width: 100%;
  padding: 30px 50px;
  text-align: left;
}

.setting h1 {
  margin: 0px;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #c0c0c0;
}

.setting ul {
  padding: 0px 0px 0px;
  margin: 0px;
  width: 100%;
}

.setting li {
  list-style: none;
  margin: 0px;
  padding: 20px 20px 0px;
}

.setting .input {
  width: 320px;
  font-size: 14px;
}

.setting img {
  margin-top: 5%;
  height: 60%;
}
</style>
