<template>
  <div class="tab-bar-item">
    <div>
      <slot name="item-text"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TarBarItem',
  data() {
    return {
      isActive: false
    }
  },
  computed: {
  },
  props: {
  },
  methods: {

  }
}
</script>

<style>
/* .active {
  color: red;
} */
.tab-bar-item {
  /* flex:1表示水平布局 */
  flex: 1;
  text-align: center;
  height: 40px;
  width: 120px;
  line-height: 40px;
  font-size: 16px;
  margin-right: 30px;
  background-image: url("assets/bigscreen/标题背景6.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  /* 清除图片底部的3个像素 */
  vertical-align: middle;
}
</style>