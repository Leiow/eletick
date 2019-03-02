<template>
  <Form ref="form_items" class="mission-form" style="width: 100vw; padding: 30px;">
    <FormItem
        v-for="(item, index) in form_items"
        :key="index"
        :prop="'items.' + index + '.something'">
      <Row class="button-group" :gutter="16">
        <Col span="12">
          <Input type="text" v-model="item.something" placeholder="要干啥啊"></Input>
        </Col>
        <Col span="8">
          <Input type="text" v-model="item.need_time" placeholder="干多久啊(minute)"></Input>
        </Col>
        <Col span="4">
          <Button long type="error" @click="handleRemove(index)">Delete</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row type="flex" align="middle" justify="center" :gutter="16">
        <Col span="6">
          <Button long type="success" @click="handleAdd" icon="md-add">Add Todo</Button>
        </Col>
        <Col span="6">
          <Button long type="primary" @click="handleSubmit('form_items')" icon="md-send">Submit</Button>
        </Col>
        <Col span="6">
          <Button long type="warning" @click="handleReset('form_items')" icon="md-redo">Reset</Button>
        </Col>
        <Col span="6">
          <Button long type="dashed" @click="goHome" icon="md-home">Back</Button>
        </Col>
      </Row>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      form_items: [],
    };
  },
  created() {
    const InitMission = localStorage.getItem('missions');
    if (InitMission) {
      this.form_items = JSON.parse(InitMission);
    } else {
      this.form_items = [
        {
          something: '',
          need_time: '',
          used_time: 0,
          start_time: '',
          end_time: '',
        }
      ];
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.form_items.forEach((value, index) => {
            value.need_time = Number.parseInt(value.need_time);
          });
          this.$store.dispatch('setMissionList', this.form_items);
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      });
      this.$store.dispatch('setMissionList', this.form_items);
      this.$router.push({ path: '/home' });
    },
    handleReset(name) {
      this.form_items = [{
        something: '',
        need_time: '',
        used_time: 0,
        start_time: '',
        end_time: '',
      }];
      this.$store.dispatch('setMissionList', this.form_items);
    },
    handleAdd() {
      this.form_items.push({
        something: '',
        need_time: '',
        used_time: 0,
        start_time: '',
        end_time: '',
      });
    },
    handleRemove(index) {
      this.form_items.splice(index, 1);
      this.$store.dispatch('setMissionList', this.form_items);
    },
    goHome() {
      this.$router.push({ path: '/home' });
    },
  },
};
</script>
