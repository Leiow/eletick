<template>
  <div>
    <h1>Mission</h1>
    <Button @click="jump">Back Home</Button>
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

