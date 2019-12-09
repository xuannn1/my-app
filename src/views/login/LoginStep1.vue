<template>
  <div>
    <h1 class="center">登录体验更多功能</h1>
    <div>
      <el-input type="tel" v-model="phone" placeholder="手机号"></el-input>
    </div>
    <el-button type="primary" class="block login-btn">登录</el-button>
    <p class="info-center">未注册手机验证后自动登录</p>
  </div>
</template>

<script>
export default {
  name: "login1",
  data() {
    return {
      phone: ""
    };
  }
};
</script>

<style scoped>
</style>