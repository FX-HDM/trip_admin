<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">管理系统登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="20">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.account" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import $axios from "axios";
import json from "@/api/url.json";
export default {
  name: 'LoginView',
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码!', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      $axios.post(json.serviceUrl.login.login,this.loginForm).then(res=>{
        if(res.data.code===200){
          window.sessionStorage.setItem('token',res.data.token);
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          this.$router.push('/index');
        }else{
          this.$message({
            message: '登录失败',
            type: 'error'
          });
        }
      })
    }
  }
}
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../img/background.jpg');
  background-size: cover;
}
.login-card {
  width: 400px;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>