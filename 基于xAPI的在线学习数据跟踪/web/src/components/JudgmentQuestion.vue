<template>
  <div>
    <h3>{{ "(" + (index + 1) + ")、" }}{{ title }}{{ '  '+"(" +score + "分)" }}</h3>
    <a-radio-group
      v-model="value"
      @change="$emit('change', $event.target.value)"
    >
      <a-radio :value="'true'"> 对 </a-radio>
      <a-radio :value="'false'"> 错 </a-radio>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  model: {
    prop: "judgment",
    event: "change",
  },
  props: {
    title: {
      required: true,
    },
    index: {
      required: true,
    },
    score: {
      required: true,
    },
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {},
};
</script>
<style scoped>
</style>