<template>
  <div class="overview"><img src="world.svg" alt="" /></div>
  <!-- <div style="color: #0094ff">决云·致力于更高效的管理</div> -->
</template>

<script>
export default {
  name: "OverviewPage",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.overview {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: #f0f0f0;
}

.overview img {
  margin-top: 5%;
  height: 60%;
}
</style>
