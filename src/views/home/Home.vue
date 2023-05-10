<template>
    <div class="home-container">
        <!-- 右上角菜单栏 -->
        <tab-bar>
            <tab-bar-item :class="[activeTab == index ? 'active' : 'disactive']" v-for="(item, index) in tab" :key="index"
                @click.native="tabClick(index)">
                <div slot="item-text" class="tab-bar-item">{{ tab[index] }}</div>
            </tab-bar-item>
        </tab-bar>
        <!-- 地图容器 -->
        <div id="viewDiv"></div>
        <!-- 左侧面板 -->
        <div class="home-left">
        </div>
        <!-- 右侧面板 -->
        <!-- <div class="home-right" disabled>
            <div class="toolbar">
                <div class="toolbar-item" id="createPoint">
                    <span class="iconfont">&#xf0117;</span>
                    <span>标记点</span>
                </div>
                <div class="toolbar-item" id="measureDistance">
                    <span class="iconfont ">&#xe66e;</span>
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
            </div>
        </div> -->
        <!-- 智能监控---仪表盘 -->
        <div class="home-right">
        <my-panel></my-panel>
        </div>

    </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
import esriConfig from "@arcgis/core/config";
import SceneView from "@arcgis/core/views/SceneView.js";
import WebScene from "@arcgis/core/WebScene.js";
import Compass from "@arcgis/core/widgets/Compass.js";
import NavigationToggle from "@arcgis/core/widgets/NavigationToggle.js";
import Zoom from "@arcgis/core/widgets/Zoom.js";
import Measurement from "@arcgis/core/widgets/Measurement.js";
// import * as echarts from 'echarts';
import MyPanel from 'components/content/panel/MyPanel';
// import LayerList from "@arcgis/core/widgets/LayerList.js";
export default {
    name: 'Home',
    components: {
        TabBar,
        TabBarItem,
        MyPanel,
    },
    props: {
    },
    data() {
        return {
            tab: ["三维可视化", "智能监控平台", "智慧分析平台"],
            activeTab: 0,
        }
    },
    created() {

    },
    mounted() {
        this.initMap();
    },
    methods: {
        // 选项高亮
        tabClick(index) {
            this.activeTab = index
        },
        // 初始化场景
        initMap() {
            // 注意：引用portalItem前需要配置portalUrl
            esriConfig.portalUrl = "https://www.zszjdxs.com/portal/";

            const scene = new WebScene({
                portalItem: {
                    id: "3558c329d2254947b520a6f2b1250e07"
                }
            });

            const view = new SceneView({
                container: "viewDiv",
                map: scene,
                qualityProfile: "high",
                environment: {
                    background: {
                        type: "color",
                        color: [255, 252, 244, 0]
                    },
                    starsEnabled: false,
                    atmosphereEnabled: false,
                    lighting: {
                        type: "virtual"
                    }
                },
            });
            this.initUI(view);
            this.initMeasure(view);

            // const layerList = new LayerList({
            //             view: view
            //           });
            //           view.ui.add(layerList, "bottom-right");
        },
        // 初始化地图ui
        initUI(view) {
            // 去掉地图右下方的esri标签
            view.ui.remove('attribution');
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
            })
            view.ui.add([
                {
                    component: compass,
                    position: "top-right",
                    index: 0
                }, {
                    component: navigationtoggle,
                    position: "top-right",
                    index: 1
                },
                {
                    component: zoom,
                    position: "top-right",
                    index: 2
                },
            ]);
        },
        // 初始化测量工具
        initMeasure(view) {
            const measurement = new Measurement(
                {
                    view: view,
                    areaUnit: "square-meters",
                    linearUnit: "meters"
                }
            );
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
            })
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
        }
    }
}
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
    display:none;
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

.home-left {
    position: fixed;
    width: 350px;
    height: calc(100% - 80px - 20px);
    top: 80px;
    left: 0;
    /* background-color: rgba(0, 0, 0, 0.62); */
    background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    z-index: 1;
}

.home-right {
    position: fixed;
    width: 350px;
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
}</style>