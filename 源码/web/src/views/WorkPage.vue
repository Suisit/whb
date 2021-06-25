<template>
  <div style="padding: 50px 0 0 70px; width: 1100px">
    <a-form-model ref="form" :model="form">
      <p style="font-size: 16px; display: inline-block">选择题</p>
      <hr />
      <a-list>
        <a-list-item v-for="(item, index) in form.selectQuestions" :key="index">
          <a-form-model-item
            :prop="'answer.select.' + index"
            :rules="{
              required: true,
              message: '请填写答案',
              trigger: 'blur',
            }"
          >
            <select-question
              v-model="form.answer.select[index]"
              :selectItem="item.selectItem"
              :title="item.title"
              :index="index"
              :score="item.score"
            ></select-question>
          </a-form-model-item>
        </a-list-item>
      </a-list>
      <p style="font-size: 16px; display: inline-block">判断题</p>
      <hr />
      <a-list>
        <a-list-item
          v-for="(item, index) in form.judgmentQuestions"
          :key="index"
        >
          <a-form-model-item
            :prop="'answer.judgment.' + index"
            :rules="{
              required: true,
              message: '请填写答案',
              trigger: 'blur',
            }"
          >
            <judgment-queetion
              v-model="form.answer.judgment[index]"
              :title="item.title"
              :index="index"
              :score="item.score"
            ></judgment-queetion>
          </a-form-model-item>
        </a-list-item>
      </a-list>
      <a-form-model-item>
        <a-button type="primary" html-type="submit" @click="submitForm('form')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('form')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import SelectQuestion from "../components/SelectQuestion.vue";
import JudgmentQueetion from "../components/JudgmentQuestion.vue";
export default {
  components: {
    SelectQuestion,
    JudgmentQueetion,
  },
  props: {
    workId: "",
    courseId: "",
  },
  created() {
    this.fetch();
  },
  data() {
    return {
      work: {},
      form: {
        answer: {
          user: "",
          select: [],
          judgment: [],
          type: "Work",
          object: this.workId,
          userScore: 0,
          totalScore: 0,
          course: this.courseId,
        },
        selectQuestions: [],
        judgmentQuestions: [],
      },
    };
  },
  methods: {
    async fetch() {
      const { data } = await this.$http.get(`works/${this.workId}`, {
        params: {
          query: {
            populate: [
              { path: "selectQuestions", select: { trueItem: 0 } },
              { path: "judgmentQuestions", select: { answer: 0 } }
            ],
          },
        },
      });
      console.log(data);
      this.work = data;
      (this.form.selectQuestions = data.selectQuestions),
        (this.form.judgmentQuestions = data.judgmentQuestions);
      this.form.answer.totalScore = data.totalScore;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post("answer", this.form.answer);
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
                id: this.$http.defaults.baseURL + "/answer",
                display: {
                  en_US: "answer",
                  zh_CN: "完成",
                },
              },
              object: {
                id: this.work._id,
                definition: {
                  name: this.work.title,
                  type: "Work",
                  course: this.work.course,
                },
              },
              result: {
                totalScore: res.data.totalScore,
                scored: res.data.scored,
              },
              createdAt: new Date().toLocaleString("chinese", {
                hour12: false,
              }),
            });
          }
          this.$router.back();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>