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
      <Col span="6">
        <Button type="warning" :disabled="disable_pause" class="status-btn" @click="pause">暂停</Button>
      </Col>
      <Col span="6">
        <Button type="info" :disabled="disable_start" class="status-btn" @click="start">开始</Button>
      </Col>
      <Col span="6">
        <Button type="success" class="status-btn" @click="end">完成</Button>
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
    index: {
      type: Number,
      required: true,
    },
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
      disable_start: false,
      disable_pause: true,
      timer_id: null,
      minutes: 0,
      seconds: 0,
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
  methods: {
    start() {
      // 开始计时
      this.disable_start = true;
      this.disable_pause = false;
      this.timer_id = setInterval(() => {
        this.seconds++;
        if (this.seconds === 60) {
          this.minutes++;
          this.seconds = 0;
        }
      }, 1000);
    },
    pause() {
      // 暂停计时
      this.disable_start = false;
      this.disable_pause = true;
      if (this.timer_id !== null) {
        clearInterval(this.timer_id);
      }
    },
    end() {
      // 结束计时
      if (this.minutes === 0 && this.seconds === 0) {
        this.$Notice.warning({
          title: '想偷懒？',
          duration: 2,
        });
        return;
      }
      this.disable_start = false;
      this.disable_pause = true;
      if (this.timer_id !== null) {
        clearInterval(this.timer_id);
      }
    },
  },
};
</script>

<style>
.top-row, .process-row, .status-btn-group {
  margin-bottom: 5%;
}
.top-row {
  height: 20%;
}
.mission-name {
  font-size: 35px;
  font-weight: bold;
}
.process-row {
  height: 30%;
}
.status-btn {
  width: 100%;
  height: 100%;
  font-size: 24px !important;
}
</style>
