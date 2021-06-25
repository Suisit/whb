<template>
  <div class="work">
    <p style="font-size: 25px; display: inline-block">考试</p>
    <a-button
      v-if="$store.state.user._id == courseRole.createUser"
      type="primary"
      @click="$router.push(`/course/${courseId}/exam/createExam`)"
      style="float: right; margin-right: 40px"
      :disabled="examList.length > 0 ? true : false"
      >添加考试</a-button
    >
    <hr />
    <a-list style="width: 1100px">
      <a-list-item v-for="item in examList" :key="item._id">
        <a style="font-size: 20px" @click="exam(item._id)">{{ item.title }}</a>
        <div>
          <a-button
            type="primary"
            style="margin-right: 20px"
            v-if="$store.state.user._id == courseRole.createUser"
            @click="
              $router.push(`/course/${courseId}/exam/eidtExam/${item._id}`)
            "
            >编辑</a-button
          >
          <a-button
            type="primary"
            v-if="$store.state.user._id == courseRole.createUser"
            @click="deleteItem(item._id)"
            >删除</a-button
          >
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
export default {
  props: {
    courseId: "",
  },
  created() {
    this.fetch();
    this.my();
  },
  data() {
    return {
      examList: [],
      courseRole: "",
    };
  },
  methods: {
    async my() {
      const res = await this.$http.get(`courses/${this.courseId}`);
      this.courseRole = res.data;
    },
    async deleteItem(id) {
      await this.$http.delete(`exam/${id}`);
      this.fetch();
    },
    async fetch() {
      const { data } = await this.$http.get("exam", {
        params: {
          query: {
            where: {
              course: this.courseId,
            },
            limit: 10,
          },
        },
      });
      this.examList = data;
    },
    async exam(examId) {
      const res = await this.$http.get(`answer`, {
        params: {
          query: {
            where: {
              object: examId,
              user: this.$store.state.user._id,
            },
          },
        },
      });
      if (res.data == true) {
        this.$router.push(`/course/${this.courseId}/exam/finishExam/${examId}`);
      } else {
        this.$router.push(`/course/${this.courseId}/exam/examPage/${examId}`);
      }
    },
  },
};
</script>
<style scoped>
.work {
  padding: 50px 0 0 70px;
}
</style>