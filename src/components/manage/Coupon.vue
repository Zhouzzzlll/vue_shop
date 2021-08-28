<template>
    <div>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'hello' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>卡券管理</el-breadcrumb-item>
      <el-breadcrumb-item>卡券张数</el-breadcrumb-item>
     </el-breadcrumb>

    <el-card>
      <div class="search-info">
        搜索条件
        <span class="el-icon-info"></span>
      </div>
      <div>
        <el-input style="width:300px" v-model="search" placeholder="输入手机号查询"></el-input>
        <span>
            <el-button style="margin-left:100px" type="primary">搜索</el-button>
        </span>
      </div>
    </el-card>

    </div>
</template>

<script>
export default {
    data(){
        return{
            search:'',
        }
    }
    
}
</script>


<style scoped>
  .el-card{
  margin-top: 50px;
}
.search-info {
  padding: 0 10px 10px;
}
.el-table{
  margin-top: 50px;
}
</style>