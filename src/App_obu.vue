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
            <section class="data-contain-center" style="height:60%;">
                <section class="data-contain-left">
                    <section class="left-item item-line left-one" style="height:100%;">
                        <div class="item-title" style="margin-bottom: 7px;">
                            <span class="line"></span>
                            设备运维概览
                        </div>
                        <el-card class="card" style="width:90%;margin-left:4%;background-color: transparent;">
                            <div class="card-header">
                                <span style="color:white;font-size:20px;font-weight: bold;">今日在线设备 </span>
                                <span style="color:rgb(103, 194, 58);font-size:15px;font-weight: bold;"> {{
                        onlinePercent
                    }}%</span>
                                <div class="sub-title">On-line equipment</div>
                            </div>

                            <el-progress :percentage="onlinePercent" :show-text="false" status="success"
                                class="progress" />

                            <el-row :gutter="20" class="device-list">
                                <el-col :span="12">
                                    <div class="device-item">
                                        <span style="color:#bebebe;">摄像头</span>
                                        <span class="number">2</span>
                                    </div>
                                    <div class="device-item">
                                        <span style="color:#bebebe;">毫米波雷达</span>
                                        <span class="number">2</span>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="device-item">
                                        <span style="color:#bebebe;">激光雷达</span>
                                        <span class="number">0</span>
                                    </div>
                                    <div class="device-item">
                                        <span style="color:#bebebe;">RSU</span>
                                        <span class="number">0</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>

                        <!-- 故障设备卡片 -->
                        <el-card class="card" style="width:90%;margin-left:4%;background-color: transparent;">
                            <div class="card-header">
                                <span style="color:white;font-size:20px;font-weight: bold;">今日故障设备 </span>
                                <span style="color:rgb(252,167,162);font-size:15px;font-weight: bold;"> {{ faultPercent
                                    }}%</span>
                                <div class="sub-title">Faulty equipment</div>
                            </div>

                            <el-progress :percentage="faultPercent" :show-text="false" status="exception"
                                class="progress" />

                            <div class="status-container">
                                <div class="status-item">
                                    <div class="status-title">未处理</div>
                                    <div class="status-count">0</div>
                                </div>
                                <div class="status-item">
                                    <div class="status-title">处理中</div>
                                    <div class="status-count">0</div>
                                </div>
                                <div class="status-item">
                                    <div class="status-title">已完成</div>
                                    <div class="status-count">0</div>
                                </div>
                            </div>
                        </el-card>
                    </section>
                </section>
                <section class="data-contain-inner">
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
                            路侧设备
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
                <section class="data-contain-right">
                    <section class="right-item item-line right-one" style="height:100%;">
                        <div class="item-title" style="margin-bottom:10px;">
                            <SmallIco />
                            路侧设备
                        </div>
                        <el-card class="transparent-card right-panel"
                            style="width:90%;margin-left:4%;background-color: transparent;">
                            <h3 class="section-title">路侧点1 <span class="percentage">[39.85%]</span></h3>

                            <!-- 设备信息块 -->
                            <div class="device-block" v-for="device in devices" :key="device.id">
                                <div class="device-header">
                                    <div class="device-type">{{ device.type }}</div>
                                    <div class="device-id">{{ device.id }} %</div>
                                </div>

                                <el-table :data="device.specs" :show-header="false" class="table-text">
                                    <el-table-column prop="key" width="100" style="color:black;" />
                                    <el-table-column prop="value" style="color:black;" />
                                </el-table>
                            </div>
                        </el-card>
                    </section>
                </section>
            </section>
            <section class="data-footer" style="height:40%;display: flex; align-items: stretch;">
                <div class="health-calendar" style="width:40%;height:70%;">
                    <div class="health-title">设备健康度月历</div>
                    <div class="week-labels">
                        <div v-for="(day, index) in weekDays" :key="index" class="week-day">{{ day }}</div>
                    </div>
                    <div class="health-grid">
                        <div v-for="(day, index) in calendarDays" :key="index" class="calendar-day" :class="{
                        'other-month': !day.isCurrentMonth,
                        'healthy': day.isCurrentMonth && day.healthy,
                        'unhealthy': day.isCurrentMonth && !day.healthy
                    }" :title="dayTitle(day)">
                            {{ day.date }}
                        </div>
                    </div>
                </div>
                <el-divider direction="vertical" style="height:80%;margin-top:10px;opacity: 0.5;"></el-divider>
                <div style="width:15%;height:80%;text-align: center;margin-top: 10px;">
                    <div class="health-titles">2025年3月</div>
                    <el-progress type="dashboard" :percentage="80" style="margin-top:40px;">
                        <template #default="{ percentage }">
                            <span class="percentage-value">{{ percentage }}%</span>
                            <span class="percentage-label">健康度</span>
                        </template>
                    </el-progress>
                </div>
                <el-divider direction="vertical" style="height:80%;margin-top:10px;opacity: 0.5;"></el-divider>
                <div style="width:45%;height:80%;text-align: center;margin-top: 10px;">
                    <el-card class="transparent-card stats-container" style="height:100%;width:90%;margin-left: 5%;">
                        <div class="section-titles">TYPES</div>
                        <div class="stats-item" v-for="(item, index) in roadStats" :key="index">
                            <span class="label">{{ item.label }}</span>
                            <span class="value">{{ item.value }}</span>
                        </div>
                    </el-card>
                </div>
            </section>
        </section>
    </section>
