<template>
    <div id="app">
        <nav-bar />
        <!-- <main-tab-bar /> -->
        <home/>
        <bottom-bar/>
    </div>
</template>

<script>
// import MainTabBar from "components/content/mainTabbar/MainTabBar"
import NavBar from "components/common/navbar/NavBar"
import BottomBar from "./components/common/bottombar/BottomBar";
import Home from "./views/home/Home"
export default {
    name: 'App',
    components: {
        NavBar,
        // MainTabBar,
        BottomBar,
        Home
    }
}
</script>

<style>
@import "assets/css/base.css";
@import "assets/fonts/iconfont.css";
html,
body {
    width: 100%;
    height: 100%;
    background-color: black
}
/* 去除页面滚动条 */
body::-webkit-scrollbar {
    display: none;
}
#app {
    width: 100%;
    height: 100%;
}</style>
