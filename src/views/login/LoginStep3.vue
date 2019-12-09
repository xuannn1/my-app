<template>
  <div>
    <h1 class="center">输入验证码</h1>
    <p class="info-center">验证码已发送至 {{phoneNum}}</p>
    <div class="code-tabs">
      <div class="code-tab">
        <el-input></el-input>
      </div>
      <div class="code-tab">
        <el-input></el-input>
      </div>
      <div class="code-tab">
        <el-input></el-input>
      </div>
      <div class="code-tab">
        <el-input></el-input>
      </div>
    </div>
    <p class="info-center" v-if="!showCode">{{seconds}}秒后可重新获取</p>
    <el-link type="primary" class="info" v-if="showCode">重发短信验证码</el-link>
  </div>
</template>

<script>
export default {
  name: "login3",
  data() {
    return {
      phoneNum: "13312332123",
      code: "",
      seconds: 60,
      showCode: false
    };
  }
};
</script>

<style scoped>
.info {
  display: flex;
  margin: 16px 0;
  text-align: center;
}
.code-tabs {
  text-align: center;
}
.code-tab {
  display: inline-block;
  width: 36px;
  margin: 12px;
}
</style>