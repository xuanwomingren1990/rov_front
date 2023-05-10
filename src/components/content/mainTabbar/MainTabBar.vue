<template>
  <tab-bar>
    <tab-bar-item activeColor="#7cf8e0">
      <div slot="item-text" class="tab-bar-item">三维可视化</div>
    </tab-bar-item>
    <tab-bar-item  activeColor="#7cf8e0">
      <div slot="item-text" class="tab-bar-item">智能监控平台</div>
    </tab-bar-item>
    <tab-bar-item  activeColor="#7cf8e0"> 
      <div slot="item-text" class="tab-bar-item">智慧分析平台</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>