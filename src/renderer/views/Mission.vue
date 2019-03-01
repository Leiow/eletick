<template>
  <div>
    <Row>
      <mission-progress
        :index="index"
        :total_time="mission_list.need_time"
        :mission_name="mission_list.something"
        :used_time="mission_list.used_time"
        :start_time="mission_list.start_time"
        :end_time="mission_list.end_time">
      </mission-progress>
    </Row>
    <Button @click="jump">Back Home</Button>
  </div>
</template>

<script>
import {
  setInterval,
  clearInterval
} from 'timers';
import MissionProgress from '@/components/Progress';

export default {
  components: {
    MissionProgress,
  },
  data() {
    return {
      index: 0,
      mission_list: [],
    };
  },
  created() {
    this.index = this.$route.params.index ? parseInt(this.$route.params.index) : 0;
    this.mission_list = this.$store.getters.getMissionList[this.index];
  },
  methods: {
    jump() {
      clearInterval(this.timer_id);
      this.$router.push({ path: '/home' });
    },
  },
};
</script>

