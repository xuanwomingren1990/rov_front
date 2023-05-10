<template>
    <div class="bottom-container">
       
        <div class="bottom-decorate"></div>
    </div>
</template>

<script>
export default {
    name: 'BottomBar'
}
</script>

<style>
.bottom-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.bottom-decorate {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 20px;
    background-image: url("assets/bigscreen/decorate2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}</style>