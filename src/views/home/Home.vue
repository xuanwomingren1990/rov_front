<template>
  <div class="home-container">
    <!-- 右上角菜单栏 -->
    <tab-bar>
      <tab-bar-item
        :class="[activeTab == index ? 'active' : 'disactive']"
        v-for="(item, index) in tab"
        :key="index"
        @click.native="tabClick(index)"
      >
        <div slot="item-text" class="tab-bar-item">{{ tab[index] }}</div>
      </tab-bar-item>
    </tab-bar>
    <!-- 地图容器 -->

    <div id="viewDiv"></div>
    <div id="mapDiv"></div>

    <!-- 左侧面板 -->
    <div class="home-left">
      <!-- 智能监控---数据 1-->
      <rov-data1
        :remainingBattery="remainingBattery"
        :cabinTemperature="cabinTemperature"
        :waterTemperature="waterTemperature"
        :divingDepth="divingDepth"
        :longitude="longitude"
        :latitude="latitude"
        :servo_raw="servo_raw"
      />
    </div>
    <!-- 右侧面板 -->
    <div class="home-right">
      <!-- 智能监控---数据 2-->
      <rov-data2
        :pitch="pitch"
        :roll="roll"
        :yaw="yaw"
        :divingDuration="divingDuration"
      />

      <!-- <div class="toolbar">
        <div class="toolbar-item" id="createPoint">
          <span class="iconfont">&#xf0117;</span>
          <span>标记点</span>
        </div>
        <div class="toolbar-item" id="measureDistance">
          <span class="iconfont">&#xe66e;</span>
          <span>距离测量</span>
        </div>
        <div class="toolbar-item" id="measureArea">
          <span class="iconfont">&#xe830;</span>
          <span>面积测量</span>
        </div>
        <div class="toolbar-item" id="measureClean">
          <span class="iconfont">&#xec26;</span>
          <span> 清除测量</span>
        </div>
        <div class="toolbar-item" id="roamimg">
          <span class="iconfont">&#xe615;</span>
          <span>三维漫游</span>
        </div>
        <div class="toolbar-item" id="createLine">
          <span class="iconfont">&#xe71b;</span>
          <span>路线规划</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
