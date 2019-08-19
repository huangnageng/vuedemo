<template>
  <div class="loading_box">
    <img src="@/common/images/loadinggif.gif">
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.loading_box {
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>

