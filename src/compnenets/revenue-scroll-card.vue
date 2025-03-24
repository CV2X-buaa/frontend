<template>
  <section style="height: 100%;overflow: hidden">
    <ul class="scroll-title">
      <li>ID</li>
      <li>Timestamp</li>
      <li>Speed</li>
      <li>msgCnt</li>
      <li>Class</li>
    </ul>
    <Vue3SeamlessScroll :list="dataList" hover class="warp">
      <ul class="item">
        <li v-for="(entry, index) in dataList" :key="index">
          <span class="ID">{{ entry['0'] }}</span>
          <span class="Timestamp">{{ entry['2'] }}</span>
          <span class="Speed">{{ entry['7'] }}</span>
          <span class="msgCnt">{{ entry['9'] }}</span>
          <span class="Class">{{ entry['28'] }}</span>
        </li>
      </ul>
    </Vue3SeamlessScroll>
  </section>
</template>

<script>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import axios from 'axios';
export default {
  name: "revenue-scroll-card",
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
    axios.get('http://localhost:8000/ids/read_csv')//http://localhost:8000/')
      .then(response => {
        // 成功接收响应后，更新 dataList
        this.dataList = response.data;
        this.dataList = this.dataList.splice(1);
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
    }
  },
}
</script>

<style lang="scss" scoped>
$primary-color: #718ff1;
$secondary-color: #5890bb;
$background-color: #686868;
$border-color: #686868;
$font-color: #b4b3b3;

$scroll-title-height: 20px;
$scroll-title-font-size: .8rem;
$scroll-title-text-shadow: 0 0 25px $secondary-color;

$warp-height: calc(100% - #{$scroll-title-height});
$warp-font-size: .8rem;
$warp-border-color: #686868;
$warp-margin-bottom: 5px;

.scroll-title {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 10px $primary-color inset;

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
      height: 30px;
      line-height: 30px;
      display: flex;
      text-align: center;
      justify-content: space-between;
      font-size: $warp-font-size;
      border-bottom: 1px solid $warp-border-color;
      margin-bottom: $warp-margin-bottom;

      span {
        display: inline-block;
        width: 25%;
        color: $font-color;
      }
    }
  }
}
</style>
