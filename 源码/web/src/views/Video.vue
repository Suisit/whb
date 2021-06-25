<template>
  <div>
    <a-layout style="background-color: white">
      <a-layout-content
        :style="{
          padding: '24px',
          background: '#fff',
          minHeight: '220px',
        }"
      >
        <video
          id="video"
          :src="playVideo.file"
          controls="controls"
          width="960px"
          height="540px"
          autoplay
          pause
          ref="video"
        ></video>
      </a-layout-content>
      <a-layout-sider
        width="280px"
        style="background-color: white; margin-top: 20px"
      >
        <div
          class="demo-infinite-container"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="1"
        >
          <a-list>
            <a-list-item v-for="item in course.blocks" :key="item._id">
              <div @click.prevent="videoPlay(item)" style="cursor: pointer">
                <a-icon type="play-circle" />
                <a
                  style="
                    margin-left: 8px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  "
                  >{{ item.name }}</a
                >
              </div>
              <a-button
                type="primary"
                v-if="$store.state.user._id == courseRole.createUser"
                @click="deleteItem(item._id)"
                >删除</a-button
              >
            </a-list-item>
          </a-list>
        </div>
        <a-button
          class="addButton"
          type="primary"
          @click="showModal"
          v-if="$store.state.user._id == courseRole.createUser"
        >
          添加课时
        </a-button>
        <a-modal
          destroyOnClose
          title="Title"
          :visible="visible"
          :confirm-loading="confirmLoading"
          okText="确定"
          cancelText="取消"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-form-item label="课时名称">
              <a-input v-model="block.name" />
            </a-form-item>
            <a-form-item label="上传视频">
              <a-upload
                accept="video/*,"
                name="file"
                :multiple="true"
                :action="$http.defaults.baseURL + '/upload'"
                @change="handleChange"
              >
                <a-button> <a-icon type="upload" /> 点击上传</a-button>
              </a-upload>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }"> </a-form-item>
          </a-form>
        </a-modal>
      </a-layout-sider>
    </a-layout>
  </div>
</template>
<script>
import infiniteScroll from "vue-infinite-scroll";
export default {
  directives: { infiniteScroll },
  props: {
    courseId: "",
  },
  data() {
    return {
      loading: false,
      block: {
        name: "",
        file: "",
        course: "",
      },
      course: {},
      visible: false,
      confirmLoading: false,
      playVideo: "",
      busy: false,
      courseRole: "",
    };
  },
  created() {
    this.fetch();
    this.my();
  },
  mounted() {
    let video = document.getElementById("video");
    video.addEventListener("pause", async () => {
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
            id: this.playVideo.file,
            display: {
              en_US: "paused",
              zh_CN: "暂停",
            },
          },
          object: {
            id: this.playVideo._id,
            definition: {
              name: this.playVideo.name,
              type: "Video",
              course: this.playVideo.course,
            },
          },
          result: {
            timestamp: video.currentTime,
          },
          createdAt: new Date().toLocaleString("chinese", { hour12: false }),
        });
      }
    });
    video.addEventListener("seeked", async () => {
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
            id: this.playVideo.file,
            display: {
              en_US: "seeked",
              zh_CN: "改变播放位置",
            },
          },
          object: {
            id: this.playVideo._id,
            definition: {
              name: this.playVideo.name,
              type: "Video",
              course: this.playVideo.course,
            },
          },
          result: {
            timestamp: video.currentTime,
          },
          createdAt: new Date().toLocaleString("chinese", { hour12: false }),
        });
      }
    });
    video.addEventListener("volumechange", async () => {
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
            id: this.playVideo.file,
            display: {
              en_US: "volumechanged",
              zh_CN: "改变音量",
            },
          },
          object: {
            id: this.playVideo._id,
            definition: {
              name: this.playVideo.name,
              type: "Video",
              course: this.playVideo.course,
            },
          },
          result: {
            timestamp: video.currentTime,
            volume: video.volume,
          },
          createdAt: new Date().toLocaleString("chinese", { hour12: false }),
        });
      }
    });
    video.addEventListener("ended", async () => {
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
            id: this.playVideo.file,
            display: {
              en_US: "ended",
              zh_CN: "观看完",
            },
          },
          object: {
            id: this.playVideo._id,
            definition: {
              name: this.playVideo.name,
              type: "Video",
              course: this.playVideo.course,
            },
          },
          createdAt: new Date().toLocaleString("chinese", { hour12: false }),
        });
      }
    });
    window.onunload = async () => {
      let timestamp = document.getElementById("video");
      if (this.videoPlay != "") {
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
              id: this.playVideo.file,
              display: {
                en_US: "watched",
                zh_CN: "观看",
              },
            },
            object: {
              id: this.playVideo._id,
              definition: {
                name: this.playVideo.name,
                type: "Video",
                course: this.playVideo.course,
              },
            },
            result: {
              timestamp: timestamp.currentTime,
            },
            createdAt: new Date().toLocaleString("chinese", { hour12: false }),
          });
        }
      }

      return 1;
    };
  },
  beforeDestroy() {
    this.close();
  },
  watch: {
    playVideo: async function (newValue, oldValue) {
      if (oldValue != "") {
        let timestamp = document.getElementById("video");
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
              id: oldValue.file,
              display: {
                en_US: "watched",
                zh_CN: "观看",
              },
            },
            object: {
              id: oldValue._id,
              definition: {
                name: oldValue.name,
                type: "Video",
                course: this.playVideo.course,
              },
            },
            result: {
              timestamp: timestamp.currentTime,
            },
            createdAt: new Date().toLocaleString("chinese", { hour12: false }),
          });
        }
      }
    },
  },
  methods: {
    async deleteItem(id) {
      await this.$http.delete(`blocks/${id}`);
      this.fetch();
    },
    async close() {
      let timestamp = this.$refs.video;
      if (this.playVideo != "") {
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
              id: this.playVideo.file,
              display: {
                en_US: "watched",
                zh_CN: "观看",
              },
            },
            object: {
              id: this.playVideo._id,
              definition: {
                name: this.playVideo.name,
                type: "Video",
                course: this.playVideo.course,
              },
            },
            result: {
              timestamp: timestamp.currentTime,
            },
            createdAt: new Date().toLocaleString("chinese", { hour12: false }),
          });
        }
      }
      return 1;
    },
    async fetch() {
      const res = await this.$http.get(`courses/${this.courseId}`, {
        params: {
          query: { populate: "blocks" },
        },
      });
      this.course = res.data;
      this.data = res.data.blocks;
    },
    async my() {
      const res = await this.$http.get(`courses/${this.courseId}`);
      this.courseRole = res.data;
    },
    async postBlock() {
      return await this.$http.post(`blocks`, this.block);
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.postBlock();
        this.confirmLoading = false;
        this.fetch();
      }, 0);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    handleChange(info) {
      if (info) {
        if (info.file.status === "uploading") {
          this.loading = true;
          return;
        }
        if (info.file.status === "done") {
          this.block.file = info.file.response.url;
          this.block.course = this.courseId;
          this.loading = false;
          this.$message.success("上传成功");
        }
      }
    },
    async videoPlay(video) {
      this.playVideo = video;
    },
  },
};
</script>
<style scoped>
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 545px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
.addButton {
  display: block;
  margin: 0 auto;
}
</style>