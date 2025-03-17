<template>
    <section id="data-center" ref="maxRef">
        <div class="map-container">
            <div id="map-container" ref="mapContainer"></div>
        </div>
        <section class="data-contain">
            <section class="data-header">
                <div class="header-date">
                    <div class="date-time">{{ nowDate.time }}</div>
                    <ul class="date-right">
                        <li class="date-d">{{ nowDate.day }}</li>
                        <li class="date-w">{{ nowDate.week }}</li>
                    </ul>
                </div>
                <div class="header-content">
                    车载入侵监测系统
                </div>
                <div class="header-btn-list">
                    <div class="header-btn" @click="toggleFullscreen">{{ isFullscreen ? '退出大屏' : '打开大屏' }}</div>
                    <div class="header-btn" @click="refreshData">刷新</div>
                    <div class="header-btn" @click="closeDataCenter">关闭</div>
                </div>
            </section>
            <section class="data-contain-center">
                <section class="data-contain-inner" style="margin-left:30%;width: 40%;">
                    <section class="inner-btn-list">
                        <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 1 }"
                            @click="innerBtnSelect(1)">
                            全局总览
                        </div>
                        <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 2 }"
                            @click="innerBtnSelect(2)">
                            报文全察
                        </div>
                        <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 3 }"
                            @click="innerBtnSelect(3)">
                            路测设备
                        </div>
                        <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 4 }"
                            @click="innerBtnSelect(4)">
                            车辆监控
                        </div>
                        <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 5 }"
                            @click="innerBtnSelect(5)">
                            事件预警
                        </div>
                    </section>
                </section>
            </section>
            <section class="data-footer" style="height:40%;display: flex; align-items: stretch;">
                <div style="height:100%;width:10%;margin-left:1%;margin-top:0.2%;">
                    <div class="header-btn">小巴车</div>
                    <div class="header-btn">清洁车</div>
                    <div class="header-btn">售卖车</div>
                    <div class="header-btn">物流车</div>
                </div>
                <div style="height:100%;width:90%;display: flex;">
                    <el-card class="vehicle-card"
                        style="background-color: transparent;height:48%;margin-top:0.3%;margin-right:2%;">
                        <div class="header">
                            <h1 class="title">无人小巴车</h1>
                            <el-tag class="license-tag" type="info" size="large">京AYZXB001</el-tag>
                        </div>
                        <div class="statss-container" style="width:100%;">
                            <div class="stat-item">
                                <el-icon :size="24" class="stats-container">
                                    <Odometer />
                                </el-icon>
                                <div class="stat-content">
                                    <span>437 km</span>
                                    <span class="stat-label">总行驶里程</span>
                                </div>
                            </div>

                            <div class="stat-item">
                                <el-icon :size="24" class="stats-container">
                                    <Clock />
                                </el-icon>
                                <div class="stat-content">
                                    <span>989 h</span>
                                    <span class="stat-label">累计运行时长</span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="vehicle-card"
                        style="background-color: transparent;height:48%;margin-top:0.3%;margin-right:2%;">
                        <div class="header">
                            <h1 class="title">无人小巴车</h1>
                            <el-tag class="license-tag" type="info" size="large">京AYZMN004</el-tag>
                        </div>
                        <div class="statss-container" style="width:100%;">
                            <div class="stat-item">
                                <el-icon :size="24" class="stats-container">
                                    <Odometer />
                                </el-icon>
                                <div class="stat-content">
                                    <span>718 km</span>
                                    <span class="stat-label">总行驶里程</span>
                                </div>
                            </div>

                            <div class="stat-item">
                                <el-icon :size="24" class="stats-container">
                                    <Clock />
                                </el-icon>
                                <div class="stat-content">
                                    <span>48 h</span>
                                    <span class="stat-label">累计运行时长</span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="vehicle-card"
                        style="background-color: transparent;height:48%;margin-top:0.3%;margin-right:2%;">
                        <div class="header">
                            <h1 class="title">售卖车</h1>
                            <el-tag class="license-tag" type="info" size="large">京AYZMN005</el-tag>
                        </div>
                        <div class="statss-container" style="width:100%;">
                            <div class="stat-item">
                                <el-icon :size="24" class="stats-container">
                                    <Odometer />
                                </el-icon>
                                <div class="stat-content">
                                    <span>799 km</span>
                                    <span class="stat-label">总行驶里程</span>
                                </div>
                            </div>

                            <div class="stat-item">
                                <el-icon :size="24" class="stats-container">
                                    <Clock />
                                </el-icon>
                                <div class="stat-content">
                                    <span>80 h</span>
                                    <span class="stat-label">累计运行时长</span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <el-card class="vehicle-card"
                        style="background-color: transparent;height:48%;margin-top:0.3%;margin-right:1%;">
                        <div class="header">
                            <h1 class="title">清洁车</h1>
                            <el-tag class="license-tag" type="info" size="large">京AYZ0S001</el-tag>
                        </div>
                        <div class="statss-container" style="width:100%;">
                            <div class="stat-item">
                                <el-icon :size="24" class="stats-container">
                                    <Odometer />
                                </el-icon>
                                <div class="stat-content">
                                    <span>972 km</span>
                                    <span class="stat-label">总行驶里程</span>
                                </div>
                            </div>

                            <div class="stat-item">
                                <el-icon :size="24" class="stats-container">
                                    <Clock />
                                </el-icon>
                                <div class="stat-content">
                                    <span>79 h</span>
                                    <span class="stat-label">累计运行时长</span>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </section>
        </section>
    </section>
