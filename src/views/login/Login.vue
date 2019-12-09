<template>
  <div>
    <div class="icon-wrap">
      <i class="el-icon-close"></i>
      <i @click="stepNum = 1">100</i>
      <i @click="stepNum = 2">200</i>
      <i @click="stepNum = 3">300</i>
    </div>
    <div class="login-step">
      <login-step1 v-if="stepNum === 1" />
      <login-step2 v-if="stepNum === 2" />
      <login-step3 v-if="stepNum === 3" />
    </div>
    <!-- <login-step2 /> -->
    <div class="login-tool-bar">
      <el-steps :active="2" align-center>
        <el-step title="步骤1"></el-step>
        <el-step title="步骤2"></el-step>
        <el-step title="步骤3"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
import LoginStep1 from "./LoginStep1.vue";
import LoginStep2 from "./LoginStep2.vue";
import LoginStep3 from "./LoginStep3.vue";
export default {
  name: "login",

  components: {
    LoginStep1,
    LoginStep2,
    LoginStep3
  },

  data() {
    return {
      stepNum: 1
    };
  }
};
</script>

<style>
.login-step {
  margin: 0 24px;
}
.login-tool-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.login-btn {
  margin-top: 30px;
}
</style>
