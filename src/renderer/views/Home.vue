<template>
  <div>
    <Row>
      <h1>Tick-Tick</h1>
    </Row>
    <Row>
      <Col>
        <Button type="primary" @click="addMission">干点啥吧</Button>
      </Col>
      <Col>
        <Button type="success" @click="toMission">起飞吧大佬</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  methods: {
    addMission() {
      this.$router.push({ path: '/add-mission'});
    },
    toMission() {
      this.$router.push({ path: '/mission' });
    },
  },
};
</script>