import esriConfig from "@arcgis/core/config";
import SceneView from "@arcgis/core/views/SceneView.js";
import WebScene from "@arcgis/core/WebScene.js";
import Compass from "@arcgis/core/widgets/Compass.js";
import NavigationToggle from "@arcgis/core/widgets/NavigationToggle.js";
import Zoom from "@arcgis/core/widgets/Zoom.js";
import Measurement from "@arcgis/core/widgets/Measurement.js";
import RovData1 from "components/content/rovdataform/RovData1";
import RovData2 from "components/content/rovdataform/RovData2";
import MapView from "@arcgis/core/views/MapView.js";
import Graphic from "@arcgis/core/Graphic.js";
import Map from "@arcgis/core/Map.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import TWEEN from "@tweenjs/tween.js";
import Camera from "@arcgis/core/Camera.js";
import Viewpoint from "@arcgis/core/Viewpoint.js";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    TabBar,
    TabBarItem,
    RovData1,
    RovData2,
  },
  data() {
    return {
      tab: ["三维可视化", "智能监控平台", "智慧分析平台"],
      activeTab: 0,
      remainingBattery: 0,
      cabinTemperature: 0,
      waterTemperature: 0,
      divingDepth: 0,
      longitude: 0,
      latitude: 0,
      servo_raw: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
      pitch: 0,
      roll: 0,
      yaw: 0,
      divingDuration: "00:00:00",
    };
  },
  created() {},
  mounted() {
    this.initMap();
  },
  methods: {
    // 选项高亮
    tabClick(index) {
      this.activeTab = index;
    },
    // 初始化场景
    initMap() {
      // 注意：引用portalItem前需要配置portalUrl
      esriConfig.portalUrl = "https://www.zszjdxs.com/portal/";

      const scene = new WebScene({
        portalItem: {
          id: "3558c329d2254947b520a6f2b1250e07",
        },
      });
      const view = new SceneView({
        container: "viewDiv",
        map: scene,
        qualityProfile: "high",
        environment: {
          background: {
            type: "color",
            color: [255, 252, 244, 0],
          },
          starsEnabled: false,
          atmosphereEnabled: false,
          lighting: {
            type: "virtual",
          },
        },
      });
      const map = new Map({
        basemap: "topo-vector",
      });
      const mapView = new MapView({
        map: map,
        center: [113.9345, 21.7448], // Longitude, latitude
        zoom: 6, // Zoom level
        container: "mapDiv", // Div element
      });

      //定位点闪烁
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      const point = {
        //Create a point
        type: "point",
        longitude: 113.9345,
        latitude: 21.7448,
      };
      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [255, 0, 0], // Orange
        outline: {
          color: [255, 255, 255], // White
          width: 1,
        },
      };
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol,
      });
      graphicsLayer.add(pointGraphic);
      const options = { opacity: 1 };
      const tween = new TWEEN.Tween(options)
        .to({ opacity: 0 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out) // 变化函数
        .repeat(Infinity) // 无限循环
        .yoyo(true) // 动画在循环时反转方向
        .onUpdate(function () {
          graphicsLayer.opacity = options.opacity;
        });
      tween.start();
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);

      this.initViewUI(view);
      this.initMapUI(mapView);
      // this.initMeasure(view)

      //转换初始视角
      setTimeout(function () {
        var cam = new Camera({
          position: [113.93596889182497, 21.744066915511336, 585.5770204169676],
          heading: 300, // facing due south
          tilt: 60, // bird's eye view
        });
        var viewpoint = new Viewpoint({
          camera: cam,
        });
        view.goTo(viewpoint);
      }, 3000);

      // const layerList = new LayerList({
      //             view: view
      //           });
      //           view.ui.add(layerList, "bottom-right");
    },

    //初始化小地图ui
    initMapUI(mapView) {
      // Remove the default widgets
      mapView.ui.components = [];
    },

    // 初始化地图ui
    initViewUI(view) {
      // 去掉地图右下方的esri标签
      view.ui.remove("attribution");
      //   移除左上默认缩放平移等小部件
      view.ui.empty("top-left");
      view.ui.padding = { top: 150, left: 0, right: 20, bottom: 0 };
      //指南针
      const compass = new Compass({
        view: view,
      });

      //旋转或移动
      const navigationtoggle = new NavigationToggle({
        view: view,
      });
      const zoom = new Zoom({
        view: view,
      });
      view.ui.add([
        {
          component: compass,
          position: "top-right",
          index: 0,
        },
        {
          component: navigationtoggle,
          position: "top-right",
          index: 1,
        },
        {
          component: zoom,
          position: "top-right",
          index: 2,
        },
      ]);
    },
    // 初始化测量工具
    initMeasure(view) {
      const measurement = new Measurement({
        view: view,
        areaUnit: "square-meters",
        linearUnit: "meters",
      });
      // Set-up event handlers for buttons and click events
      const distanceButton = document.getElementById("measureDistance");
      const areaButton = document.getElementById("measureArea");
      const cleanButton = document.getElementById("measureClean");
      distanceButton.addEventListener("click", () => {
        console.log("Current unit: ", measurement.linearUnit);
        distanceMeasurement();
      });
      areaButton.addEventListener("click", () => {
        console.log("Current unit: ", measurement.areaUnit);
        areaMeasurement();
      });
      cleanButton.addEventListener("click", () => {
        clearMeasurements();
      });
      // Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
      function distanceMeasurement() {
        measurement.activeTool = "direct-line";
        distanceButton.classList.add("active");
        areaButton.classList.remove("active");
      }
      // Call the appropriate AreaMeasurement2D or AreaMeasurement3D
      function areaMeasurement() {
        measurement.activeTool = "area";
        distanceButton.classList.remove("active");
        areaButton.classList.add("active");
      }
      // Clears all measurements
      function clearMeasurements() {
        distanceButton.classList.remove("active");
        areaButton.classList.remove("active");
        measurement.clear();
      }
    },
  },
};
</script>

<style>
.active {
  color: #7cf8e0;
}

.disactive {
  color: #fff;
}

.show {
  display: block;
}
.no-show {
  display: none;
}
.home-container {
  height: 100%;
  width: 100%;
}

#viewDiv {
  position: fixed;
  margin-top: 80px;
  height: calc(100% - 80px - 20px);
  width: 100%;
  z-index: 0;
}
#mapDiv {
  position: fixed;
  bottom: 25px;
  right: 515px;
  height: 200px;
  width: 300px;
  z-index: 10;
}

.home-left {
  position: fixed;
  width: 500px;
  height: calc(100% - 80px - 20px);
  top: 80px;
  left: 0;
  /* background-color: rgba(0, 0, 0, 0.62); */
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: 1;
}

.home-right {
  position: fixed;
  width: 500px;
  height: calc(100% - 80px - 20px);
  top: 80px;
  right: 0;
  /* background-color: rgba(0, 0, 0, 0.62); */
  background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}

/* 去掉地图边框 */
.esri-view-surface--inset-outline:focus::after {
  outline: none !important;
}

.toolbar {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 140px;
  height: 280px;
  top: 50%;
  right: 0;
}

.toolbar-item {
  flex: 1;
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 2px;
  padding-top: 15px;
  border: 1px solid var(--color-high-text);
}

.toolbar-item span:nth-child(1) {
  color: var(--color-high-text);
  margin-right: 10px;
}

.toolbar-item span:nth-child(2) {
  color: #fff;
}
#overviewDiv {
  position: fixed;
  bottom: 25px;
  right: 10px;
  width: 300px;
  height: 200px;
  border: 1px solid black;
  /* z-index: 1; */
  overflow: hidden;
}
</style>