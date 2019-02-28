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
        <Button type="success" :disabled="disable_end" class="status-btn" @click="end">完成</Button>
      </Col>
    </Row>
    <Row type="flex" align="middle" justify="center" class="info-show">
      <Col span="16">
        规划时长：<strong>{{ total_time }}</strong>分
      </Col>
    </Row>
    <Row type="flex" align="middle" justify="center" class="info-show">
      <Col span="16">
        开始时间：<strong>{{ start_time }}</strong>
      </Col>
    </Row>
    <Row type="flex" align="middle" justify="center" class="info-show">
      <Col span="16">
        结束时间：<strong>{{ end_time }}</strong>
      </Col>
    </Row>
    <Button @click="clear">CLEAR</Button>
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
    used_time: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      disable_start: false,
      disable_pause: true,
      disable_end: false,
      timer_id: null,
      minutes: 0,
      seconds: 0,
      start_time: '',
      end_time: '',
    };
  },
  created() {
    this.seconds = this.used_time % 60;
    this.minutes = Number.parseInt(this.used_time / 60);
  },
  mounted() {
    const MissionInfo = this.$store.getters.getMissionByIndex(this.index);
    this.start_time = MissionInfo.start_time;
    this.end_time = MissionInfo.end_time;
  },
  methods: {
    start() {
      // 开始计时
      this.disable_start = true;
      this.disable_pause = false;
      this.disable_end = false;
      this.timer_id = setInterval(() => {
        this.seconds++;
        if (this.seconds === 60) {
          this.minutes++;
          this.seconds = 0;
        }
      }, 1000);
      if (this.$store.getters.getMissionByIndex(this.index).start_time === '') {
        this.start_time = new Date().toLocaleString();
        this.$store.dispatch('setStartTime', {
          index: this.index,
          time: this.start_time,
        });
      }
    },
    pause() {
      // 暂停计时
      this.disable_start = false;
      this.disable_pause = true;
      this.disable_end = false;
      if (this.timer_id !== null) {
        clearInterval(this.timer_id);
      }
      this.$store.dispatch('setUsedTime', {
        index: this.index,
        time: this.minutes * 60 + this.seconds,
      });
    },
    end() {
      // 结束计时
      if (this.minutes === 0 && this.seconds === 0) {
        this.$Notice.warning({
          title: '想偷懒？',
          duration: 2,
        });
        return;
      } else {
        this.disable_start = false;
        this.disable_pause = true;
        this.disable_end = true;
        if (this.timer_id !== null) {
          clearInterval(this.timer_id);
          this.end_time = new Date().toLocaleString();
          this.$store.dispatch('setEndTime', {
            index: this.index,
            time: this.end_time,
          });
        }
      }
    },
    computeTime() {
      return this.minutes * 60 + this.seconds;
    },
    clear() {
      this.$store.dispatch('setUsedTime', {
        index: this.index,
        time: 0,
      });
      this.$store.dispatch('clearStartTime', this.index);
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
  font-size: 4vw !important;
}
.info-show {
  font-size: 4vw;
}
</style>
