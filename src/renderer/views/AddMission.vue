<template>
  <Form ref="form_items" class="mission-form" style="width: 100vw; padding: 30px;">
    <FormItem
        v-for="(item, index) in form_items"
        :key="index"
        :prop="'items.' + index + '.something'">
      <Row class="button-group">
        <Col span="9">
          <Input type="text" v-model="item.something" placeholder="要干啥啊"></Input>
        </Col>
        <Col span="7" offset="1">
          <Input type="text" v-model="item.need_time" placeholder="干多久啊(minute)"></Input>
        </Col>
        <Col span="6" offset="1">
          <Button type="error" @click="handleRemove(index)">Delete</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="12">
          <Button type="dashed" long @click="handleAdd" icon="md-add">啥也不说就是干！</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row type="flex" align="middle" justify="center">
        <Button type="primary" @click="handleSubmit('form_items')">就这些吧</Button>
        <Button @click="handleReset('form_items')" style="margin-left: 8px">不行不行</Button>
        <Button type="info" @click="goHome" style="margin-left: 8px">不能再加了</Button>
      </Row>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      index: 1,
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
          index: 1,
          used_time: 0,
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
          localStorage.setItem('missions', JSON.stringify(this.form_items));
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      });
      this.$store.dispatch('setMissionList', this.form_items);
    },
    handleReset(name) {
      this.form_items = [{
        something: '',
        need_time: '',
        index: 1,
        used_time: 0,
      }];
      localStorage.setItem('missions', JSON.stringify(this.form_items));
      this.$store.dispatch('setMissionList', this.form_items);
    },
    handleAdd() {
      this.index++;
      this.form_items.push({
        something: '',
        need_time: '',
        index: this.index,
        used_time: 0,
      });
    },
    handleRemove(index) {
      this.form_items.splice(index, 1);
      if (this.form_items.length === 0) {
        this.index = 1;
        this.form_items.push({
          something: '',
          need_time: '',
          index: 1,
          used_time: 0,
        });
      }
      localStorage.setItem('missions', JSON.stringify(this.form_items));
      this.$store.dispatch('setMissionList', this.form_items);
    },
    goHome() {
      this.$router.push({ path: '/home' });
    },
  },
};
</script>
