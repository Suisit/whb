<template>
  <div class="content">
    <p class="p" style="color: green">已完成</p>
    <p class="p">
      <span style="color: Red">{{ score }} / {{totalScore}}</span
      >分
    </p>
  </div>
</template>
<script>
export default {
  props: {
    workId: "",
  },
  data() {
    return {
      score: 0,
      totalScore: 0,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("answer/score", {
        params: {
          query: {
            where: {
              object: this.workId,
              user: this.$store.state.user._id,
            },
          },
        },
      });
      this.score = res.data.score;
      this.totalScore = res.data.totalScore;
    },
  },
};
</script>
<style scoped>
.content {
  width: 400px;
  height: 150px;
  margin:  auto;
  box-sizing: border-box;
}
.p {
  text-align: center;
  font-weight: bold;
  line-height: 75px;
  margin: auto;
  width: 400px;
  height: 75px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
}
</style>