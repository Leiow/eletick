<template>
  <div>
    <Row class="title-row" type="flex" align="middle" justify="center">
      <span>Tick-Tick</span>
    </Row>
    <Row class="content-row">
      <Row class="add-mission-row" type="flex" align="middle" justify="center">
        <Col span="22">
          <Button long type="primary" size="large" @click="addMission">今天要嘎哈</Button>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Table class="mission-table"
          border
          :row-class-name="rowClassName"
          :columns="columns"
          :data="table_data"
          @on-row-click="toMission"></Table>
      </Row>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '欠下的债',
          key: 'something',
        },
        {
          title: '预估 (分钟)',
          key: 'need_time',
        },
        {
          title: '消耗 (分钟)',
          key: 'used_time',
        },
      ],
      table_data: [],
      progress: 0,
    };
  },
  created() {
    this.$store.getters.getMissionList.forEach((value, index) => {
      this.table_data[index] = {
        index: index,
        something: value.something,
        need_time: value.need_time,
        used_time: (value.used_time / 60).toFixed(4),
      };
      this.table_data[index].used_minutes = parseInt(value.used_time / 60);

      if (value.used_time === 0 || value.used_time === '') {
      }
    });
  },
  methods: {
    addMission() {
      this.$router.push({ path: '/add-mission'});
    },
    toMission(_, index) {
      this.$router.push({ path: `/mission/${index}` });
    },
    rowClassName(row, index) {
      const RowData = this.$store.getters.getMissionList[index];
      const Progress = RowData.used_time / 60 / RowData.need_time;
      if (Progress === 0) {
        return '';
      } else if (Progress > 0.6 && Progress <= 0.8) {
        return 'table-warning-row';
      } else if (Progress > 0.8) {
        return 'table-timeout-row';
      } else {
        return 'table-start-row';
      }
    },
  },
};
</script>

<style>
.title-row {
  height: 30vw;
  font-size: 10vw;
}
.add-mission-row {
  height: 50% !important;
}
.mission-table {
  margin-top: 20px;
  width: 90vw !important;
}
.ivu-table .table-start-row td {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .table-warning-row td {
  background-color: #ffb600;
  color: #fff;
}
.ivu-table .table-timeout-row td {
  background-color: #ff5500;
  color: #fff;
}
</style>
