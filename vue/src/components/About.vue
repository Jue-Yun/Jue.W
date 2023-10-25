<template>
  <div class="about">
    <div class="area">
      <h1>UI界面</h1>
      <ul>
        <li>名称: 决云管理界面</li>
        <li>版本: 1.0.0</li>
        <li>架构: Jues.W/Vue 3.0</li>
      </ul>
      <h1>API服务</h1>
      <ul>
        <li>名称: 决云接口服务</li>
        <li>版本: 1.0.0</li>
        <li>架构: Jues.S/.Net 6</li>
      </ul>
      <h1>技术支持</h1>
      <ul>
        <li>温岭联谊网络科技有限公司</li>
        <li>微信: X715042</li>
        <li>QQ: 2208899966</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: ;
  overflow-x: hidden;
  overflow-y: auto;
  background: #f0f0f0;
}
.about .area {
  width: 100%;
  padding: 30px 50px;
  text-align: left;
}
.about h1 {
  margin: 0px;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #c0c0c0;
}
.about ul {
  padding: 0px 0px 20px;
  margin: 0px;
  width: 100%;
}
.about li {
  list-style: none;
  margin: 0px;
  padding: 20px 20px 0px;
}
</style>
