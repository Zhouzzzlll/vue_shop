<template>
    <div>
        <el-card class="box-card">
            <div class="sp">{{des}}</div>
        </el-card>

        <el-card>
            <el-table :data="productList" stripe >
                <el-table-column type="index" label="ID"></el-table-column>
                <el-table-column prop="productbrand" label="商品"></el-table-column>
                <el-table-column prop="productnum" label="数量">
                    <template slot-scope="scope">
                    <el-input-number v-model="scope.row.productnum" @change="addnum(scope.row)" :min="1" :max="10" size="medical"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="productprice" label="单价"></el-table-column>
                <el-table-column prop="productprice" label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  size="small" @click="buyproduct(scope.row)">购买</el-button>
                        <el-button type="warning" size="small" @click="deleteproduct(scope.row.productbrand)">删除</el-button>
                        <el-button type="primary" size="small" @click="goto()">继续购物</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            des:'',
            productList:[],
            username:'',
            shopcart:{
                username:'',
                productnum:1,
                productprice:'',
                productimg:'',
                productbrand:''
            },
            Order:{
                productbrand:'',
                username:'',
                state:'1',
                productprice:'',
                num:0
            }
        }
    },
    mounted:function(){
        this.des="购物车空空如也~";
        this.getList();
    },
    methods:{
        getList(){
            this.username = localStorage.getItem("username");
                this.$http.get("http://localhost:8081/product/getshopcart/"+this.username).then(res=>{
                    if(res.data!==""){   
                    this.productList = res.data;
                    this.des="您的购物商品如下~";
                    if(this.productList=="")
                    this.des="购物车空空如也~";                    
                }
                    
                
        })
    },
        deleteproduct(id){
            this.$confirm('此操作将永久删除该用户？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {    
            this.$http.get("http://localhost:8081/product/deleteproduct/"+id).then(res=>{
                this.getList();
                
         })
       
             this.$message({
                type: 'success',
                message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
             });          
             });  
         },
       goto(){
           this.$router.push('/productall');
       },
       buyproduct(pd){
           this.Order.productbrand = pd.productbrand;
           this.Order.username = pd.username;
           this.Order.productprice = pd.productprice*pd.productnum;
           this.Order.num = pd.productnum;
           this.$http.post("http://localhost:8081/product/insertorder",this.Order).then(res=>{
               localStorage.setItem("buyone",pd.productbrand);
               this.$router.push('/pay');
               this.$http.post("http://localhost:8081/product/deletefromshop",this.Order).then(res=>{
               })
           })
       },
       addnum(pr){
        console.log(pr);
        // this.shopcart.productprice = (pr.productprice)*(pr.productnum);
        this.shopcart.productnum = pr.productnum;
        this.shopcart.productbrand = pr.productbrand;
        this.$http.post("http://localhost:8081/product/updateproduct",this.shopcart).then(res=>{
            if(res.data===1){
                this.getList();
            }
        })
    } 

    },
}
</script>
<style scoped>
.box-card{
    background-color: rgb(223, 240, 216);
    margin-bottom: 50px;
    
}
.sp{
    width: 100%;
    text-align: center;
    color: green;
    font-size: 24px;
    letter-spacing: 5px;
}
</style>