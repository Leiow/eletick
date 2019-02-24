<template>
  <div>
    <Row class-name="title-row" type="flex" align="middle" justify="center">
      <span>Tick-Tick</span>
    </Row>
    <Row class-name="content-row">
      <Row class-name="add-mission-row" type="flex" align="middle" justify="center">
        <Button type="primary" size="large" @click="addMission">今天要嘎哈</Button>
      </Row>
      <Row class-name="to-mission-row" type="flex" align="middle" justify="center">
        <Button type="success" size="large" @click="toMission">起飞吧大佬</Button>
      </Row>
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

<style>
.title-row {
  height: 30vw;
  font-size: 10vw;
}
.content-row {
  height: 40vw !important;
}
.add-mission-row, .to-mission-row {
  height: 50% !important;
}
</style>
