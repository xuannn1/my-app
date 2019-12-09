<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="menuTab in menuTabs"
          :key="menuTab.key"
          :class="{ current: menuTab.current }"
          @click="toggleMenu(menuTab)"
        >{{ menuTab.txt }}</li>
      </ul>
      <!-- 注册表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
        <el-form-item prop="phone" class="login-form-item">
          <label for="phone">手机号</label>
          <el-input id="phone" type="tel" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="login-form-item">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password2" class="login-form-item" v-if="currentTab === 'register'">
          <label for="password2">重复密码</label>
          <el-input
            id="password2"
            type="text"
            v-model="ruleForm.password2"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="login-form-item">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="14">
              <el-input id="code" v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" class="block" @click="getCode()">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            :disabled="loginBtn"
          >{{ currentTab === "login" ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSms } from "@/api/login.js";
import { reactive, ref, onMounted } from "@vue/composition-api";
import { filterStr, valiPhone, valiPass, valiCode } from "@/utils/validate.js";
export default {
  name: "login",
  setup(props, { refs, root }) {
    // 验证手机号
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机"));
      } else if (!valiPhone(value)) {
        callback(new Error("请输入有效的手机号"));
      } else {
        callback();
      }
    };
    // 验证密码
    let validatePass = (rule, value, callback) => {
      // 过滤特殊字符
      ruleForm.password = filterStr(value);
      value = ruleForm.password;

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!valiPass(value)) {
        callback(new Error("密码为6至20位的数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePass2 = (rule, value, callback) => {
      // 过滤特殊字符
      ruleForm.password2 = filterStr(value);
      value = ruleForm.password2;

      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      // 过滤特殊字符
      ruleForm.code = filterStr(value);
      value = ruleForm.code;

      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!valiCode(value)) {
        callback(new Error("验证码为6位的数字+字母"));
      } else {
        callback();
      }
    };
    /**
     * 声明数据
     */
    const menuTabs = reactive([
      { id: 0, txt: "登陆", current: true, type: "login" },
      { id: 1, txt: "注册", current: false, type: "register" }
    ]);
    const currentTab = ref("login");
    //登录按钮是否禁用
    const loginBtn = ref(true);
    // 表单数据
    const ruleForm = reactive({
      phone: "",
      password: "",
      password2: "",
      code: ""
    });
    // 表单的验证
    const rules = reactive({
      phone: [{ validator: validatePhone, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      password2: [{ validator: validatePass2, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    /**
     * 声明函数
     */
    // 切换tab
    const toggleMenu = data => {
      menuTabs.forEach(menuTab => {
        menuTab.current = false;
      });
      data.current = true;
      currentTab.value = data.type;
    };
    // 获取验证码
    const getCode = () => {
      if (!ruleForm.phone) {
        root.$message.error("手机号不可以为空");
        return false;
      }
      getSms(ruleForm.phone)
        .then(res => {
          console.log(res.data.captcha_image_content);
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 提交表单
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    onMounted(() => {});
    return {
      menuTabs,
      currentTab,
      loginBtn,
      ruleForm,
      rules,
      toggleMenu,
      getCode,
      submitForm
    };
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
