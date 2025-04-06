<template>
  <section style="overflow: hidden">
    <ul class="scroll-title">
      <li>ID</li>
      <li>时间戳</li>
      <li>速度km/h</li>
      <li>优先级</li>
      <li>状态</li>
    </ul>

    <Vue3SeamlessScroll :list="dataList" hover :class-option="classOption" class="warp">
      <ul class="item">
        <li v-for="(entry, index) in dataList" :key="index" @click="showDetail(entry)">
          <span :class="getClass(entry['28'])">{{ entry['0'] }}</span>
          <span :class="getClass(entry['28'])">{{ entry['2'] }}</span>
          <span :class="getClass(entry['28'])">{{ entry['7'] }}</span>
          <span :class="getClass(entry['28'])">{{ entry['15'] }}</span>
          <span :class="getClass(entry['28'])">{{ entry['28'] }}</span>
        </li>
      </ul>
    </Vue3SeamlessScroll>

    <el-drawer title="报文详情" v-model="dialogVisible" direction="rtl" size="30%">
      <div class="detail-content" style="margin-bottom: 20px;width:100%;">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="ID">{{ selectedData['0'] }}</el-descriptions-item>
          <el-descriptions-item label="时间戳">{{ selectedData['1'] }}</el-descriptions-item>
          <el-descriptions-item label="速度km/h">{{ selectedData['7'] }}</el-descriptions-item>
          <el-descriptions-item label="经度">{{ selectedData['4'] }}</el-descriptions-item>
          <el-descriptions-item label="纬度">{{ selectedData['5'] }}</el-descriptions-item>
          <el-descriptions-item label="锁星数">{{ selectedData['8'] }}</el-descriptions-item>
          <el-descriptions-item label="优先级">{{ selectedData['15'] }}</el-descriptions-item>
          <el-descriptions-item label="丢失的消息总数">{{ selectedData['13'] }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="selectedData['28'] === 'normal' ? 'success' : 'danger'">
              {{ selectedData['28'] }}
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
              <el-tag :type="row.rawValue === 'normal' ? 'success' : 'danger'">
                {{ row.rawValue === 'normal' ? '无异常' : `受到了${row.rawValue}攻击` }}
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
        <el-card shadow="always" v-if="isAIloading" style="margin-top:10px;">
          <div class="answer-content">{{ aiReport }}</div>
        </el-card>
      </div>
      <div class="three-body" style="margin-left:45%;margin-top:15px;" v-if="loader">
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
      </div>
    </el-drawer>
  </section>
</template>

<script>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import axios from 'axios';
import { ElDrawer, ElDescriptions, ElDescriptionsItem, ElTag } from 'element-plus';
import { toRaw } from 'vue'
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
      aiReport: "",
      isAIloading: false,
      api: "cc7f514058514df198bb84bb04e32097.MnDkWJUVSvJuryME",
      msgList: [{
        my: false,
        msg: "你好我是入侵检测系统的AI机器人,请问有什么问题可以帮助您?"
      }],
      msgContent: "",
      msg: "",
      msgForPost: [{
        role: "system",
        content: "你是一个用于通过报文检测路侧单元RSU是否遭受网络攻击的网页，我现在给出一条报文，请给出对报文的分析，并且给出对应的预案措施。请全部用中文回答。对于回答，请使用'\n'划分自然段。"
      }, {
        role: "user",
        content: ""
      }],
      title: null,
      result: [],
      loader: false,
    }
  },
  created() {
    // 从后端获取数据
    axios.get('http://localhost:8000/ids/read_csv')
      .then(response => {
        // 成功接收响应后，更新 dataList
        this.dataList = response.data;
        this.title = response.data[0];
        console.log(this.title);
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
    },
    getClass(classValue) {
      return {
        'Class': true,
        'red-font': classValue !== 'normal', // Add 'red-font' class if classValue is not 'Normal'
        'Timestamp': classValue == 'normal'
      };
    },
    analyzeData(data) {
      return [
        {
          field: 'ID',
          rawValue: data['0'],
          parsedValue: data['0'],
        },
        {
          field: '时间戳',
          rawValue: data['1'],
          parsedValue: this.formatTimestamp(data['1'])
        },
        {
          field: '数据长度',
          rawValue: data['24'],
          parsedValue: `${data['24']} bytes`
        },
        {
          field: '完整数据',
          rawValue: this.concatFromThird(data),
          parsedValue: this.parseHexData(this.concatFromThird(data))
        },
        {
          field: '状态',
          rawValue: data['28'],
          parsedValue: data['28'] === 'normal' ? '正常通信' : '异常告警'
        }
      ]
    },

    // 时间戳格式化方法
    formatTimestamp(timestamp) {
      if (!timestamp) return 'N/A'
      const date = new Date(Number(timestamp) * 1) // 假设时间戳是秒级
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

    async toAI() {
      try {
        this.loader=true;
        const userQuestion = this.selectedData; // 获取用户问题
        this.aiReport = ""; // 清空原有回答

        this.msgList.push({
          "msg": this.msg + userQuestion,
          "my": true
        })
        const keys = Object.values(this.title);

        // 提取 userQuestion 的值
        var result = [];
        const values = Object.values(userQuestion);
        for (let i = 0; i < keys.length; i++) {
          result[keys[i]] = values[i];
        }
        this.msgContent += ('YOU:' + this.msg + "\n")
        const resultString = Object.entries(result)
          .map(([key, value]) => `${key}为${value}`)
          .join(', ');
        this.msgForPost[1].content = "以下是报文,其中时间戳的单位为ms:\n" + resultString;
        console.log(this.msgForPost[1].content)
        this.msgLoad = true
        // 清除消息
        this.msg = "";
        axios.post('https://open.bigmodel.cn/api/paas/v4/chat/completions', JSON.stringify({
          messages: this.msgForPost, model: "glm-3-turbo"
        }), {
          headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.api }
        }).then(res => {
          console.log(res);
          let text = res.data.choices[0].message.content;
          console.log(text);
          this.aiReport = text;
          this.msgList.push({
            "msg": text,
            "my": false
          })
          this.loader=false;
          this.isAIloading = true;
          this.msgContent += (text + "\n")
          this.msgLoad = false
          this.sentext = '发送消息'
          document.cookie = JSON.stringify(this.msgList);
        })

      } catch (error) {
        console.error("AI请求异常:", error);
        this.aiReport = "请求AI服务时发生错误，请稍后重试。";
      }
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

:deep(.el-drawer) {
  background: rgba(#e4edff, .8);
}

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

.answer-content{
  white-space: pre-wrap;
}

/* From Uiverse.io by G4b413l */
.three-body {
  --uib-size: 35px;
  --uib-speed: 0.8s;
  --uib-color: #5D3FD3;
  position: relative;
  display: inline-block;
  height: var(--uib-size);
  width: var(--uib-size);
  animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
}

.three-body__dot {
  position: absolute;
  height: 100%;
  width: 30%;
}

.three-body__dot:after {
  content: '';
  position: absolute;
  height: 0%;
  width: 100%;
  padding-bottom: 100%;
  background-color: var(--uib-color);
  border-radius: 50%;
}

.three-body__dot:nth-child(1) {
  bottom: 5%;
  left: 0;
  transform: rotate(60deg);
  transform-origin: 50% 85%;
}

.three-body__dot:nth-child(1)::after {
  bottom: 0;
  left: 0;
  animation: wobble1 var(--uib-speed) infinite ease-in-out;
  animation-delay: calc(var(--uib-speed) * -0.3);
}

.three-body__dot:nth-child(2) {
  bottom: 5%;
  right: 0;
  transform: rotate(-60deg);
  transform-origin: 50% 85%;
}

.three-body__dot:nth-child(2)::after {
  bottom: 0;
  left: 0;
  animation: wobble1 var(--uib-speed) infinite calc(var(--uib-speed) * -0.15) ease-in-out;
}

.three-body__dot:nth-child(3) {
  bottom: -5%;
  left: 0;
  transform: translateX(116.666%);
}

.three-body__dot:nth-child(3)::after {
  top: 0;
  left: 0;
  animation: wobble2 var(--uib-speed) infinite ease-in-out;
}

@keyframes spin78236 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes wobble1 {

  0%,
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(-66%) scale(0.65);
    opacity: 0.8;
  }
}

@keyframes wobble2 {

  0%,
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(66%) scale(0.65);
    opacity: 0.8;
  }
}
</style>