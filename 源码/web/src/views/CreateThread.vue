 <template>
  <div style="padding: 50px 0 0 70px">
    <a-page-header
      title="返回"
      @back="$router.push(`/course/${courseId}/debate`)"
    />
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="主题"
      >
        <a-input
          v-decorator="[
            'theme',
            { rules: [{ required: true, message: '请输入主题' }] },
          ]"
          placeholder="主题内容"
        />
      </a-form-item>
      <vue-editor v-model="thread.content" />
      <a-button style="margin-top: 20px" type="primary" @click="submit">
        提交
      </a-button>
    </a-form>
  </div>
</template>
 <script>
import { VueEditor } from "vue2-editor";
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
export default {
  components: {
    VueEditor,
  },
  props: {
    courseId: "",
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_rule" });
  },
  data() {
    return {
      formItemLayout,
      formTailLayout,
      thread: {
        title: "",
        content: "",
        type: "Course",
        object: this.courseId,
      },
    };
  },
  methods: {
    submit() {
      this.form.validateFields(async (err) => {
        if (!err) {
          this.thread.title = this.form.getFieldValue("theme");
          const res = await this.$http.post("threads", this.thread);
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
                id: this.$http.defaults.baseURL + "/threads",
                display: {
                  en_US: "createThread",
                  zh_CN: "创建",
                },
              },
              object: {
                id: res.data,
                definition: {
                  name: this.thread.title,
                  description: this.thread.content,
                  type: "Thread",
                  course: this.courseId,
                },
              },
              createdAt: new Date().toLocaleString("chinese", {
                hour12: false,
              }),
            });
          }
          this.$router.push(`/course/${this.courseId}/debate`);
          console.info("success");
        }
      });
    },
  },
};
</script>