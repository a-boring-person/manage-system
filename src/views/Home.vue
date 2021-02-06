<template>
    <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i
          @click="isCollapse = !isCollapse"
          style="font-size: 20px;"
          class="el-icon-s-fold"
        ></i>
        <img :src="shangbiao" class="marginlr" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="touxiang" alt="" />
        <span class="name">{{name}} 欢迎您</span>
        <span class="name">{{competence}}</span>
        <el-button @click="logout" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
      <!-- router是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu 
          router 
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <!-- <el-menu-item
            v-for="item in $router.options.routes[2].children"
            :key="item.path"
            :index="item.meta.fullPath"
            v-show="item.meta.roles.includes($store.getters.getUserInfo.role)"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item> -->

          
         <el-menu-item index="/index">
            <i class="el-icon-date"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          
          <el-menu-item index="/userlist">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
         
        </el-menu>
      </el-aside>
      <el-main style="background-color:#e8e9ec;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      touxiang:require('../assets/img/touxiang.jpg'),
      shangbiao:require('../assets/img/layout_icon.png'),
      isCollapse: false,
      defaultActive:'',
      name:'',
      competence:''

    }
  },
  mounted() {
    this.defaultActive = '/index';
    this.name = localStorage.getItem('name');
    this.competence = localStorage.getItem('competence');
  },
  methods: {
    logout:function() {
      console.log("我退出了");
    }
  },

};
</script>
<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    .left {
      display: flex;
      align-items: center;
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
    }
  }
  .el-menu {
    border-right: solid 0px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
