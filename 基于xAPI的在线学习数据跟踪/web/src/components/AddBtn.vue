<template>
  <div>
    <a-icon type="star" :theme="status ? 'filled' : 'outlined'" @click="toggle" :style="{ fontSize: '50px', color: '#08c' }"/>
  </div>
</template>
<script>
export default {
  props: {
    object: {
      type: String,
    },
  },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    async getStatus() {
      const res = await this.$http.get("actions/status", {
        params: {
          type: "Course",
          object:this.object,
          name: "add",
        },
      });
      this.status = res.data.status;
    },
    async toggle() {
      const res = await this.$http.post("actions/toggle", {
        type: "Course",
        object:this.object,
        name: "add",
      });
      this.status = res.data.status;
    },
  },
  mounted() {
    this.getStatus();
  },
};
</script>