<template>
  <div class="threadContent">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="thread.title"
    />
    <a-comment style="padding: 0 30px">
      <a slot="author">{{ thread.user.username }}</a>
      <a-avatar
        class="avatar"
        slot="avatar"
        icon="user"
        :alt="thread.user.username"
      ></a-avatar>
      <div slot="content" v-html="thread.content"></div>
      <a-tooltip slot="datetime">
        <span>{{ time(thread.createdAt) }}</span>
      </a-tooltip>
    </a-comment>
    <div>
      <a-list
        v-if="comments.length"
        :data-source="comments"
        :header="`${comments.length} 回复`"
        item-layout="horizontal"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-comment
            :author="item.user.username"
            :content="item.content"
            :datetime="time(item.createdAt)"
          >
            <a-avatar slot="avatar" class="avatar" icon="user" />
          </a-comment>
        </a-list-item>
      </a-list>
      <a-comment>
        <a-avatar
          slot="avatar"
          class="avatar"
          :alt="$store.state.user.username"
          icon="user"
        ></a-avatar>
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="4" :value="value" @change="handleChange" />
          </a-form-item>
          <a-form-item>
            <a-button
              html-type="submit"
              :loading="submitting"
              type="primary"
              @click="handleSubmit"
            >
              回复
            </a-button>
          </a-form-item>
        </div>
      </a-comment>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  created() {
    this.fetchThread();
    this.fetchComment();
    console.log(this.thread);
  },
  props: {
    threadId: "",
    courseId: "",
  },
  data() {
    return {
      moment,
      thread: {},
      comments: [],
      submitting: false,
      value: "",
    };
  },
  methods: {
    async fetchThread() {
      const { data } = await this.$http.get(`threads/${this.threadId}`);
      this.thread = data;
      console.log(this.thread);
    },
    async fetchComment() {
      const { data } = await this.$http.get("comments", {
        params: {
          query: {
            where: {
              type: "Thread",
              object: this.threadId,
            },
            limit: 20,
          },
        },
      });
      this.comments = data;
    },
    async handleSubmit() {
      if (!this.value) {
        return;
      }
      this.submitting = true;
      const newComment = {
        content: this.value,
        type: "Thread",
        object: this.threadId,
      };
      const res = await this.$http.post("comments", newComment);
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
            id: this.$http.defaults.baseURL + "/comments",
            display: {
              en_US: "comment",
              zh_CN: "评论",
              content: newComment.content,
            },
          },
          object: {
            id: this.thread._id,
            definition: {
              name: this.thread.title,
              description: this.thread.content,
              type: "Thread",
              course: this.courseId,
            },
          },
          createdAt: new Date().toLocaleString("chinese", { hour12: false }),
        });
      }
      this.fetchComment();
      this.submitting = false;
      this.value = "";
    },
    handleChange(e) {
      this.value = e.target.value;
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
<style scoped>
.threadContent {
  padding: 50px 50px 0 70px;
  width: 1200px;
}
.avatar {
  background-color: #87d068;
}
</style>