</template>
<script>
import { Odometer, Clock } from '@element-plus/icons-vue';
import LkChart from "./components/common/lk-chart.vue";
import ECharts from 'echarts';
import autoLoad from '@/libs/util.autoLoad';
import ChartCard from "./compnenets/chart-card.vue";
import DataScrollCard from "./compnenets/data-scroll-card.vue";
import RevenueScrollCard from "./compnenets/revenue-scroll-card.vue";
import SmallIco from "./compnenets/small-ico.vue";
import CountTo from 'vue-count-to'
import {
    PeakCycleRatioOption,
    TradingPeakOption,
    ComplaintRiskOption,
    RecentComplaintsHotWordsOption,
    IncreaseInComplaintsOption,
    ComplaintNumberOption,
    TimeOption,
    SpeedOption,
} from "./utils/config";

export default {
    name: "index",
    components: { SmallIco, CountTo, RevenueScrollCard, DataScrollCard, ChartCard, LkChart },
    data() {
        const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
        return {
            isFullscreen: true,
            // 各类图表数据
            PeakCycleRatioOption,
            SpeedOption,
            TimeOption,
            TradingPeakOption,
            RecentComplaintsHotWordsOption,
            ComplaintRiskOption,
            IncreaseInComplaintsOption,
            ComplaintNumberOption,

            //计时器
            timer: null,

            // 左上角时间
            nowDate: {
                time: new Date().toLocaleTimeString(),
                day: new Date().toLocaleDateString(),
                week: '星期' + daysOfWeek[new Date().getDay()]
            },
            // 数据查询参数
            tradQuery: {
                date: '',
            },
            complaintQuery: {
                date: '',
            },
            // 地图相关
            btnFlag: 4,
            centerMap: null,
            dynamicList: [
                {
                    b0: 116.350153,//116.343550,//121.489261,//经度
                    b1: 40.009571,//39.982784,//31.238939,//纬度
                    avatar: 'https://twm.autohome.com.cn/cjh.autoimg.cn/chejiahaodfs/g25/M03/C0/10/960x0_q100_autohomecar__ChtliGPbLGOAHIg_AAC_7-HpimM974.jpg?text/TGlua-i9pueUn-a0uw==/fontSize/12',
                    name: "XPENG P7",
                    ip: "192.168.137.1",
                    address: "北京市海淀区",
                    browser: "CarHacking",
                    status: 1,
                }
            ],//动态的
            staticList: [],
            staticMarkers: [],
            dynamicMarkers: [],
            initOptions: { renderer: 'canvas' },

        }
    },
    methods: {
        toggleFullscreen() {
            const maxRef = this.$refs.maxRef
            this.isFullscreen = !this.isFullscreen;
            let ele = maxRef
            if (this.isFullscreen) {
                // 进入全屏
                if (ele.requestFullscreen) {
                    ele.requestFullscreen();
                } else if (ele.mozRequestFullScreen) {
                    ele.mozRequestFullScreen();
                } else if (ele.webkitRequestFullscreen) {
                    ele.webkitRequestFullscreen();
                } else if (ele.msRequestFullscreen) {
                    ele.msRequestFullscreen();
                }


            } else {
                // 退出全屏
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        },


        // 生成随机数据
        generateRandomInteger(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        // 模拟刷新数据
        refreshData() {

        },
        // 监听窗口大小变化
        handleWindowResize() {
            // 处理窗口大小变化的逻辑
            // 例如，更新组件的数据或执行其他操作
            // 可以通过访问 this 来引用组件实例中的属性和方法

        },
        // 中间按钮事件
        innerBtnSelect(flag) {
            this.btnFlag = flag;
            if (flag === 1) { this.$router.push({ path: '/full' }); }
            else if (flag === 2) { this.$router.push({ path: '/table' }); }
            else if (flag === 3) { this.$router.push({ path: '/obu' }); }
            else if (flag === 4) { this.$router.push({ path: '/detect' }); }
            else if (flag === 5) { this.$router.push({ path: '/warn' }); }


        },
        // 初始化当前时间
        initNowDate() {
            // setInterval(() => {
            //   const { time, day, week } = Util.formatCurrentTime()
            //   this.nowDate.time = time
            //   this.nowDate.day = day
            //   this.nowDate.week = week
            // }, 1000)
        },
        // 点击标记点
        clickMarker(visitor) {
            // console.log("我点击了", car)
            // 信息窗体的内容
            // 创建 infoWindow 实例
            let infoWindow = new AMap.InfoWindow({
                content: `
         <section class="map-info-box">
         <div class="map-info-title">实时车辆信息</div>
         <div  class="map-info-body">
            <div class="risk-left">
                <img class="risk-avatar" src="${visitor.avatar || 'https://pic.5tu.cn/uploads/allimg/1601/251545562670.jpg'}">
                <div class="risk-driver">
                  <div class="driver-p">
                    <span class="driver-title">车型：</span>
                    <span class="driver-name" style="color: #fdd239">${visitor.name || 'XPENG P7'}</span>
                  </div>
                  
                </div>
              </div>
              <div class="risk-right">
                <div class="info-body">
                  <div class="info-item">
                    <span class="info-item-title">车载时间：</span>
                    <span class="info-item-content">${this.nowDate.day} ${this.nowDate.time}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-item-title">IP：</span>
                    <span class="info-item-content">${visitor.ip || '未知'}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-item-title">车辆所在地：</span>
                     <span class="info-item-content" style="color: #c35647;font-weight: bold;font-size: 1.1rem">
                     ${visitor.address || '未知'}</span>
                  </div>
                  <!--<div class="info-fact">
                     <span class="ripple-container"></span>
                  </div>-->
                </div>
              </div>
</div>

            </section>
        `,
                offset: new AMap.Pixel(0, -40) // 设置信息窗口的偏移量，使其在标记点上方显示
            });

            // 打开信息窗体
            infoWindow.open(this.centerMap, new AMap.LngLat(visitor.b0, visitor.b1));
        },
        // 处理静态标记点
        drawStaticPoint() {
            let markers = [];
            if (this.staticMarkers.length > 2000) {
                let removeMarkers = this.staticMarkers.slice(0, 1000);
                this.staticMarkers = this.staticMarkers.slice(1000, this.staticMarkers.length - 1);
                this.centerMap.remove(removeMarkers);
                this.staticMarkers = [];
            }
            for (const car of this.staticList) {
                if (car.b0 && car.b1) {
                    let marker = new AMap.Marker({
                        position: [car.b0, car.b1],
                        content: '<div class="newStaticMarker"></div>'
                    });
                    this.centerMap.add(marker);
                    markers.push(marker);
                    this.staticMarkers.push(marker);
                }
            }
            this.centerMap.add(markers);
        },
        // 处理动态标记点
        drawDynamicPoint(data) {
            let that = this
            if (data) {
                for (const car of data) {
                    if (car.b0 && car.b1) {
                        let marker = new AMap.Marker({
                            position: [car.b0, car.b1],
                            content: '<div class="newMarkerClass"></div>'
                        });
                        // 添加点击事件
                        marker.on('click', function () {
                            that.clickMarker(car)
                        });
                        this.centerMap.add(marker);
                        this.dynamicMarkers.concat(marker);
                    }
                }
            } else {
                this.dynamicMarkers = [];
                for (const car of this.dynamicList) {
                    if (car.b0 && car.b1) {
                        let marker = new AMap.Marker({
                            position: [car.b0, car.b1],
                            content: '<div class="newMarkerClass"></div>'
                        });
                        // 添加点击事件
                        marker.on('click', function () {
                            that.clickMarker(car)
                        });
                        this.centerMap.add(marker);
                        this.dynamicMarkers.push(marker);
                    }
                }
            }

        },
        // 初始化数据

        initData() {
            let that = this
            that.timer = setInterval(() => {
                that.refreshData()
            }, 5000)

            /* this.request('api_admin_screen_getOnlineCar', {orgId: "O1-1"}).then((res) => {
               this.dynamicList = res.dynamicList;
               this.staticList = res.staticList;
               if (this.centerMap) {
                 this.drawStaticPoint();
                 this.drawDynamicPoint();
               }
               that.timer = setInterval(() => {
                 that.refreshData()
               }, 5000)
             }).catch((error) => {
      
             });*/
        },
        // 初始化地图
        initMap() {
            let centerLng = 116.350153;//116.343550;//121.489261;
            let centerLat = 40.009571;//39.982784; //31.238939;
            const AMap = window.AMap
            this.centerMap = new AMap.Map(this.$refs.mapContainer, {
                resizeEnable: true,
                zoom: 15,
                center: new AMap.LngLat(centerLng, centerLat),
                mapStyle: "amap://styles/darkblue",
            });
            if (this.centerMap) {
                this.drawStaticPoint()
                this.drawDynamicPoint()
            }
        },
        closeDataCenter() {
            this.cancelFullScreen()
            this.$router.push({ path: '/' })
        },
        //关闭全屏
        cancelFullScreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        },
        //清除定时器
        clearTimer() {
            clearInterval(this.timer);
        }
    },
    async created() {
        this.initNowDate()
        await this.initData()
        await autoLoad('https://webapi.amap.com/maps?v=1.4.13&key=956fa8426889423864f4840af45f1b25')
        await autoLoad('https://webapi.amap.com/loca?v=1.2.0&key=5fbfab5b6f6d13a9bff742af384c7615')
        await autoLoad('https://webapi.amap.com/ui/1.0/main.js?v=1.0.11')
        this.initMap()
    },
    mounted() {
        window.addEventListener('resize', this.handleWindowResize);
        this.toggleFullscreen()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleWindowResize);
        this.clearTimer()
    },
}
</script>