</template>
<script>
import LkChart from "./components/common/lk-chart.vue";
import autoLoad from '@/libs/util.autoLoad'
import ChartCard from "./compnenets/chart-card.vue";
import DataScrollCard from "./compnenets/data-scroll-card.vue";
import RevenueScrollCard from "./compnenets/revenue-scroll-card.vue";
import SmallIco from "./compnenets/small-ico.vue";
import CountTo from 'vue-count-to'
import {
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
            btnFlag: 3,
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
            weekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            calendarDays: [],
            currentMonth: 3,// 3月,
            percentage: 80,
            onlinePercent: 80,
            faultPercent: 0,
            devices: [
                {
                    id: 'DW2-XJ-001-002',
                    type: '路侧摄像头',
                    specs: [
                        { key: '像素', value: '1200W' },
                        { key: '检测范围', value: '120m' }
                    ]
                },
                {
                    id: 'DW2-HM8-001-001',
                    type: '路侧毫米波雷达',
                    specs: [
                        { key: '使光线数', value: '77GHz' },
                        { key: '检测范围', value: '120m' }
                    ]
                },
            ],
            roadStats: [
                { label: '路面状况', value: 24.4 },
                { label: '道路施工', value: 10 },
                { label: '活动', value: 9.6 },
                { label: '其他', value: 47 }
            ],

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
            // 中间地图数据
            let mapData = [

                // ...
            ]

            this.IncreaseInComplaintsOption.series[0].data = IncreaseInComplaintsData
            this.IncreaseInComplaintsOption.series[1].data = IncreaseInComplaintsData1
            this.IncreaseInComplaintsOption.xAxis.data = IncreaseInComplaintsData.map(e => e.orgName)
            this.TradingPeakOption.series[0].data = TradingPeakData
            this.TradingPeakOption.xAxis.data = TradingPeakData.map(e => e.time)
            this.ComplaintRiskOption.series[0].data = ComplaintRiskData
            this.ComplaintRiskOption.xAxis.data = ComplaintRiskData.map(e => e.address)
            this.ComplaintNumberOption.series[0].data = ComplaintNumberData
            this.ComplaintNumberOption.xAxis[0].data = ComplaintNumberData.map(e => e.name)
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
        },

        // 生成日历数据
        generateCalendar() {
            const year = 2025;
            const month = 2; // 0-based (0=January)

            // 获取当月第一天和最后一天
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            // 计算开始补全天数（周一开始）
            const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

            // 生成日期数组
            const days = [];

            // 补全上月日期
            for (let i = startDay; i > 0; i--) {
                const date = new Date(year, month, -i + 1);
                days.push({
                    date: date.getDate(),
                    isCurrentMonth: false,
                    healthy: false
                });
            }

            // 生成当月日期（模拟健康状态）
            for (let d = 1; d <= lastDay.getDate(); d++) {
                days.push({
                    date: d,
                    isCurrentMonth: true,
                    healthy: Math.random() > 0.2 // 80%健康
                });
            }

            // 补全下月日期
            const totalDays = days.length;
            const remaining = totalDays % 7;
            if (remaining > 0) {
                for (let i = 1; i <= (7 - remaining); i++) {
                    days.push({
                        date: i,
                        isCurrentMonth: false,
                        healthy: false
                    });
                }
            }

            this.calendarDays = days;
        },

        // 日期提示信息
        dayTitle(day) {
            if (!day.isCurrentMonth) return '';
            return `${this.currentMonth}月${day.date}日 ${day.healthy ? '健康' : '异常'}`;
        }
    },
    async created() {
        await this.initData()
        await autoLoad('https://webapi.amap.com/maps?v=1.4.13&key=956fa8426889423864f4840af45f1b25')
        await autoLoad('https://webapi.amap.com/loca?v=1.2.0&key=5fbfab5b6f6d13a9bff742af384c7615')
        await autoLoad('https://webapi.amap.com/ui/1.0/main.js?v=1.0.11')
        this.initMap()
        this.generateCalendar();
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

<style lang="scss" scoped>
body {
    overflow: hidden !important;
}

.stats-container {
    width: 500px;
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    backdrop-filter: blur(5px);
}

.stats-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.section-titles {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    border-left: 3px solid #67c23a;
    padding-left: 8px;
    margin-bottom: 10px;
    width: 10%;
}

.stats-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
}

