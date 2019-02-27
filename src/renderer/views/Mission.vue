<template>
  <div>
    <Row>
      <mission-progress v-for="(item, index) of mission_list"
        :key="index"
        :index="index"
        :total_time="item.need_time"
        :mission_name="item.something">
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
      mission_list: [],
    };
  },
  created() {
    this.mission_list = this.$store.getters.getMissionList;
  },
  methods: {
    jump() {
      clearInterval(this.timer_id);
      this.$router.push({ path: '/home' });
    },
  },
};
</script>

