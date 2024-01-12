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
            <span class="sm-component-indicator__title">剩余电量</span>
            <span class="sm-component-indicator__num">
              {{ remainingBattery }}
              <span class="sm-component-indicator__unit">V</span>
            </span>
          </div>
          <div><br /></div>
          <div class="data-grid-item">
            <span class="sm-component-indicator__title">舱内温度</span>
            <span class="sm-component-indicator__num">
              {{ cabinTemperature }}
              <span class="sm-component-indicator__unit">℃</span>
            </span>
          </div>
          <div><br /></div>
          <div class="data-grid-item">
            <span class="sm-component-indicator__title">经度</span>
            <span class="sm-component-indicator__num">
              {{ longitude }}
              <span class="sm-component-indicator__unit"></span>
            </span>
          </div>
          <div><br /></div>
        </el-col>
        <el-col :span="12">
          <div class="data-grid-item">
            <span class="sm-component-indicator__title">下潜深度</span>
            <span class="sm-component-indicator__num">
              {{ divingDepth }}
              <span class="sm-component-indicator__unit">m</span>
            </span>
          </div>
          <div><br /></div>
          <div class="data-grid-item">
            <span class="sm-component-indicator__title">水体温度</span>
            <span class="sm-component-indicator__num">
              {{ waterTemperature }}
              <span class="sm-component-indicator__unit">℃</span>
            </span>
          </div>
          <div><br /></div>
          <div class="data-grid-item">
            <span class="sm-component-indicator__title">纬度</span>
            <span class="sm-component-indicator__num">
              {{ latitude }}
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
                <span>预定控制量</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-table
      :data="tableData"
      style="width: 72%; margin: 0 14%"
      :header-cell-style="{
        background: 'rgba(65, 242, 206, 0.7)',
        color: '#ffffff',
        textAlign: 'center',
      }"
      :cell-style="{
        background: 'rgba(124,248,224,0.39)',
        color: 'rgba(155, 155, 155, 0.95)',
        textAlign: 'center',
      }"
    >
      <el-table-column prop="machinery_a" label="电机" width="90">
      </el-table-column>
      <el-table-column prop="servo_raw_a" label="脉宽" width="90">
      </el-table-column>
      <el-table-column prop="machinery_b" label="电机" width="90">
      </el-table-column>
      <el-table-column prop="servo_raw_b" label="脉宽" width="90">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "RovData1",
  props: {
    remainingBattery: Number,
    cabinTemperature: Number,
    waterTemperature: Number,
    divingDepth: Number,
    longitude: Number,
    latitude: Number,
    servo_raw: Array,
  },
  data() {
    return {};
  },
  computed: {
    tableData: function () {
      var newTableData = [];
      for (var i = 1; i < 5; i++) {
        newTableData[i - 1] = {
          machinery_a: "电机" + i,
          servo_raw_a: this.servo_raw[i - 1] + "us",
          machinery_b: "电机" + (i + 4),
          servo_raw_b: this.servo_raw[i + 3] + "us",
        };
      }
      return newTableData;
    },
  },
};
</script>
<style>
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
  /* top: 10%; */
  /* position: absolute; */
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
.el-table {
  position: absolute;
  top: 350px;
}
.el-table .warning-row {
  background: rgb(186, 158, 105);
}

.el-table .success-row {
  background: #3d6e22;
}
</style>
