<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
      <a-layout-sider
        style="background: #fff"
        v-model="collapsed"
        :trigger="null"
        collapsible
      >
        <a-menu theme="light" mode="inline" :default-selected-keys="['1']">
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <div class="content">
          <a-layout-content
            :style="{
              padding: '24px',
              background: '#fff',
              minHeight: '280px',
            }"
          >
            <a-input-search
              placeholder="输入搜索内容"
              enter-button
              @search="onSearch"
            />
            <br /><br />
            <a-button
              type="primary"
              @click="showModal"
              v-if="$store.state.user.role == 'teacher'"
              >添加课程</a-button
            >

            <a-modal
              title="创建课程"
              :visible="visible"
              :confirm-loading="confirmLoading"
              cancelText="取消"
              okText="确定"
              @ok="handleOk"
              destroyOnClose:true
              @cancel="handleCancel"
              @change="upload"
            >
              <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-item label="课程名称">
                  <a-input v-model="course.name" />
                </a-form-item>
                <a-form-item label="课程封面图">
                  <a-upload
                    name="file"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :action="$http.defaults.baseURL + '/upload'"
                    :before-upload="beforeUpload"
                    @change="upload"
                  >
                    <img
                      id="fileimage"
                      v-if="imageUrl"
                      :src="imageUrl"
                      alt="avatar"
                    />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
                </a-form-item>
              </a-form>
            </a-modal>
            <a-row>
              <br />
              <a-list
                :grid="{ gutter: 16, column: 4 }"
                v-for="item in newcourseLists"
                :key="item._id"
              >
                <a-list-item>
                  <a-card
                    hoverable
                    style="width: 240px"
                    @click="addCourse(item)"
                  >
                    <img slot="cover" :alt="item.name" :src="item.image" />
                    <a-card-meta :title="item.name"> </a-card-meta>
                  </a-card>
                </a-list-item>
              </a-list>
              <a-modal
                title="加入课程"
                :visible="visibleAdd"
                :confirm-loading="confirmLoading"
                @ok="handleAddOk"
                @cancel="handleAddCancel"
              >
                <p>是否加入此课程</p>
              </a-modal>
            </a-row>
          </a-layout-content>
        </div>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      url: "",
      imageUrl: "",
      loading: false,
      ModalText: "Content of the modal",
      visible: false,
      visibleAdd: false,
      confirmLoading: false,
      confirmLoadingAdd: false,
      courseLists: "",
      newcourseLists: "",
      course: {
        name: "",
        image: "",
        createUser: this.$store.state.user._id,
      },
      nowItem: "",
      courseAdd: [],
    };
  },
  created() {
    this.fetchCoursesList();
    this.fetchAddCourseList();
    console.log(this.$store.state.user._id);
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    onSearch(value) {
      let newlist = [];
      for (let i of this.courseLists) {
        if (i.name.search(value) > -1) {
          newlist.push(i);
        }
      }
      this.newcourseLists = newlist;
    },
    async fetchCoursesList() {
      const res = await this.$http.get("courses/amount/all");
      this.courseLists = res.data;
      this.newcourseLists = res.data;
    },
    async fetchAddCourseList() {
      const res = await this.$http.get("add-course", {
        params: {
          query: {
            where: {
              user: this.$store.state.user._id,
            },
          },
        },
      });
      for (let i of res.data) {
        this.courseAdd.push(i.course);
      }
    },
    async handleOk(e) {
      await this.$http.post("courses", this.course);
      this.fetchCoursesList();
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
        this.imageUrl = "";
        this.course.name = "";
      }, 0);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.imageUrl = "";
      this.course.name = "";
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    upload(info) {
      if (info) {
        if (info.file.status === "uploading") {
          this.loading = true;
          return;
        }
        if (info.file.status === "done") {
          this.imageUrl = info.file.response.url;
          this.course.image = info.file.response.url;
          this.loading = false;
          this.$message.success("上传成功");
        }
      }
    },
    async addCourse(item) {
      if (this.courseAdd.includes(item._id)) {
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
              id: this.$http.defaults.baseURL + `course/${item._id}/video`,
              display: {
                en_US: "open",
                zh_CN: "进入",
              },
            },
            object: {
              id: item._id,
              definition: {
                name: item.name,
                type: "Course",
                course: item._id,
              },
            },
            createdAt: new Date().toLocaleString("chinese", { hour12: false }),
          });
        }
        this.$router.push(`course/${item._id}/video`);
      } else if (item.createUser === this.$store.state.user._id) {
        this.$router.push(`course/${item._id}/video`);
      } else {
        this.showAddModal();
        this.nowItem = item;
      }
    },
    showAddModal() {
      this.visibleAdd = true;
    },
    async handleAddOk(e) {
      this.confirmLoadingAdd = true;
      await this.$http.post("add-course", {
        user: this.$store.state.user._id,
        course: this.nowItem._id,
        teacher: this.nowItem.createUser,
      });
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
            id: this.$http.defaults.baseURL + "/add-course",
            display: {
              en_US: "addCourse",
              zh_CN: "加入",
            },
          },
          object: {
            id: this.nowItem._id,
            definition: {
              name: this.nowItem.name,
              type: "Course",
              course: this.nowItem._id,
            },
          },
          createdAt: new Date().toLocaleString("chinese", { hour12: false }),
        });
      }
      this.visibleAdd = false;
      this.confirmLoadingAdd = false;
      this.fetchAddCourseList();
    },
    handleAddCancel(e) {
      console.log("Clicked cancel button");
      this.visibleAdd = false;
    },
  },
};
</script>
<style>
#fileimage {
  width: 128px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
