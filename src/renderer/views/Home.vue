<template>
  <div>
    <h1>Home</h1>
    <Button type="success" @click="jump">Go Mission</Button>
  </div>
</template>

<script>
export default {
  methods: {
    jump() {
      this.$router.push({ path: '/mission' });
    },
  },
};
</script>

