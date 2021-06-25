<template>
  <div class="coursewarePage">
    <p style="font-size: 25px; display: inline-block">课件</p>
    <a-button
      v-if="$store.state.user._id == courseRole.createUser"
      type="primary"
      style="float: right; margin-right: 40px"
      @click="showModal"
    >
      添加课件
    </a-button>
    <hr />
    <a-list class="coursewarePageList" size="large" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item, index">
        {{ item.name }}
        <a
          v-if="$store.state.user._id == courseRole.createUser"
          style="float: right"
          @click="deleteItem(item._id)"
          >删除</a
        >

        <a
          style="float: right; margin-right: 8px"
          @click="downloadFile(item.file, item.name, item._id)"
          >下载</a
        >
      </a-list-item>
    </a-list>
    <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleCreate"
      @cancel="handleCancel"
      :destroy-on-close="true"
    >
      <a-form layout="vertical" :form="form">
        <a-form-item label="课件名称">
          <a-input
            v-decorator="[
              'title',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
      </a-form>
      <a-upload
        name="file"
        :multiple="false"
        :action="$http.defaults.baseURL + '/upload'"
        @change="handleChange"
      >
        <a-button> <a-icon type="upload" /> 点击上传 </a-button>
      </a-upload>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    courseId: "",
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form_in_modal" });
  },
  created() {
    this.fetch();
    this.my();
  },
  data() {
    return {
      data: "",
      visible: false,
      confirmLoading: false,
      Courseware: {
        name: "",
        file: "",
        course: "",
        createUser: "",
      },
      courseRole: "",
    };
  },
  methods: {
    async my() {
      const res = await this.$http.get(`courses/${this.courseId}`);
      this.courseRole = res.data;
    },
    async downloadFile(url, filename, id) {
      var x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.responseType = "blob";
      x.onload = function (e) {
        //会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
        var url = window.URL.createObjectURL(x.response);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      };
      x.send();
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
            id: url,
            display: {
              en_US: "download",
              zh_CN: "下载",
            },
          },
          object: {
            id,
            definition: {
              name: filename,
              type: "Courseware",
              course: this.courseId,
            },
          },
          createdAt: new Date().toLocaleString(),
        });
      }
    },
    async deleteItem(id) {
      await this.$http.delete(`coursewares/${id}`);
      this.fetch();
    },
    async fetch() {
      const res = await this.$http.get("coursewares", {
        params: {
          query: {
            where: {
              course: this.courseId,
            },
            limit: 20,
          },
        },
      });
      this.data = res.data;
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.Courseware = {
        name: "",
        file: "",
        course: "",
        createUser: "",
      };
    },
    handleCreate() {
      this.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        this.Courseware.name = this.form.getFieldValue("title");
        await this.$http.post("/coursewares", this.Courseware);
        console.log("Received values of form: ", values);
        this.form.resetFields();
        this.visible = false;
        this.fetch();
      });
    },
    handleChange(info) {
      console.log(info);
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        this.Courseware.file = info.file.response.url;
        this.Courseware.course = this.courseId;
        this.Courseware.createUser = this.$store.state.user._id;
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>
<style scoped>
.coursewarePage {
  padding: 50px 0 0 70px;
}
.coursewarePageList {
  width: 1100px;
}
</style>
