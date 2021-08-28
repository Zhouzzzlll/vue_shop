<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'hello' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div class="search-info">
        搜索条件
        <span class="el-icon-info"></span>
      </div>
      <div>
        <el-input style="width:300px" :clearable="true" @clear="getListUser" v-model="phone" placeholder="输入手机号查询"></el-input>
        <span>
            <el-button style="margin-left:50px" type="primary" @click="searchPhone()">搜索</el-button>
        </span>
      <el-dialog
          title="充值金额"
          :visible.sync="AddMoneyVisible"
          width="30%"
          >
        <el-input v-model="addFrom.collect" placeholder="输入增加的金额" />
        <el-button style="margin-top:10px" type="primary" @click="add()">增加</el-button>
      </el-dialog>
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
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <!-- <el-table-column
        prop="status"
        label="状态">
      <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
      </el-table-column> -->
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
           <el-button @click="addmoney(scope.row.userid)" type="text" size="medium">充值</el-button>
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
      value:"state",
      tokeninfo:'',
      token:'',
      pageinfo:{
        curpage:1,
        pagesize:8
      },
      total:0,
      phone:'',
      userTable:[],
      values:true,
      AddMoneyVisible:false,

      addFrom:{
        userid:'',
        username:'',
        sex:'',
        addr:'',
        phone:'',
        collect:''
      },
      Origcollect:'',
      rules: {
          collect: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
            
          ],
      },
     
    };
  },
  created(){
     this.getListUser()
  },
  methods:{
   
    getListUser(){
            this.$http.get('http://localhost:8081/account/limitUser',{
              params:{
                curpage:this.pageinfo.curpage,
                pagesize:this.pageinfo.pagesize
              },
              // headers:{
              //   Token:window.localStorage.getItem("token")
              // }
            }).then(res=>{
              console.log(res.data)
            this.userTable=res.data
          })
          this.$http.get('http://localhost:8081/account/count',{
          
          }).then(res=>{
              console.log(res)
              this.total=res.data
          })
          
    },
    
        
   searchPhone(){
     this.$http.post('http://localhost:8081/account/byPhone',{
       phone:this.phone,
     }).then(res=>{
       //console.log(res);
      console.log(res.data)
       this.userTable=res.data;
      // console.log(this.userTable)
     })
    },
    //清空表单
   AddUserFormVisibleCLosed(){
      this.$refs.ruleFormRef.resetFields()
   },
   

  
  addmoney(val){
    this.AddMoneyVisible=true;
    this.addFrom.userid = val;
    
  },
  add(){
    this.$http.get('http://localhost:8081/admin/findcollect/'+this.addFrom.userid).then(res=>{
         var a  = parseInt(res.data);
         var b  = parseInt(this.addFrom.collect)
         this.addFrom.collect = a + b;
        this.$http.post('http://localhost:8081/admin/addmoney',this.addFrom).then(res=>{
          if(res.data!=''){
            this.$message.success('充值成功')
            this.Origcollect='';
            this.addFrom.collect = '';
          }
        this.AddMoneyVisible=false;
    })
    })
    
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