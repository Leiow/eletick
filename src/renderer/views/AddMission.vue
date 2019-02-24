<template>
  <div>
    <h1>AddMission</h1>
    <Button type="success" @click="jump">Go Home</Button>
  </div>
</template>

<script>
export default {
  methods: {
    jump() {
      this.$router.push({ path: '/home' });
    },
  },
};
</script>

