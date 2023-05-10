<template>
    <div class="tab-bar">
      <!-- 用于填充TabBarItem的插槽 -->
      <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'TabBar'
}
</script>

<style>
.tab-bar {
  /* flex布局 */
  display: flex;
  /* 定位相关 */
  position: fixed;
  top:15px;
  right: 200px;
  z-index: 10000;  
}
</style>