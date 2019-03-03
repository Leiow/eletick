<template>
  <div>
    <Row type="flex" align="middle" justify="center" class="top-row">
      <span class="mission-name">{{ mission_name }}</span>
    </Row>
    <Row type="flex" align="middle" justify="center" class="process-row">
      <i-circle :percent="percent" :stroke-color="stroke_color" class="progress-circle">
        <span style="font-size:6vw">{{ minutes }}</span>分
        <span style="font-size:4vw">{{ seconds }}</span>秒
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
        开始时间：<strong>{{ begin }}</strong>
      </Col>
    </Row>
    <Row type="flex" align="middle" justify="center" class="info-show">
      <Col span="16">
        结束时间：<strong>{{ finish }}</strong>
      </Col>
    </Row>
    <Row class="back-btn-row" type="flex" justify="center">
      <Col span="16">
        <Button long @click="jump">Back Home</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import dayjs from 'dayjs';
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
    start_time: {
      type: String,
      default: '',
    },
    end_time: {
      type: String,
      default: '',
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
      begin: '',
      finish: '',
      percent: 0,
      stroke_color: '#2db7f5',
    };
  },
  created() {
    this.seconds = this.used_time % 60;
    this.minutes = Number.parseInt(this.used_time / 60);
    this.begin = this.start_time;
    this.finish = this.end_time;
    this.getPercent();
  },
  mounted() {
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
        this.getPercent();
      }, 1000);
      if (this.begin === '') {
        this.begin = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
        this.$store.dispatch('setStartTime', {
          index: this.index,
          time: this.begin,
        });
      }
    },
    pause() {
      // 暂停计时
      this.disable_start = false;
      this.disable_pause = true;
      this.disable_end = true;
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
          this.finish = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
          this.$store.dispatch('setEndTime', {
            index: this.index,
            time: this.finish,
          });
        }
        this.$store.dispatch('setUsedTime', {
          index: this.index,
          time: this.minutes * 60 + this.seconds,
        });
      }
    },
    getPercent() {
      this.percent = this.percent === 100 ? 100 : ((this.minutes * 60 + this.seconds) / (this.total_time * 60)) * 100;
      if (this.percent > 60 && this.percent <= 80) {
        this.stroke_color = '#ffb600';
      } else if (this.percent > 80) {
        this.stroke_color = '#ff5500';
      } else {
        this.stroke_color = '#2db7f5';
      }
    },
    jump() {
      this.pause();
      this.$router.push({ path: '/home' });
    },
  },
};
</script>

<style>
.top-row, .process-row, .status-btn-group {
  margin-bottom: 5%;
}
.top-row {
  height: 15vh;
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
.back-btn-row {
  margin-top: 5vh;
}
.progress-circle {
  width: 40% !important;
  height: 40% !important;
}
</style>
