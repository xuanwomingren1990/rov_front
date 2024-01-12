<template>
  <div>
    <div tabindex="-1" class="components_container_head">
      <div class="content-container">
        <div class="component-content">
          <div class="sm-component-container"></div>
        </div>
        <div class="grid-layout">
          <div tabindex="-1" class="grid-item">
            <div class="component-content">
              <div class="sm-component-text">
                <span>ROV状态</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="data-grid">
      <el-row>
        <el-col :span="12">
          <div class="data-grid-item">
            <span class="sm-component-indicator__title">俯仰角度</span>
            <span class="sm-component-indicator__num">
              {{ pitch }}
              <span class="sm-component-indicator__unit">rad</span>
            </span>
          </div>
          <div><br /></div>
          <div class="data-grid-item">
            <span class="sm-component-indicator__title">偏航角度</span>
            <span class="sm-component-indicator__num">
              {{ yaw }}
              <span class="sm-component-indicator__unit">rad</span>
            </span>
          </div>
          <div><br /></div>
        </el-col>
        <el-col :span="12">
          <div class="data-grid-item">
            <span class="sm-component-indicator__title">横滚角度</span>
            <span class="sm-component-indicator__num">
              {{ roll }}
              <span class="sm-component-indicator__unit">rad</span>
            </span>
          </div>
          <div><br /></div>

          <div class="data-grid-item">
            <span class="sm-component-indicator__title">下潜时长</span>
            <span class="sm-component-indicator__num">
              {{ divingDuration }}
              <span class="sm-component-indicator__unit"></span>
            </span>
          </div>
          <div><br /></div>
        </el-col>
      </el-row>
    </div>

    <div tabindex="-1" class="components_container_mid">
      <div class="content-container">
        <div class="component-content">
          <div class="sm-component-container"></div>
        </div>
        <div class="grid-layout">
          <div tabindex="-1" class="grid-item">
            <div class="component-content">
              <div class="sm-component-text">
                <span>当前视角</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <object
      type="application/x-vlc-plugin"
      id="vlc"
      events="false"
      class="x-vlc-plugiin"
    >
      <param name="mrl" value="rtmp://39.103.207.107/live/wrj1001" />
      <param name="volume" value="50" />
      <param name="autoplay" value="true" />
      <param name="loop" value="false" />
      <param name="fullscreen" value="false" />
      <param name="controls" value="false" />
    </object>
  </div>
</template>
<script>
export default {
  name: "RovData2",
  props: {
    pitch: Number,
    roll: Number,
    yaw: Number,
    divingDuration: String,
  },
  data() {
    return {};
  },
};
</script>
<style>
.x-vlc-plugiin {
  width: 420px;
  height: 315px;
  position: absolute;
  top: 350px;
  right: 40px;
}
.components_container_head {
  z-index: 6;
  top: 5%;
  width: 90%;
  left: 5%;
  right: 5%;
  height: 30px;
  position: absolute;
}
.components_container_mid {
  z-index: 6;
  top: 35%;
  width: 90%;
  left: 5%;
  right: 5%;
  height: 30px;
  position: absolute;
}
.component-content {
  width: 100%;
  height: 100%;
}
.sm-component-container {
  background-color: rgba(0, 0, 0, 0);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(assets/bigscreen/标题背景2.png);
  position: absolute;
  width: 100%;
  height: 100%;
}
.grid-layout {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  margin: 0 0;
}
.grid-item {
  z-index: 0;
  /* transform: translate3d(5px, 1px, 0px); */
  width: 100%;
  height: 22px;
  position: absolute;
}
.sm-component-text {
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: bolder;
  justify-content: center;
  text-align: center;
  text-indent: 0px;
  font-family: 微软雅黑;
  color: rgb(255, 255, 255);
  position: absolute;
  width: 100%;
  height: 100%;
}
.data-grid {
  top: 10%;
  position: absolute;
  width: 500px;
}
.data-grid-item {
  width: 100%;
}
.sm-component-indicator__title {
  display: inline-block;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bolder;
  color: rgba(255, 255, 255, 0.65);
  width: 100%;
}
.sm-component-indicator__num {
  display: inline-block;
  font-size: 2rem;
  color: rgb(124, 248, 224);
  font-weight: bolder;
  text-align: center;
  width: 100%;
}
.sm-component-indicator__unit {
  font-size: 1rem;
  font-weight: bolder;
  color: rgba(255, 255, 255, 0.65);
}
</style>
