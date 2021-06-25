<template>
  <div class="debateContent">
    <p style="font-size: 25px; display: inline-block">讨论区</p>
    <a-button
      type="primary"
      @click="initiate()"
      style="float: right; margin-right: 40px"
      >发起主题</a-button
    >
    <hr />
    <a-list id="debateList">
      <a-list-item v-for="item in threads" :key="item._id">
        <div style="width: 100%">
          <a
            @click.prevent="openThread(item)"
            style="display: block; font-size: 18px; margin-bottom: 10px"
            >{{ item.title }}</a
          >
          <div
            v-html="item.content"
            style="color: #b5b5b5; font-size: 16px"
          ></div>
        </div>
        <div style="width: 300px; position: relative; top: 30px">
          <span
            style="
              font-size: 10px;
              margin-right: 10px;
              color: #00c758;
              font-weight: bold;
            "
            >{{ item.user.username }}
          </span>
          <span style="font-size: 10px">
            {{ time(item.createdAt) }}
          </span>
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
  },
  data() {
    return {
      date: new Date(),
      threads: [],
    };
  },
  methods: {
    async openThread(item) {
      if (this.$store.state.user.role == "student") {
        await this.$http.post("statement", {
          actor: {
            objectType: "Agent",
            account: {
              id: this.$store.state.user._id,
              name: this.$store.state.user.username,
              realname: this.$store.state.user.realname,
            },
          },
          verb: {
            id: this.$http.defaults.baseURL + `course/${item._id}/Thread`,
            display: {
              en_US: "debate",
              zh_CN: "参与讨论",
            },
          },
          object: {
            id: item._id,
            definition: {
              name: item.title,
              type: "Thread",
              course: this.courseId,
            },
          },
          createdAt: new Date().toLocaleString("chinese", { hour12: false }),
        });
      }
      this.$router.push(`/course/${this.courseId}/debate/thread/${item._id}`);
    },
    initiate() {
      this.$router.push(`/course/${this.courseId}/debate/createThread`);
    },
    async fetch() {
      const { data } = await this.$http.get("threads", {
        params: {
          query: {
            where: {
              type: "Course",
              object: this.courseId,
            },
            limit: 20,
          },
        },
      });
      this.threads = data;
    },
    time(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
  },
};
</script>
<style  scoped>
.debateContent {
  padding: 50px 0 0 70px;
}
#debateList {
  width: 1100px;
  clear: right;
}
</style>
