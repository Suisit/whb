<template>
  <div class="work">
    <p style="font-size: 25px; display: inline-block">作业</p>
    <a-button
      v-if="$store.state.user._id == courseRole.createUser"
      type="primary"
      @click="$router.push(`/course/${courseId}/work/createWork`)"
      style="float: right; margin-right: 40px"
      >添加作业</a-button
    >
    <hr />
    <a-list style="width: 1100px">
      <a-list-item v-for="item in workList" :key="item._id">
        <a style="font-size: 20px" @click="work(item._id)">{{ item.title }}</a>
        <div>
          <a-button
            type="primary"
            style="margin-right:20px"
            v-if="$store.state.user._id == courseRole.createUser"
            @click="$router.push(`/course/${courseId}/work/EditWork/${item._id}`)"
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
      workList: [],
      courseRole: "",
    };
  },
  methods: {
    async deleteItem(id) {
      await this.$http.delete(`works/${id}`);
      this.fetch();
    },
    async my() {
      const res = await this.$http.get(`courses/${this.courseId}`);
      this.courseRole = res.data;
    },
    async fetch() {
      const { data } = await this.$http.get("works", {
        params: {
          query: {
            where: {
              course: this.courseId,
            },
            limit: 10,
          },
        },
      });
      this.workList = data;
    },
    async work(workId) {
      const res = await this.$http.get(`answer`, {
        params: {
          query: {
            where: {
              object: workId,
              user: this.$store.state.user._id,
            },
          },
        },
      });
      if (res.data == true) {
        this.$router.push(`/course/${this.courseId}/work/finishWork/${workId}`);
      } else {
        this.$router.push(`/course/${this.courseId}/work/workPage/${workId}`);
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