.value {
    color: #67c23a;
    font-weight: bold;
    font-size: 16px;
}

.event-item {
    color: rgba(255, 255, 255, 0.8);
    padding: 10px 12px;
    margin-bottom: 12px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 14px;
}

.section-title {
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 12px 0;
    font-size: 16px;
}

.percentage {
    color: #67c23a;
    font-size: 0.8em;
}

.device-category {
    padding: 8px 0;
}

.device-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.8);
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.device-block {
    margin: 20px 0;
    padding: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.device-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    color: rgba(255, 255, 255, 0.8);
}

.table-text {
    background: transparent;
    --el-table-bg-color: transparent;
    --el-table-text-color: black;
}

.card {
    margin-bottom: 20px;
}

.card-header {
    margin-bottom: 20px;
}

.card-header h2 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.sub-title {
    font-size: 14px;
    color: #939393;
}

.progress {
    margin: 15px 0;
}

.device-list {
    margin-top: 20px;
}

.device-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.device-item .number {
    font-weight: bold;
    color: rgb(103, 194, 58);
}

.status-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.status-item {
    text-align: center;
}

.status-title {
    color: #bebebe;
    font-size: 14px;
}

.status-count {
    font-size: 18px;
    font-weight: bold;
    color: rgb(252, 167, 162);
    margin-top: 8px;
}

.percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 28px;
    font-weight: bold;
    color: rgb(24, 155, 255);
}

.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
    color: gray;
    font-weight: bold;
}

.health-titles {
    color: #00d8ff;
    font-size: 1.2rem;
    margin-bottom: 5px;
    text-align: center;
    text-shadow: 0 0 10px;
    // margin-top: 3px;
}

.health-calendar {
    padding: 10px;
    border-radius: 8px;
    margin: 10px;

    .health-title {
        color: #00d8ff;
        font-size: 1.2rem;
        margin-bottom: 5px;
        text-align: center;
        text-shadow: 0 0 10px;
        margin-top: -10px;
    }


    .week-labels {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
        margin-bottom: 5px;

        .week-day {
            text-align: center;
            color: #67c23a;
            font-size: 0.9rem;
            padding: 5px 0;
        }
    }

    .health-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;

        .calendar-day {
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            font-size: 0.9rem;
            transition: all 0.3s;
            cursor: pointer;
            background: #606266;

            &.other-month {
                background: #303133;
                color: #909399;
            }

            &.healthy {
                background: #67c23a;
                box-shadow: 0 0 8px rgba(103, 194, 58, 0.5);
                color: #fff;
            }

            &.unhealthy {
                background: #f56c6c;
                box-shadow: 0 0 8px rgba(245, 108, 108, 0.5);
                color: #fff;
            }

            &:hover {
                transform: scale(1.1);
                z-index: 1;
            }
        }
    }
}

