<template>
  <section style="overflow: hidden">
    <ul class="scroll-title">
      <li>时间戳</li>
      <li>Arbitration_ID</li>
      <li>DLC</li>
      <li>数据</li>
      <li>状态</li>
    </ul>

    <Vue3SeamlessScroll :list="dataList" hover :class-option="classOption" class="warp">
      <ul class="item">
        <li v-for="(entry, index) in dataList" :key="index">
          <span :class="getClass(entry['11'])">{{ entry['0'] }}</span>
          <span :class="getClass(entry['11'])">{{ entry['1'] }}</span>
          <span :class="getClass(entry['11'])">{{ entry['2'] }}</span>
          <span :class="getClass(entry['11'])">{{ concatFromThird(entry) }}</span>
          <span :class="getClass(entry['11'])">{{ entry['11'] }}</span>
          <!-- <span class="Class">{{ entry['11'] }}</span> -->
        </li>
      </ul>
    </Vue3SeamlessScroll>
  </section>
</template>

<script>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import axios from 'axios';
export default {
  name: "data-scroll-card",
  components: {
    Vue3SeamlessScroll
  },
  data() {
    return {
      classOption: {
        direction: 0,
      },
      dataList: []
    }
  },
  created() {
    // 从后端获取数据
    axios.get('http://localhost:8000/ids/car_csv')//http://localhost:8000/ids/car_csv')
      .then(response => {
        // 成功接收响应后，更新 dataList
        this.dataList = response.data;
        this.startScrolling();
      })
      .catch(error => {
        // 处理错误
        console.error('Error fetching data:', error);
      });
  },
  methods: {
    concatFromThird(item) {
      const keys = Object.keys(item);
      return keys.slice(3, -1).map(key => item[key]).join('');
    },
    getClass(classValue) {
      return {
        'Class': true,
        'red-font': classValue !== 'Normal', // Add 'red-font' class if classValue is not 'Normal'
        'Timestamp': classValue == 'Normal'
      };
    }
  },
}
</script>

<style lang="scss" scoped>
$primary-color: #4c71ea;
$secondary-color: #00d8ff;
$background-color: #686868;
$border-color: #686868;
$font-color: #b4b3b3;

$scroll-title-height: 2rem;
$scroll-title-font-size: 1rem;
$scroll-title-text-shadow: 0 0 25px $secondary-color;

$warp-height: calc(100% - #{$scroll-title-height});
$warp-font-size: .9rem;
$warp-border-color: #686868;
$warp-margin-bottom: 5px;

.scroll-title {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 25px $primary-color inset;

  li {
    width: 25%;
    height: $scroll-title-height;
    line-height: $scroll-title-height;
    font-size: $scroll-title-font-size;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #EEEEEE;
    font-weight: bold;
    font-family: "Adobe 楷体 Std R";
    text-shadow: $scroll-title-text-shadow;
  }
}

.warp {
  height: $warp-height;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  color: $background-color;

  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;

    li {
      height: 2.14rem;
      line-height: 2.14rem;
      display: flex;
      text-align: center;
      justify-content: space-between;
      font-size: $warp-font-size;
      border-bottom: 1px solid $warp-border-color;
      margin-bottom: $warp-margin-bottom;

      span {
        display: inline-block;
        width: 25%;
        //color: $font-color;
      }
    }
  }

}

.red-font {
  color: red;
}

.Timestamp {
  color: $font-color;
}

.Data {
  color: $font-color;
}

.DLC {
  color: $font-color;
}

.Arbitration_ID {
  color: $font-color;
}
</style>
