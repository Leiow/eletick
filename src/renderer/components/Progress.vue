<template>
  <div>
    <Row type="flex" align="middle" justify="center" class="top-row">
      <span class="mission-name">{{ mission_name }}</span>
    </Row>
    <Row type="flex" align="middle" justify="center" class="process-row">
      <i-circle :percent="70" :size="180">
        <span style="font-size:30px">{{ minutes }}</span>分
        <span style="font-size:30px">{{ seconds }}</span>秒
      </i-circle>
    </Row>
    <Row type="flex" justify="center" :gutter="16" class="status-btn-group">
      <Col>
        <Button type="warning" class="status-btn">暂停</Button>
      </Col>
      <Col>
        <Button type="info" class="status-btn">开始</Button>
      </Col>
      <Col>
        <Button type="success" class="status-btn">完成</Button>
      </Col>
    </Row>
    <Row type="flex" align="middle" justify="center">
      <Col span="16">
        <Table :show-header="false" :columns="table_column" :data="table_data" class="describe-table"></Table>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    total_time: {
      type: Number,
      default: 60,
    },
    mission_name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minutes: '30',
      seconds: '30',
      table_column: [
        {
          'title': 'Title',
          'key': 'title',
          'align': 'center',
        },
        {
          'title': 'Time',
          'key': 'time',
        },
      ],
      table_data: [
        {
          'title': '规划时长',
          'time': 30,
        },
        {
          'title': '开始时间',
          'time': 30,
        },
        {
          'title': '结束时间',
          'time': 30,
        },
        {
          'title': '耗时总计',
          'time': 30,
        },
      ],
    };
  },
  created() {
  },
};
</script>

<style>
.top-row, .process-row, .status-btn-group {
  margin-bottom: 5vw;
}
.top-row {
  height: 20vw;
}
.mission-name {
  font-size: 35px;
  font-weight: bold;
}
.process-row {
  height: 30vw;
}
.status-btn {
  width: 20vh;
  height: 10vw;
  font-size: 24px !important;
}
</style>
