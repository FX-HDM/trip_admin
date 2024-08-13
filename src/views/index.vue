<template>
  <div class="index-container">


    <el-container>
      <el-header class="header">
        <img src="@/assets/logo.png" alt="" class="logo">
        <span style="font-size: 20px; margin-left: 15px; color: white">管理系统</span>
      </el-header>
    </el-container>

    <el-container>
      <el-aside class="navigation">
        <el-menu
            router
            :default-active="this.$router.path"
            class="menu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="/index/echarts">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i><span>用户管理</span>
            </template>
            <el-menu-item index="/index/user">用户信息</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i><span>优惠卷管理</span>
            </template>
            <el-menu-item index="/index/coupon">优惠卷</el-menu-item>
            <el-menu-item index="/index/combo">优惠卷套餐</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i><span>司机管理</span>
            </template>
            <el-menu-item index="/index/user_apply">司机审核</el-menu-item>
            <el-menu-item index="/index/complaint">用户投诉</el-menu-item>
            <el-menu-item index="/index/appeal">司机申诉</el-menu-item>
          </el-submenu>
        </el-menu>


      </el-aside>
      <el-main>
        <div style="font-size: 18px">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>


  </div>
</template>

<script>
export default {
  name: 'indexView',
  data () {
    return {

    }
  }
}
</script>

<style>
.index-container {
  height: 100%;
  background-color: white;
}
.header{
  background-color: deepskyblue;
}
.logo {
  width: 40px;
  position: relative;
  top: 10px;
}
.navigation {
  overflow: hidden;
  min-height: 100vh;
  background-color: #545c64;
  width: 250px
}
.menu {
  background-color: #545c64;
  text-color: blue;
  active-text-color: #ffd04b;
  border-right: none !important;
}

</style>