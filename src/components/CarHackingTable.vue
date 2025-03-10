<!-- CarHackingTable.vue -->
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>CAN_ID</th>
          <th>DLC</th>
          <th>Data</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in data" :key="index">
          <td>{{ entry.Timestamp }}</td>
          <td>{{ entry.CAN_ID }}</td>
          <td>{{ entry.DLC }}</td>
          <td>{{ entry.Data }}</td>
          <td>{{ entry.Class }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch('/data/car_hacking_data.csv')
        .then(response => response.text())
        .then(csv => {
          this.data = this.parseCSV(csv);
        });
    },
    parseCSV(csv) {
      const lines = csv.split('\n');
      const result = [];

      for (let i = 0; i < lines.length; i++) {
        const values = lines[i].split(' '); // 根据空格分割数据
        if (values.length === 12) { // 检查每行数据是否有12个字段
          const entry = {
            Timestamp: values[0],
            CAN_ID: values[1],
            DLC: values[2],
            Data: values.slice(3, 11).join(' '), // 将Data字段合并为一个字符串
            Class: values[11]
          };
          result.push(entry);
        }
      }

      return result;
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>