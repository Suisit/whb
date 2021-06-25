<template>
  <div>
    <h3>{{ "(" + (index + 1) + ")、" }}{{ title }}{{ '  '+"(" +score + "分)" }}</h3>
    <a-radio-group
      v-model="value"
      @change="$emit('change', $event.target.value)"
    >
      <a-radio :style="radioStyle" :value="'A'"><span class="itemStyle">A.</span> {{ selectItem[0] }} </a-radio>
      <a-radio :style="radioStyle" :value="'B'"><span class="itemStyle">B.</span> {{ selectItem[1] }} </a-radio>
      <a-radio :style="radioStyle" :value="'C'"><span class="itemStyle">C.</span> {{ selectItem[2] }} </a-radio>
      <a-radio :style="radioStyle" :value="'D'"><span class="itemStyle">D.</span> {{ selectItem[3] }} </a-radio>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  model: {
    prop: "select",
    event: "change",
  },
  props: {
    selectItem: {
      required: true,
    },
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
      radioStyle: {
        display: "block",
        height: "50px",
        lineHeight: "50px",
      },
    };
  },
  methods: {},
};
</script>
<style scoped>
.itemStyle{
  font-weight: bold;
}
</style>