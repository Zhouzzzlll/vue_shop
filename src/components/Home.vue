<template>
  <el-container class="container-home">
    <el-header style="height:100px;">
      <div>
        <img src="../assets/5.png" />
        <span style="padding-left:10px;">后台管理系统</span>
      </div>
      <el-tooltip effect="dark" :content="'欢迎你，'+this.name" placement="top">
      <el-button>{{this.name}}</el-button>
    </el-tooltip>
      <el-button  @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="230px">
        <el-menu 
          class="el-menu-vertical-demo"
          background-color="#F7F7F7"
          text-color="#000000"
          active-text-color="red"
          :unique-opened="true"
          :router="true"
          :default-active="activeNav"
        >
         <!-- 一级菜单 -->
          <el-submenu index="1">
              <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span class="font">插件</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+'watermark'" @click="activeStatus('/'+'watermark')">
                 <template slot="title">
              <span class="font">视频去水印</span>
            </template>
            </el-menu-item>
            <el-menu-item index="1-2">
                 <template slot="">
              <span class="font">订单分析</span>
            </template>
            </el-menu-item>
          </el-submenu>

          <!-- 一级菜单 -->
          <el-submenu index="2">
              <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span class="font">管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+'users'" @click="activeStatus('/'+'users')">
                 <template slot="title">
              <span class="font">用户管理</span>
            </template>
            </el-menu-item>

           
             <el-menu-item :index="'/'+'product'" @click="activeStatus('/'+'product')">
                 <template slot="title">
                    <span class="font">商品管理</span>
                 </template>
            </el-menu-item>

             <el-menu-item :index="'/'+'order'" @click="activeStatus('/'+'order')">
                 <template slot="title">
                    <span class="font">订单管理</span>
                 </template>
            </el-menu-item>
            
          </el-submenu>

        </el-menu>
        
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
       activeNav:'',
       name:window.localStorage.getItem("username"),
       p:'231231'
    }
  },

  methods: {
    loginOut() {
      window.localStorage.clear();
      this.$router.push("/login");
    },
    activeStatus(ac){
        this.activeNav=ac
    }
  }
};
</script>

<style scoped>
.container-home {
  height: 100%;
}
.el-header {
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: pink;
  font-family: 微软雅黑;
  font-size: 32px;
  letter-spacing: 12px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-aside {
  background-color: #f7f7f7;
}
.el-button{
    background: #f7f7f7;
}
.font{
    font-size: 20px;
}
.el-submenu{
    border-bottom:1px solid #E0E0E0;
    padding-bottom: 20px;
}
</style>