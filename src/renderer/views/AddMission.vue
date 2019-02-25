<template>
  <Form ref="form_dynamic" :model="form_dynamic" class="mission-form" style="width: 100vw; padding: 30px;">
    <FormItem
        v-for="(item, index) in form_dynamic.items"
        :key="index"
        :prop="'items.' + index + '.something'">
      <Row class="button-group">
        <Col span="9">
          <Input type="text" v-model="item.something" placeholder="要干啥啊"></Input>
        </Col>
        <Col span="9" offset="1">
          <Input type="text" v-model="item.need_time" placeholder="干多久啊(minute)"></Input>
        </Col>
        <Col span="4" offset="1">
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
        <Button type="primary" @click="handleSubmit('form_dynamic')">就这些吧</Button>
        <Button @click="handleReset('form_dynamic')" style="margin-left: 8px">不行不行</Button>
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
      form_dynamic: {
        items: [
          {
            something: '',
            need_time: '',
            index: 1,
            used_time: 0,
          },
        ],
      },
    };
  },
  created() {
    this.form_dynamic.items = JSON.parse(localStorage.getItem('missions'));
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          localStorage.setItem('missions', JSON.stringify(this.form_dynamic.items));
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    handleReset(name) {
      this.form_dynamic.items = [{
        something: '',
        need_time: '',
        index: 1,
        used_time: 0,
      }];
      localStorage.setItem('missions', JSON.stringify(this.form_dynamic.items));
    },
    handleAdd() {
      this.index++;
      this.form_dynamic.items.push({
        something: '',
        need_time: '',
        index: this.index,
        used_time: 0,
      });
    },
    handleRemove(index) {
      this.form_dynamic.items.splice(index, 1);
      if (this.form_dynamic.items.length === 0) {
        this.index = 1;
        this.form_dynamic.items.push({
          something: '',
          need_time: '',
          index: 1,
          used_time: 0,
        });
      }
      localStorage.setItem('missions', JSON.stringify(this.form_dynamic.items));
    },
    goHome() {
      this.$router.push({ path: '/home' });
    },
  },
};
</script>
