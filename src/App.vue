<template>
  <!-- <div>
    <router-view></router-view>
  </div> -->
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
          车路云态势感知入侵检测系统
        </div>
        <div class="header-btn-list">
          <div class="header-btn" @click="toggleFullscreen">{{ isFullscreen ? '退出大屏' : '打开大屏' }}</div>
          <div class="header-btn" @click="refreshData">刷新</div>
          <div class="header-btn" @click="closeDataCenter">关闭</div>
        </div>
      </section>
      <section class="data-contain-center">
        <section class="data-contain-left">
          <section class="left-item item-line left-one">
            <div class="item-title">
              <span class="line"></span>
              流量峰值环比分析
            </div>
            <LkChart class="left-item-chat" key="PeakCycleRatioOption" :option="PeakCycleRatioOption" />
          </section>
          <section class="left-item left-two">
            <div class="passage-left item-line">
              <div class="item-title"><span class="line"></span>车速</div>
              <LkChart class="age-item-chat" key="SpeedOption" :option="SpeedOption" />
            </div>
            <div class="passage-right">
              <div class="passage-sex item-line">
                <div class="item-title"><span class="line"></span>时间段</div>
                <LkChart class="age-item-chat" key="TimeOption" :option="TimeOption" />
              </div>
              <div class="passage-rate item-line">
                <div class="item-title"><span class="line"></span>今日流量预测</div>
                <div class="rate-text">
                  <span class="status"></span>
                  <span>正常</span>
                </div>
              </div>
            </div>
          </section>
          <section class="left-item item-line left-three">
            <div class="item-title">
              <SmallIco />
              今日流量分析
            </div>
            <div class="revenue">
              <div class="revenue-list">
                <div class="revenue-list-item">
                  <div class="revenue-name">总流量</div>
                  <div class="revenue-num">96959</div>
                </div>
                <div class="revenue-list-item">
                  <div class="revenue-name">总次数</div>
                  <!-- <div class="revenue-num">￥9695</div>-->
                  <div class="revenue-num">96959</div>
                </div>
                <div class="revenue-list-item">
                  <div class="revenue-name">平均流量</div>
                  <div class="revenue-num">98706</div>
                </div>
                <div class="revenue-list-item">
                  <div class="revenue-name">平均次数</div>
                  <div class="revenue-num">98706</div>
                </div>
              </div>
              <RevenueScrollCard key="revenue-scroll" class="revenue-scroll" />
            </div>
          </section>
          <section class="left-item item-line left-four">
            <div class="item-title">
              <span class="line"></span>
              流量峰值统计
              <div class="select-date">

              </div>
            </div>
            <LkChart class="left-item-chat" key="TradingPeakOption" :option="TradingPeakOption" />
          </section>
        </section>
        <section class="data-contain-inner">
          <section class="inner-btn-list">
            <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 1 }" @click="innerBtnSelect(1)">
              全局总览
            </div>
            <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 2 }" @click="innerBtnSelect(2)">
              报文全察
            </div>
            <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 3 }" @click="innerBtnSelect(3)">
              路测设备
            </div>
            <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 4 }" @click="innerBtnSelect(4)">
              车辆监控
            </div>
            <div class="inner-btn " :class="{ 'inner-btn-active': btnFlag === 5 }" @click="innerBtnSelect(5)">
              事件预警
            </div>
          </section>
        </section>
        <section class="data-contain-right">
          <section class="right-item item-line right-one">
            <div class="item-title">
              <SmallIco />
              当前监测车辆
            </div>
            <section class="risk-body">
              <div class="risk-left">
                <img class="risk-avatar"
                  src="https://twm.autohome.com.cn/cjh.autoimg.cn/chejiahaodfs/g25/M03/C0/10/960x0_q100_autohomecar__ChtliGPbLGOAHIg_AAC_7-HpimM974.jpg?text/TGlua-i9pueUn-a0uw==/fontSize/12">
                <div class="risk-driver">
                  <div class="driver-p">
                    <span class="driver-title">车型：</span>
                    <span class="driver-name" style="color: #fdd239">XPENG P7</span>
                  </div>
                  <!-- <div class="driver-p">
                    <span class="driver-title">平台：</span>
                    <span class="driver-name" style="color: #fdd239">CarHacking</span>
                  </div> -->
                </div>
              </div>
              <div class="risk-right">
                <div class="info-body">
                  <!-- <div class="info-item">
                    <span class="info-item-title">车载时间：</span>
                    <span class="info-item-content">{{ nowDate.day }} {{ nowDate.time }}</span>
                  </div> -->
                  <div class="info-item">
                    <span class="info-item-title">车载时间：</span>
                    <span class="info-item-content">{{ nowDate.day }} {{ nowDate.time }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-item-title">IP：</span>
                    <span class="info-item-content">192.168.137.1</span>
                  </div>
                  <div class="info-item">
                    <span class="info-item-title">车辆所在地：</span>
                    <span class=" info-item-content"
                      style="color: #c35647;font-weight: bold;font-size: 1.1rem">北京市海淀区</span>
                  </div>
                  <div class="info-item">

                  </div>
                </div>
              </div>
            </section>
          </section>
          <section class="right-item item-line right-two">
            <div class="item-title">
              <span class="line"></span>
              区域流量分析
            </div>
            <LkChart class="right-item-chat" key="ComplaintRiskOption" :option="ComplaintRiskOption" />
          </section>
          <section class=" right-item  right-three ">
            <section class="complain-body">
              <div class="complain-hot item-line ">
                <div class="item-title"><span class="line"></span>常见攻击</div>
                <LkChart class="complain-chart" key="RecentComplaintsHotWordsOption"
                  :option="RecentComplaintsHotWordsOption" />
              </div>
              <div class="item-line complain-up">
                <div class="item-title"><span class="line"></span>流量环比上升</div>
                <LkChart class="complain-chart" key="IncreaseInComplaintsOption" :option="IncreaseInComplaintsOption" />
              </div>
            </section>
          </section>
          <section class="right-item item-line right-four">
            <div class="item-title">
              <span class="line"></span>
              车载流量统计
              <div class="select-date">

              </div>
            </div>
            <LkChart class="right-item-chat" key="ComplaintNumberOption" :option="ComplaintNumberOption" />
          </section>
        </section>
      </section>
      <section class="data-footer">
        <DataScrollCard key="DataScrollCard" />
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
      isFullscreen: false,
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
      btnFlag: 1,
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
      //访客峰值统计
      let TradingPeakData = [
        { value: this.generateRandomInteger(2000, 6000), time: '0时' },
        { value: this.generateRandomInteger(1000, 3000), time: '2时' },
        { value: this.generateRandomInteger(500, 2500), time: '4时' },
        { value: this.generateRandomInteger(4000, 10000), time: '6时' },
        { value: this.generateRandomInteger(8000, 20000), time: '8时' },
        { value: this.generateRandomInteger(7000, 18000), time: '10时' },
        { value: this.generateRandomInteger(6000, 15000), time: '12时' },
        { value: this.generateRandomInteger(6000, 16000), time: '14时' },
        { value: this.generateRandomInteger(6000, 15000), time: '16时' },
        { value: this.generateRandomInteger(9000, 20000), time: '18时' },
        { value: this.generateRandomInteger(6000, 14000), time: '20时' },
        { value: this.generateRandomInteger(4000, 10000), time: '22时' },
        { value: this.generateRandomInteger(2000, 6000), time: '24时' },
      ]
      //流量地区分析(取10个地址)
      let ComplaintRiskData = [
        { value: this.generateRandomInteger(2000, 200000), address: '东城' },
        { value: this.generateRandomInteger(2000, 200000), address: '西城' },
        { value: this.generateRandomInteger(2000, 200000), address: '海淀' },
        { value: this.generateRandomInteger(2000, 200000), address: '朝阳' },
        { value: this.generateRandomInteger(2000, 200000), address: '丰台' },
        { value: this.generateRandomInteger(2000, 200000), address: '昌平' },
        { value: this.generateRandomInteger(2000, 200000), address: '石景山' },
        { value: this.generateRandomInteger(2000, 200000), address: '房山' },
        { value: this.generateRandomInteger(2000, 200000), address: '大兴' },
        { value: this.generateRandomInteger(2000, 200000), address: '顺义' }
      ]
      //车载流量统计(取数量最多的10个司机)
      let ComplaintNumberData = [
        { value: this.generateRandomInteger(2000, 200000), name: '车辆1' },
        { value: this.generateRandomInteger(2000, 200000), name: '车辆2' },
        { value: this.generateRandomInteger(2000, 200000), name: '车辆3' },
        { value: this.generateRandomInteger(2000, 200000), name: '车辆4' },
        { value: this.generateRandomInteger(2000, 200000), name: '车辆5' },
        { value: this.generateRandomInteger(2000, 200000), name: '车辆6' },
        { value: this.generateRandomInteger(2000, 200000), name: '车辆7' },
        { value: this.generateRandomInteger(2000, 200000), name: '车辆8' },
        { value: this.generateRandomInteger(2000, 200000), name: '车辆9' },
        { value: this.generateRandomInteger(2000, 200000), name: '车辆10' }
      ]

      //流量环比上升(取3地区)
      let IncreaseInComplaintsData = [
        { value: this.generateRandomInteger(10, 80), orgName: '海淀' },
        { value: this.generateRandomInteger(10, 80), orgName: '朝阳' },
        { value: this.generateRandomInteger(10, 80), orgName: '昌平' },
      ]
      let IncreaseInComplaintsData1 = [
        { value: this.generateRandomInteger(10, 60), orgName: '东城' },
        { value: this.generateRandomInteger(10, 70), orgName: '西城' },
        { value: this.generateRandomInteger(10, 80), orgName: '顺义' },
      ]

      //车辆峰值环比分析（七天）
      this.PeakCycleRatioOption.series[0].data = [
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
      ]//上周访客
      this.PeakCycleRatioOption.series[1].data = [
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
        this.generateRandomInteger(50000, 200000),
      ] // 上上周访客


      // for (const RecentComplaintsHotWordsDatum of this.RecentComplaintsHotWordsOption.series[0].data) {
      //   RecentComplaintsHotWordsDatum.symbolSize = this.generateRandomInteger(30, 85)
      // }


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
