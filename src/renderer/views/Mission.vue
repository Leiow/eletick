<template>
  <div>
    <Row>
      <mission-progress
        mission_name="大佬们别愁！">
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
    };
  },
  methods: {
    jump() {
      clearInterval(this.timer_id);
      this.$router.push({ path: '/home' });
    },
  },
};
</script>