.newStaticMarker {
    width: 2px;
    height: 2px;
    border-radius: 100%;
    background-imAge: radial-gradient(#fffaa9, rgb(190, 166, 255));
}

.newMarkerClass {
    width: 10px;
    height: 10px;
    position: relative;
    outline: none;
    //background-imAge: radial-gradient(yellow, rgb(253, 3, 9));
    background-color: #e3ad0b;

    border-radius: 100%;
    transform-origin: 0 0;
    display: block;
    opacity: 0.7;
}

.newMarkerClass::after {
    content: "";
    -webkit-border-radius: 100%;
    border-radius: 100%;
    height: 400%;
    width: 400%;
    position: absolute;
    margin: -150% 0 0 -150%;
    box-shadow: inset 0 0 10px 8px #ffd237;
    animation: pulsate 1s ease-out;
    animation-iteration-count: infinite;
    /*无穷反复*/
    animation-delay: 1.1s;
}

@keyframes pulsate {
    0% {
        transform: scale(0.1, 0.1);
        opacity: 0;
        filter: alpha(opacity=0);
    }

    50% {
        opacity: 1;
        filter: none;
    }

    100% {
        transform: scale(1.2, 1.2);
        opacity: 0;
        filter: alpha(opacity=0);
    }
}

.amap-info-content {
    background-color: rgba(#132a72, .8);
    color: #EEEEEE;
    border-radius: 8px;
    //box-shadow: 0 0 50px #0af0f3 inset;
    transition: all .3s linear;
}

.amap-info-sharp {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #112763 !important;
}

.map-info-box {
    .map-info-title {
        font-weight: bold;
        font-size: 1rem;
        margin-bottom: 10px;
    }
}

.map-info-body {
    height: 130px;
    width: 400px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;


    .risk-left {
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: .8rem;

        .risk-avatar {
            width: 5rem;
            height: 5rem;
            border-radius: 100%;
            margin: 0 auto;
            display: inline-block;
            border: 2px solid #ade1e2;
            padding: 5px;
            object-fit: cover;
            position: relative;
            box-sizing: border-box;
        }


        .risk-driver {
            margin-top: 10px;

            .driver-p {
                line-height: 1.2rem;
                font-weight: bold;

                .driver-title {
                    display: inline-block;
                    width: 60px;
                    text-align: right;
                }

                .driver-name {
                    display: inline-block;
                    text-align: left;
                }
            }

        }
    }

    .risk-right {
        width: 65%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: .8rem;

        .info-body {
            width: 100%;
            height: 100%;
            position: relative;
            padding-top: 5px;

            &:before {
                content: '';
                width: 1px;
                height: 60%;
                background-color: #a19f9f;
                position: absolute;
                top: 10px;
                left: 12px;

            }

            .info-item {
                line-height: 1.5rem;
                display: flex;
                justify-content: flex-start;
                //align-items: center;

                .info-item-title {
                    display: inline-block;
                    width: 8.4rem;
                    text-align: right;
                }

                .info-item-content {
                    width: calc(100% - 8.4rem);
                    overflow: hidden;
                    display: inline-block;
                }
            }

            .info-fact {
                font-size: 1.3rem;
                color: #c35647;
                font-weight: bold;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                text-shadow: 0 0 40px #e5e5e5;
            }
        }
    }
}


.right-four,
.left-four {
    position: relative;

    .select-date {
        position: absolute;
        right: 0;
        top: 2px;
        width: 130px;
        overflow: hidden;

        .el-date-editor input {
            width: 130px !important;
            background-color: #132a72;
            color: #EEEEEE;
        }
    }
}
</style>
<style lang="scss" scoped>
@import "dataCenter_full";
</style>
