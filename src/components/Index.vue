<template>
    <el-container class="container-home">
    
        <el-header style="height:100px">
       <div class="top-1">
           <template v-if="csuser !== ''&&csuser!==null">
            <el-dropdown @command="handleCommand" style="float:right;margin:0 20px 0 10px" trigger="click">
                <span class="el-dropdown-link">
                你好，{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">我的账号</el-dropdown-item>
                    <!-- <el-dropdown-item command="b">修改密码</el-dropdown-item> -->
                    <el-dropdown-item command="c">我的订单</el-dropdown-item>
                    <el-dropdown-item command="d" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
           </template>
           <template v-else>
               <el-link style="float:right;margin:0 20px 0 10px" href="login" :disabled= 'ban' type="info">你好,{{username}}</el-link>
           </template>
          <!-- <el-link style="float:right;margin:0 20px 0 10px" href="login" :disabled= 'ban' type="info">你好,{{username}}</el-link> -->
          <el-link style="float:right;margin-left: 10px" href="shopcart" type="info">购物车</el-link>
          <el-link style="float:right;margin-left: 10px" type="info">商务合作</el-link>
          <el-link style="float:right;margin-left: 10px" type="info">会员服务</el-link>
          <el-link style="float:right;margin-left: 10px" href="productall" type="info">所有商品</el-link>
          <el-link style="float:right;margin-left: 10px" href="index" type="info">首页</el-link>
        </div>
        
        </el-header>
         
        <el-main>
          <router-view></router-view>
       </el-main>
        

    
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            csuser:'',
            username:'请登录',
            ban:false,
            Search:''
            
        }
    },
    methods:{
        handleCommand(command){
            if(command=="d"){
               localStorage.removeItem("username");
               localStorage.removeItem("flag");
               localStorage.removeItem("token");
               this.$router.push('/login') 
            }else if(command=="a"){
                this.$router.push('/zhangh')
            }else if(command=="c"){
                this.$http.get("http://localhost:8081/product/findOrder").then(res=>{
                    localStorage.setItem("buyone",res.data.productbrand);
                    this.$router.push('/pay')
                })
            }
            
        }
    },
    mounted:function(){
       var _this = this
       if(localStorage.getItem("username")!==null && localStorage.getItem("username")!==''){
           _this.username = localStorage.getItem("username");
           _this.ban = true
       }
       _this.csuser = localStorage.getItem("username");
    } 
    
}
</script>

<style scoped>
 .container-home {
  height: 100%;
  flex-direction:column
}
.top{

    height: 100px;
    width: 100%;
}
.top-1{
    height: 60px;
    width: 100%;
    background-color: rgb(228, 218, 218);
    font-size: 8px;
    line-height: 60px;
}

.search{
    height: 100px;
    width: 100%;
    
}

</style>