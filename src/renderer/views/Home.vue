<template>
  <div>
    <Row class="title-row" type="flex" align="middle" justify="center">
      <span>Tick-Tick</span>
    </Row>
    <Row class="content-row">
      <Row class="add-mission-row" type="flex" align="middle" justify="center">
        <Col span="10">
          <Button long type="primary" size="large" @click="addMission">工作安排</Button>
        </Col>
        <Col span="10" offset="1">
          <Button long type="success" size="large" @click="exportData">导出数据</Button>
        </Col>
      </Row>
      <Row class="mission-list" type="flex" justify="center">
        <Table class="mission-table"
          border
          ref="table"
          :row-class-name="rowClassName"
          :columns="columns"
          :data="table_data"
          @on-row-click="toMission"></Table>
      </Row>
    </Row>
  </div>
</template>

<script>
import dayjs from 'dayjs';

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
      if (value.something === '' || value.something === null) {
        return;
      }
      this.table_data[index] = {
        index: index,
        something: value.something,
        need_time: value.need_time,
        used_time: (value.used_time / 60).toFixed(4),
        start_time: value.start_time,
        end_time: value.end_time,
      };
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
    exportData() {
      this.$refs.table.exportCsv({
        filename: `工作日程-${dayjs(new Date()).format('YYYY-MM-DD')}`,
        columns: [
          {
            title: '工作内容',
            key: 'something',
          },
          {
            title: '预估时间（分钟）',
            key: 'need_time',
          },
          {
            title: '实际消耗（分钟）',
            key: 'used_time',
          },
          {
            title: '开始时间',
            key: 'start_time',
          },
          {
            title: '结束时间',
            key: 'end_time',
          },
        ],
        data: this.table_data,
      });
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
.mission-list {
  margin-bottom: 5vh;
}
</style>
