<template>
    <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'hello' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div class="search-info">
        搜索条件
        <span class="el-icon-info"></span>
      </div>
      <div>
        <el-input style="width:300px" :clearable="true" @clear="getListProduct"  v-model="productb" placeholder="输入商品名查询"></el-input>
        <span>
            <el-button style="margin-left:50px" type="primary" @click="searchname()">搜索</el-button>
            <el-button style="margin-left:50px" type="primary" @click="sjsp()">上架商品</el-button>
        </span>
      </div>
    </el-card>

    <template>
    <el-table
      :data="productTable"
      border
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="productbrand"
        label="商品名">
      </el-table-column>
      <el-table-column
        prop="productprice"
        label="商品价格">
      </el-table-column>
      
      <el-table-column
        prop="productremarks"
        label="商品数量">
      </el-table-column>
     
      <el-table-column
        prop="productlevel"
        label="是否精选">
      <template slot-scope="sc">
        <div v-if="sc.row.productlevel == '1'" style="color:red">精选商品</div>
        <div v-if="sc.row.productlevel == '2'">普通商品</div>
        </template>
      </el-table-column>
       <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
           <el-button @click="Offshelf(scope.row.productid)" type="text" size="medium">下架</el-button>
           <el-button @click="modify(scope.row.productid)" type="text" size="medium">修改</el-button>
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

     
      <el-dialog
      title="修改商品信息"
      :visible.sync="DialogVisible"
      width="40%"
      >
      <el-form label-position="top" label-width="80px" :model="xgproduct">
        <el-form-item label="价格">
            <el-input v-model="xgproduct.productprice"></el-input>
        </el-form-item>
        <el-form-item label="数量">
            <el-input v-model="xgproduct.productremarks"></el-input>
        </el-form-item>
        <el-form-item :required = true label="是否精选(1为精选，2为普通)">
            <el-input v-model="xgproduct.productlevel"></el-input>
        </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qdxg" >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="上架商品"
      :visible.sync="sjDialogVisible"
      width="40%"
      >
      <el-form label-position="top" label-width="80px" :model="sjproduct">
        <el-form-item label="商品品牌">
            <el-input v-model="sjproduct.productname"></el-input>
        </el-form-item>
        <el-form-item label="商品名">
            <el-input v-model="sjproduct.productbrand"></el-input>
        </el-form-item>
         <el-form-item label="价格">
            <el-input v-model="sjproduct.productprice"></el-input>
        </el-form-item>
        <el-form-item label="数量">
            <el-input v-model="sjproduct.productremarks"></el-input>
        </el-form-item>
        <el-form-item :required = true label="是否精选(1为精选，2为普通)">
            <el-input v-model="sjproduct.productlevel"></el-input>
        </el-form-item>
        <el-form-item  label="商品描述">
            <el-input v-model="sjproduct.productdesc"></el-input>
        </el-form-item>
         <el-form-item  label="上传商品图片">
            <el-upload
                class="upload-demo"
                drag
                action="http://localhost:8081/product/uploadSp"
                accept=".jpg,.png"
                :on-success="addimg"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sjDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sjqd" :disabled="flag">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            flag:true,
            productb:'',
            search:'',
            productTable:[],
            pageinfo:{
                curpage:1,
                pagesize:5
            },
            total:0,
            DialogVisible:false,
            sjDialogVisible:false,
            xgproduct:{
                productid:'',
                productprice:'',
                productremarks:'',
                productlevel:'',
            },
            sjproduct:{
                productprice:'',
                productremarks:'',
                productlevel:'',
                productname:'',
                productbrand:'',
                productimg:'',
                productdesc:'',
            },
            product:{
                productid:'',
                productname:'',
                productprice:'',
                prodcutimg:'',
                productdesc:'',
                productbrand:'',
                productremarks:'',
                productlevel:''
            }
        }
    },
    created(){
        this.getListProduct()
        },
    methods:{
        getListProduct(){
            this.$http.get('http://localhost:8081/product/limitProduct',{
              params:{
                curpage:this.pageinfo.curpage,
                pagesize:this.pageinfo.pagesize
              },
            }).then(res=>{
              this.productTable = res.data;
            
          })
          this.$http.get('http://localhost:8081/product/count',{
            // headers:{
            //     Token:window.localStorage.getItem("token")
            //   }
          }).then(res=>{
              this.total=res.data
          }) 
        },
    Offshelf(val){
        this.$http.get("http://localhost:8081/product/deleteByid",{
            params:{
                productid:val
            }
        }).then(res=>{
            if(res.data == 1)
            this.$message.success("下架成功")
            this.getListProduct();
        })
    },
    modify(val){
        this.$http.post('http://localhost:8081/product/byone',{
        productbrand:val,
     }).then(res=>{
       this.xgproduct.productprice=res.data.productprice;
       this.xgproduct.productremarks=res.data.productremarks;
       this.xgproduct.productlevel=res.data.productlevel;
       this.xgproduct.productid=val;
     })
     this.DialogVisible = true;
    },
    addimg(response, file, fileList){
        this.sjproduct.productimg = response.filename;
        if(this.sjproduct.productimg!=null && this.sjproduct.productimg!=''){
          this.flag = false
        }
    },
    searchname(){
        this.$http.post('http://localhost:8081/product/bypb',{
        productbrand:this.productb,
     }).then(res=>{
       //console.log(res);
        console.log(res.data)
       this.productTable=res.data;
      // console.log(this.userTable)
     })
    },
    
    qdxg(){
        this.$http.post("http://localhost:8081/product/updatepb",{
            productprice:this.xgproduct.productprice,
            productremarks:this.xgproduct.productremarks,
            productlevel:this.xgproduct.productlevel,
            productid:this.xgproduct.productid
        }).then(res=>{
            if(res.data === 1){
                this.$message.success("修改成功");
                this.DialogVisible = false;
                this.getListProduct();
            }
        })
    },
    sjsp(){
        this.sjDialogVisible = true;
    },
    sjqd(){
        this.$http.post('http://localhost:8081/product/addproduct',this.sjproduct).then(res=>{
          if(res.data!=null&&res.data!=""){
            this.$message.success("上架商品成功")
            this.sjDialogVisible = false;
          }
        })
    },
   handleSizeChange(newsize){
      //console.log(newsize);
      this.pageinfo.pagesize=newsize
      this.getListProduct();
   },

   handleCurrentChange(newpage){
     //console.log(newpage)
     this.pageinfo.curpage=newpage
     this.getListProduct()
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
.button_operate{
  margin-left: 20px;
  margin-right: 20px;
}
</style>