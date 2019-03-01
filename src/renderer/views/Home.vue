<template>
  <div>
    <Row class="title-row" type="flex" align="middle" justify="center">
      <span>Tick-Tick</span>
    </Row>
    <Row class="content-row">
      <Row class="add-mission-row" type="flex" align="middle" justify="center">
        <Button type="primary" size="large" @click="addMission">今天要嘎哈</Button>
      </Row>
      <Row type="flex" justify="center">
        <Table class="mission-table"
          border
          :columns="columns"
          :data="this.$store.getters.getMissionList"
          @on-row-click="toMission"></Table>
      </Row>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '欠下的债',
          key: 'something',
        },
        {
          title: '预估',
          key: 'need_time',
        },
        {
          title: '消耗',
          key: 'used_time',
        },
      ],
    };
  },
  methods: {
    addMission() {
      this.$router.push({ path: '/add-mission'});
    },
    toMission(_, index) {
      this.$router.push({ path: `/mission/${index}` });
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
  height: 70vw !important;
}
.add-mission-row, .to-mission-row {
  height: 50% !important;
}
.mission-table {
  width: 90vw !important;
}
</style>
