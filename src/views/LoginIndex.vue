<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="menuTab in menuTabs"
          :key="menuTab.key"
          :class="{ current: menuTab.current }"
          @click="toggleMenu(menuTab)"
        >
          {{ menuTab.txt }}
        </li>
      </ul>
      <!-- 注册表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
      >
        <el-form-item prop="email" class="login-form-item">
          <label>邮箱</label>
          <el-input
            type="email"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="login-form-item">
          <label>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="password2"
          class="login-form-item"
          v-if="currentTab === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password2"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="login-form-item">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="14">
              <el-input
                v-model.number="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { filterStr, valiEmail, valiPass, valiCode } from "@/utils/validate.js";
export default {
  name: "login",
  data() {
    // 验证邮箱
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!valiEmail(value)) {
        callback(new Error("请输入有效的邮箱地址"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePass = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.password = filterStr(value);
      value = this.ruleForm.password;

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!valiPass(value)) {
        callback(new Error("密码为6至20位的数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    var validatePass2 = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.password2 = filterStr(value);
      value = this.ruleForm.password2;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var validateCode = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.code = filterStr(value);
      value = this.ruleForm.code;

      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!valiCode(value)) {
        callback(new Error("验证码为6位的数字+字母"));
      } else {
        callback();
      }
    };

    return {
      menuTabs: [
        { id: 0, txt: "登陆", current: true, type: "login" },
        { id: 1, txt: "注册", current: false, type: "register" }
      ],
      currentTab: "login",
      // 表单数据
      ruleForm: {
        email: "",
        password: "",
        password2: "",
        code: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },

  methods: {
    toggleMenu(data) {
      this.menuTabs.forEach(menuTab => {
        menuTab.current = false;
      });
      data.current = true;
      this.currentTab = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #344a5f;
  height: 100vh;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .login-form-item {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
