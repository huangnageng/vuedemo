<template>
  <div class="tip_box">
    <p>{{tipText}}</p>
    <!-- <p>12121</p> -->
  </div>
</template>
<script>
export default {
  computed: {
    tipText () {
      return this.$store.state.tip.text;
    }
  }
}
</script>
<style lang="less" scoped>
.tip_box {
  width: 100%;
  height: 100%;
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
    color: #fff;
  }
}
</style>

