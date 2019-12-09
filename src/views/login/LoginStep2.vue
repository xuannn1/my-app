<template>
  <div>
    <h1 class="center">需要身份认证</h1>

    <el-row>
      <el-col :span="12">
        <img src ref="code_img" />
      </el-col>
      <el-col :span="12">
        <el-input type="text" placeholder="请输入左侧验证码"></el-input>
      </el-col>
    </el-row>
    <el-button type="primary" class="block login-btn">验证</el-button>
    <el-link type="primary" class="info">看不清，换一张</el-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "login2",
  computed: {
    ...mapState(["veriCode"])
  },
  mounted() {
    this.$refs.code_img.src = this.veriCode;
  }
};
</script>

<style scoped>
.info {
  display: flex;
  margin: 16px 0;
  text-align: center;
}
</style>