<style lang="scss">
.vehicle-card {
    width: 23%;
    height: 50%;
    border-radius: 12px;
    background-color: transparent;
}

.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
}

.title {
    color: #67c23a;
    font-weight: bold;
    font-size: 24px;
    margin: -10px 0 8px 0;
}

.subtitle {
    color: #909399;
    font-size: 16px;
    margin: 0 0 12px 0;
    font-weight: 400;
}

.license-tag {
    font-size: 16px;
    padding: 8px 16px;
    margin: -5px 0 8px 0;
}

.statss-container {
    display: flex;
    margin-top: -5%;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    background: #f5f7fa;
    border-radius: 8px;
    width: 50%;
    margin-right: 4%;
}

.stat-icon {
    margin-right: 16px;
}

.stat-content {
    flex: 1;
}

:deep(.el-checkbox) {
    height: auto;
}

:deep(.el-checkbox__label) {
    font-size: 18px;
    color: #303133;
    font-weight: 500;
}

.stat-label {
    display: block;
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
}

.header-btn {
    height: 5%;
    margin-top: 5%;
    color: #fff;
    text-align: center;
    font-size: .8rem;
    cursor: pointer;
    margin-right: 1rem;
    padding: 8px 15px;
    border-radius: 4px;
    transition: all .3s linear;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    line-height: 100%;

    &:hover {
        transition: all .3s linear;
        box-shadow: 0 0 20px #8091cb inset;

    }
}
</style>
<style lang="scss" scoped>
@import "dataCenter_full";
</style>
