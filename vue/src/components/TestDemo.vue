<template>
  <div class="page">
    <div class="area">
      <h1>测试Demo界面</h1>
      <ul>
        <li>Hello World, {{ args.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps } from "vue";
const props = defineProps({
  args: {
    text: String,
  },
});
const { args } = toRefs(props);
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: ;
  overflow-x: hidden;
  overflow-y: auto;
  background: #f0f0f0;
}
.page .area {
  width: 100%;
  padding: 30px 50px;
  text-align: left;
}
.page h1 {
  margin: 0px;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #c0c0c0;
}
.page ul {
  padding: 0px 0px 20px;
  margin: 0px;
  width: 100%;
}
.page li {
  list-style: none;
  margin: 0px;
  padding: 20px 20px 0px;
}
</style>
