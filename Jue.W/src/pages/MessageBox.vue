<template>
  <div class="message">
    <div class="area">
      <div class="background"></div>
      <div class="box">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  data() {
    return { message: "MessageBox" };
  },
  mounted() {
    let that = this;
    let jues = that.$jues;
    jues.onMessage((opt) => {
      that.message = opt.meaasge;
    });
  },
};
</script>

<style scoped>
.message {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  left: 0px;
  top: 0px;
}

.message .area {
  width: 100%;
  height: 100%;
  position: relative;
}

.message .background {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.8;
}

.message .box {
  width: 480px;
  min-height: 100px;
  background: #f0f0f0;
  border-radius: 4px;
  box-shadow: 0px 0px #000 5px;
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 200px;
  margin-left: -240px;
}</style>
