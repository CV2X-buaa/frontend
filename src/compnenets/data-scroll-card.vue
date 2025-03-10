<template>
  <section style="overflow: hidden">
    <ul class="scroll-title">
      <li>时间戳</li>
      <li>数据帧</li>
      <li>数据长度</li>
      <li>数据</li>
      <li>状态</li>
    </ul>

    <Vue3SeamlessScroll :list="dataList" hover :class-option="classOption" class="warp">
      <ul class="item">
        <li v-for="(entry, index) in dataList" :key="index" @click="showDetail(entry)">
          <span :class="getClass(entry['11'])">{{ entry['0'] }}</span>
          <span :class="getClass(entry['11'])">{{ entry['1'] }}</span>
          <span :class="getClass(entry['11'])">{{ entry['2'] }}</span>
          <span :class="getClass(entry['11'])">{{ concatFromThird(entry) }}</span>
          <span :class="getClass(entry['11'])">{{ entry['11'] }}</span>
        </li>
      </ul>
    </Vue3SeamlessScroll>

    <el-drawer title="报文详情" v-model="dialogVisible" direction="rtl" size="30%">
      <div class="detail-content" style="margin-bottom: 20px">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="时间戳">{{ selectedData['0'] }}</el-descriptions-item>
          <el-descriptions-item label="数据帧">{{ selectedData['1'] }}</el-descriptions-item>
          <el-descriptions-item label="数据长度">{{ selectedData['2'] }}</el-descriptions-item>
          <el-descriptions-item label="完整数据">
            {{ concatFromThird(selectedData) }}
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="selectedData['11'] === 'Normal' ? 'success' : 'danger'">
              {{ selectedData['11'] }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <el-text class="mx-1" tag="b" size="large" style="margin-top: 20px;">解析结果</el-text>
      <el-table :data="analyzedResults" border style="width: 100%; margin-top: 20px;margin-bottom: 20px">
        <el-table-column prop="field" label="字段" width="120" />
        <el-table-column label="解析结果">
          <template #default="{ row }">
            <div v-if="row.field === '时间戳'">
              {{ formatTimestamp(row.rawValue) }}
            </div>
            <div v-else-if="row.field === '状态'">
              <el-tag :type="row.rawValue === 'Normal' ? 'success' : 'danger'">
                {{ row.rawValue === 'Normal' ? '无异常' : `受到了${row.rawValue}攻击` }}
              </el-tag>
            </div>
            <div v-else>
              {{ row.parsedValue || row.rawValue }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <el-button type="warning" plain @click="toAI">AI解析报文</el-button>
      </div>
    </el-drawer>
  </section>
</template>

<script>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import axios from 'axios';
import { ElDrawer, ElDescriptions, ElDescriptionsItem, ElTag } from 'element-plus';

export default {
  name: "data-scroll-card",
  components: {
    Vue3SeamlessScroll,
    ElDrawer,
    ElDescriptions,
    ElDescriptionsItem,
    ElTag
  },
  data() {
    return {
      classOption: {
        direction: 0,
      },
      dataList: [],
      dialogVisible: false,  // 控制弹窗显示
      selectedData: null,    // 存储选中行的数据
      aiReport:null,   //存储AI返回的
    }
  },
  created() {
    // 从后端获取数据
    axios.get('http://localhost:8000/ids/read_csv')
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
    },
    analyzeData(data) {
      return [
        {
          field: '时间戳',
          rawValue: data['0'],
          parsedValue: this.formatTimestamp(data['0'])
        },
        {
          field: '数据帧',
          rawValue: data['1'],
          parsedValue: `0x${parseInt(data['1']).toString(16).toUpperCase()}`
        },
        {
          field: '数据长度',
          rawValue: data['2'],
          parsedValue: `${data['2']} bytes`
        },
        {
          field: '完整数据',
          rawValue: this.concatFromThird(data),
          parsedValue: this.parseHexData(this.concatFromThird(data))
        },
        {
          field: '状态',
          rawValue: data['11'],
          parsedValue: data['11'] === 'Normal' ? '正常通信' : '异常告警'
        }
      ]
    },

    // 时间戳格式化方法
    formatTimestamp(timestamp) {
      if (!timestamp) return 'N/A'
      const date = new Date(Number(timestamp) * 1000) // 假设时间戳是秒级
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },

    // 十六进制数据解析示例
    parseHexData(hexStr) {
      try {
        return hexStr.match(/.{1,2}/g)
          .map(byte => `0x${byte}`)
          .join(' ')
      } catch {
        return hexStr
      }
    },

    //展示详细报文信息
    showDetail(entry) {
      this.selectedData = entry
      this.analyzedResults = this.analyzeData(entry) // 生成解析结果
      this.dialogVisible = true
    },

    //接入AI
    toAI(){
      //TODO
      data=this.selectedData;
      //aiReport=
    }
  }
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
      }
    }
  }
}

.red-font {
  color: red;
}

.Timestamp {
  color: $font-color;
  font-weight: bold !important;
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

/* 确保 el-drawer 正常显示 */
.el-drawer {
  z-index: 9999 !important;
}
</style>