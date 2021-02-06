<template>
  <div class="background">
    <div class="login-wrap">
      <div class="ms-title">登录管理系统</div>
      <div class="ms-login">
        <el-form :model="ruleForm" class="demo-ruleForm">
          <div v-if="!errorInfo">
            <span class="msg">{{ message }}</span>
          </div>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.password"
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item  prop="validate">
                    <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码" ></el-input>
                    <div class="code" @click="refreshCode">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-form-item> -->
          <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
          </div>
          <p class="register">注册</p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
import axios from "axios";
export default {
  data() {
    return {
      Info: true,
      message: "",
      ruleForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm: async function() {
      if (this.ruleForm.username == "" || this.ruleForm.password == "") {
        this.errorInfo = true;
        this.message = "账号或密码不能为空";
      } else {
        console.log("登陆啦");
        let res = await axios.post(api.login, {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
        });
        console.log(res)
        var info = res.data;
        console.log(info)
        if (!info.flag) {
          this.errorInfo = info.flag;
          this.message = info.message;
          
        }else{
          localStorage.setItem('name',info.user.realname);
          localStorage.setItem('competence',info.user.competence);
          this.$router.push({path:'/index'});
        }
      }
    },
  },
};
</script>
<style lang="less">
//相当于给body设置样式
.background {
  background-image: url(../assets/img/login.jpg);
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 1%;
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 590px;
  top: 223px;
  width: 300px;
  height: 240px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
  .msg {
    color: red;
  }
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.register {
  font-size: 14px;
  line-height: 30px;
  color: #999;
  cursor: pointer;
  float: right;
}
</style>
