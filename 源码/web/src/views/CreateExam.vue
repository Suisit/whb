<template>
  <div style="padding: 50px 0 0 70px; width: 1100px">
    <a-form-model
      v-bind="formItemLayout"
      ref="dynamicValidateForm"
      :model="dynamicValidateForm"
    >
      <a-form-model-item
        label="标题"
        :prop="'exam.title'"
        :rules="{
          required: true,
          message: '标题不能为空',
          trigger: 'blur',
        }"
      >
        <a-input
          placeholder="请输入标题"
          v-model="dynamicValidateForm.exam.title"
        ></a-input>
      </a-form-model-item>
      <p style="font-size: 16px; display: inline-block">选择题</p>
      <hr />
      <div
        v-for="(domain, index) in dynamicValidateForm.selectQuestions"
        :key="index"
      >
        <a-form-model-item
          v-bind="index === 0 ? formItemLayout : {}"
          label="题干"
          :prop="'selectQuestions.' + index + '.title'"
          :rules="{
            required: true,
            message: '题干不能为空',
            trigger: 'blur',
          }"
        >
          <a-input
            v-model="domain.title"
            placeholder="请输入题干"
            style="width: 60%; margin-right: 8px"
          />
          <a-icon
            class="dynamic-delete-button"
            type="minus-circle-o"
            @click="removeDomain(domain)"
          />
        </a-form-model-item>
        <a-form-model-item
          label="A"
          :prop="'selectQuestions.' + index + '.selectItem[0]'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <a-input
            placeholder="选项A内容"
            class="select-item"
            v-model="domain.selectItem[0]"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item
          label="B"
          :prop="'selectQuestions.' + index + '.selectItem[1]'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <a-input
            placeholder="选项B内容"
            class="select-item"
            v-model="domain.selectItem[1]"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item
          label="C"
          :prop="'selectQuestions.' + index + '.selectItem[2]'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <a-input
            placeholder="选项C内容"
            class="select-item"
            v-model="domain.selectItem[2]"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item
          label="D"
          :prop="'selectQuestions.' + index + '.selectItem[3]'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <a-input
            placeholder="选项D内容"
            class="select-item"
            v-model="domain.selectItem[3]"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item
          label="正确答案"
          :prop="'selectQuestions.' + index + '.trueItem'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <a-radio-group buttonStyle="solid" v-model="domain.trueItem">
            <a-radio-button value="A"> A </a-radio-button>
            <a-radio-button value="B"> B </a-radio-button>
            <a-radio-button value="C"> C </a-radio-button>
            <a-radio-button value="D"> D </a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
          label="分值"
          :prop="'selectQuestions.' + index + '.score'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <a-input-number id="inputNumber" :min="0" v-model="domain.score" />
        </a-form-model-item>
      </div>
      <a-form-model-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="addDomain">
          <a-icon type="plus" /> 添加
        </a-button>
      </a-form-model-item>
      <p style="font-size: 16px; display: inline-block">判断题</p>
      <hr />
      <div
        v-for="(domain, index) in dynamicValidateForm.judgmentQuestions"
        :key="index + 'judgmentQuestions'"
      >
        <a-form-model-item
          v-bind="index === 0 ? formItemLayout : {}"
          label="题干"
          :prop="'judgmentQuestions.' + index + '.title'"
          :rules="{
            required: true,
            message: '题干不能为空',
            trigger: 'blur',
          }"
        >
          <a-input
            v-model="domain.title"
            placeholder="请输入题干"
            style="width: 60%; margin-right: 8px"
          />
          <a-icon
            class="dynamic-delete-button"
            type="minus-circle-o"
            @click="removeDomainjudgment(domain)"
          />
        </a-form-model-item>
        <a-form-model-item
          label="正确答案"
          :prop="'judgmentQuestions.' + index + '.answer'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <a-radio-group buttonStyle="solid" v-model="domain.answer">
            <a-radio-button value="true"> 对 </a-radio-button>
            <a-radio-button value="false"> 错 </a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
          label="分值"
          :prop="'judgmentQuestions.' + index + '.score'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <a-input-number id="inputNumber" :min="0" v-model="domain.score" />
        </a-form-model-item>
      </div>
      <a-form-model-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="addjudgmentQuestion">
          <a-icon type="plus" /> 添加
        </a-button>
      </a-form-model-item>
      <hr />
      <a-form-model-item v-bind="formItemLayoutWithOutLabel">
        <a-button
          type="primary"
          html-type="submit"
          @click="submitForm('dynamicValidateForm')"
        >
          提交
        </a-button>
        <a-button
          style="margin-left: 10px"
          @click="resetForm('dynamicValidateForm')"
        >
          重置
        </a-button>
        <div style="float: right; margin-right: 20px; font-size: 20px">
          <span>总分: </span><span style="color: red">{{ addtotalScore }}</span>
        </div>
      </a-form-model-item>
      <a-form-model-item
        label="正确答案"
        :prop="'exam.time'"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }"
      >
        <a-input-number
          id="time"
          :min="0"
          v-model="dynamicValidateForm.exam.time"
        /><span>分钟</span
        ><a-alert
          type="error"
          message="请设置考试时长"
          banner
          v-show="dynamicValidateForm.exam.time <= 0"
        />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  props: {
    courseId: "",
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
      dynamicValidateForm: {
        exam: {
          title: "",
          totalScore: new Number(),
          course: this.courseId,
          time: new Number(),
        },
        selectQuestions: [],
        judgmentQuestions: [],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.dynamicValidateForm.exam.totalScore = this.addtotalScore;
      this.$refs[formName].validate(async (valid) => {
        if (valid && this.dynamicValidateForm.exam.time > 0) {
          const { data } = await this.$http.post(
            "exam",
            this.dynamicValidateForm.exam
          );
          for (let i of this.dynamicValidateForm.selectQuestions) {
            i.object = data._id;
          }
          for (let i of this.dynamicValidateForm.judgmentQuestions) {
            i.object = data._id;
          }
          await this.$http.post(
            "select-questions",
            this.dynamicValidateForm.selectQuestions
          );
          await this.$http.post(
            "judgment-questions",
            this.dynamicValidateForm.judgmentQuestions
          );
          this.$router.back();
        } else {
          console.log("error submit!!");
          console.log(this.dynamicValidateForm.exam);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.selectQuestions.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.selectQuestions.splice(index, 1);
      }
    },
    removeDomainjudgment(item) {
      let index = this.dynamicValidateForm.judgmentQuestions.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.judgmentQuestions.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.selectQuestions.push({
        title: "",
        selectItem: [4].fill(""),
        trueItem: "",
        score: new Number(),
        type: "Exam",
        object: "",
      });
    },
    addjudgmentQuestion() {
      this.dynamicValidateForm.judgmentQuestions.push({
        title: "",
        answer: new Boolean(),
        score: new Number(),
        type: "Exam",
        object: "",
      });
    },
  },
  computed: {
    addtotalScore: function () {
      let sum = 0;
      for (let i of this.dynamicValidateForm.selectQuestions) {
        sum += i.score;
      }
      for (let i of this.dynamicValidateForm.judgmentQuestions) {
        sum += i.score;
      }
      return sum;
    },
  },
};
</script>
<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.select-item {
  width: 40%;
}
</style>
