<template>
    <div class="nav-bar">
        <img src="~assets/bigscreen/icon28.png" alt="" srcset="" style="margin-right: 10px;width=31px">
        <span class="title-text">海底管线信息融合和大数据平台</span>
        <img src="~assets/bigscreen/icon29.png" alt="" srcset="" style="position: absolute;right:20px;width:92px;">
        <div class="top-decorate"></div>
    </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style>
.nav-bar {
    /* flex布局 */
    display: flex;
    /* 定位相关 */
    position: fixed;
    top: 0px;
    height: 64px;
    width: 100%;
}

.nav-bar img {
    height: 22px;
    margin-top: 22px;
}

.title-text {
    font-size: 32px;
    font-weight: bold;
    line-height: 64px;
    color: #7cf8e0;
}

.top-decorate {
    position: absolute;
    bottom: -5px;
    width: 100%;
    height: 10px;
    background-image: url("assets/bigscreen/decorate1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>