<template>
  <div style="padding: 50px 0 0 70px; width: 1100px">
    <a-form-model ref="form" :model="form">
      <div style="overflow: hidden">
        <p style="font-size: 16px; display: inline-block">选择题</p>
        <a-statistic-countdown
          title="考试倒计时"
          :value="Date.now() + 1000 * exam.time * 60 * 2"
          style="margin-right: 50px; float: right"
          @finish="onFinish()"
        />
      </div>
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
    examId: "",
    courseId: "",
  },
  created() {
    this.fetch();
  },
  data() {
    return {
      exam: {},
      form: {
        answer: {
          user: "",
          select: [],
          judgment: [],
          type: "Exam",
          object: this.examId,
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
    async onFinish() {
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
            id: this.exam._id,
            definition: {
              name: this.exam.title,
              type: "Exam",
              course: this.exam.course,
            },
          },
          result: {
            totalScore: res.data.totalScore,
            scored: res.data.scored,
            selectAnswer: this.form.answer.select,
            judgeAnswer: this.form.answer.judgment,
          },
          createdAt: new Date().toLocaleString(),
        });
      }
      this.$router.back();
    },
    async fetch() {
      const { data } = await this.$http.get(`exam/${this.examId}`,{
        params: {
          query: {
            populate: [
              { path: "selectQuestions", select: { trueItem: 0 } },
              { path: "judgmentQuestions", select: { answer: 0 } }
            ],
          },
        },
      });
      this.exam = data;
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
                id: this.exam._id,
                definition: {
                  name: this.exam.title,
                  type: "Exam",
                  course: `${this.exam.course}`,
                },
              },
              result: {
                totalScore: res.data.totalScore,
                scored: res.data.scored,
                selectAnswer: this.form.answer.select,
                judgeAnswer: this.form.answer.judgment,
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