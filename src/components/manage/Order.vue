<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'hello' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="search-info">
        搜索条件
        <span class="el-icon-info"></span>
      </div>
      <div>
        <el-input style="width:300px" :clearable="true" @clear="getListUser" v-model="uname" placeholder="输入用户名查询"></el-input>
        <span>
            <el-button style="margin-left:50px" type="primary" @click="searchname()">搜索</el-button>
        </span>
      </div>
    </el-card>
    <template>
    <el-table
      :data="userTable"
      border
      style="width: 100%">
      <!--<el-table-column prop="account_id" label="id" width="50px"></el-table-column>-->
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="productbrand"
        label="购买商品">
      </el-table-column>
      <el-table-column
        prop="productprice"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量">
      </el-table-column>
     
      <el-table-column
        prop="state"
        label="状态">
         <template slot-scope="sc">
        <div v-if="sc.row.state == '1'">未付款</div>
        <div v-if="sc.row.state == '2'">已付款，未发货</div>
        <div v-if="sc.row.state == '3'">已发货</div> 
        </template>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
           <el-button @click="shipments(scope.row.orderid)" type="text" size="medium" v-if="scope.row.state=='2'">发货</el-button>
           <el-button @click="shipments(scope.row.orderid)" type="text" size="medium" disabled v-if="scope.row.state!='2'">发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageinfo.curpage"
      :page-sizes="[2, 5, 8, 10]"
      :page-size="pageinfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>

  </template>

  
  </div>
</template>

<script>
export default {
  data() {
    return {
      tokeninfo:'',
      token:'',
      pageinfo:{
        curpage:1,
        pagesize:5
      },
      total:0,
      uname:'',
      userTable:[],
      values:true,
      order:{
        orderid:'',
        productbrand:'',
        username:'',
        state:'',
        productprice:'',
        num:''
      },
      rules: {
          account_name: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
            
          ],
          account_phone:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度为11个数字', trigger: 'blur' }
          ],

          account_sex:[
            { required: true, message: '请输入性别', trigger: 'blur' },
            { min: 1, max: 1, message: '请输入一个字符', trigger: 'blur' }
          ],

      },
      updateForm:{

      },
     
    };
  },
  created(){
     this.getListUser()
  },
  methods:{
    getListUser(){
            this.$http.get('http://localhost:8081/admin/limitorder',{
              params:{
                curpage:this.pageinfo.curpage,
                pagesize:this.pageinfo.pagesize
              },
            }).then(res=>{
              console.log(res.data)
              this.userTable = res.data;
            
          })
          this.$http.get('http://localhost:8081/admin/count',{
            // headers:{
            //     Token:window.localStorage.getItem("token")
            //   }
          }).then(res=>{
              this.total=res.data
          })  
    },
    shipments(val){
       this.$http.get('http://localhost:8081/admin/updateOrder/'+val).then(res=>{
         if(res.data==1){
           return this.$message.success('发货成功！'); 
         }
       })
    },
        
    searchname(){
      this.$http.get('http://localhost:8081/admin/mhusername/'+this.uname).then(res=>{
            if(res.data != null){
                 this.userTable = res.data;
            }
      })
    },
    //清空表单
   AddUserFormVisibleCLosed(){
      this.$refs.ruleFormRef.resetFields()
   },
   
   handleSizeChange(newsize){
      //console.log(newsize);
      this.pageinfo.pagesize=newsize
      this.getListUser();
   },

   handleCurrentChange(newpage){
     //console.log(newpage)
     this.pageinfo.curpage=newpage
     this.getListUser()
   }
   
  }
};
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
.button_operate{
  margin-left: 20px;
  margin-right: 20px;
}
</style>