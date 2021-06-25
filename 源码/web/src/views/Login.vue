<template>
  <div>
    <a-card
      v-if="isLogin"
      title="请先登录"
      class="login-card"
      :headStyle="{ textAlign: 'center' }"
    >
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: '请输入用户名' }],
              },
            ]"
            placeholder="用户名"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码' }],
              },
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
          或
          <a @click.prevent="register"> 注册</a>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card
      v-else
      class="register-card"
      title="注册"
      :headStyle="{ textAlign: 'center' }"
    >
      <a-form-model
        class="register-form"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
      >
        <a-form-model-item has-feedback label="用户名" prop="userName">
          <a-input v-model="ruleForm.userName" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="真实姓名" prop="realName">
          <a-input v-model="ruleForm.realName" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="pass">
          <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="验证密码" prop="checkPass">
          <a-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submitForm('ruleForm')">
            提交
          </a-button>
          <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
            重置
          </a-button>
          <a-button style="margin-left: 10px" @click="isLogin = true">
            返回
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    let checkPending;
    let checkUserName = (rule, value, callback) => {
      clearTimeout(checkPending);
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      checkPending = setTimeout(async () => {
        const res = await this.$http.get(
          `users?username=${this.ruleForm.userName}`
        );
        console.log(res.data);
        if (res.data) {
          callback(new Error("用户名已存在"));
        } else {
          callback();
        }
      }, 1000);
    };
    let checkRealName = (rule, value, callback) => {
      /* clearTimeout(checkPending); */
      if (!value) {
        return callback(new Error("请输入真实姓名"));
      } else {
        callback();
      }
      /* checkPending = setTimeout(() => {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'));
          } else {
            callback();
          }
      }, 1000); */
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再此输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入不一致"));
      } else {
        callback();
      }
    };
    return {
      isLogin: true,
      ruleForm: {
        pass: "",
        checkPass: "",
        userName: "",
        realName: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        userName: [{ validator: checkUserName, trigger: "change" }],
        realName: [{ validator: checkRealName, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    register() {
      this.isLogin = false;
    },
    async submitregister() {},
    async login() {
      const userModel = {
        username: this.form.getFieldValue("userName"),
        password: this.form.getFieldValue("password"),
      };
      const res = await this.$http.post("/auth/login", userModel);
      this.$cookies.set("token", res.data.token);
      this.$router.push("/");
      this.$message.success("登录成功");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.login();
        } else {
          this.$message.success("用户不存在或密码错误");
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const userModel = {
            username: this.ruleForm.userName,
            password: this.ruleForm.pass,
            realname: this.ruleForm.realName,
            role: "student",
          };
          await this.$http.post("/auth/register", userModel);
          this.isLogin = true;
          this.$message.success("注册成功");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.login-card {
  width: 25rem;
  margin: 10rem auto;
}
.register-card {
  width: 25rem;
  margin: 10rem auto;
}
.register-form {
  min-width: 400px;
}
</style>