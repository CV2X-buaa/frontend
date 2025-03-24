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
          <td>{{ entry.speed }}</td>
          <td>{{ entry.msgCnt }}</td>
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
        const entry = {
          Timestamp: values[2],
          CAN_ID: values[0],
          speed: values[7],
          msgCnt: values[9],
          Class: values[29]
        };
        result.push(entry);
      }
      return result;
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>