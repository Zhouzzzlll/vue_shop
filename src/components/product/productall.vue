<template>
    <div>
        <div class="title-head">
            <div class="search">
            <el-input  class="inp" type="text" placeholder="请输入商品名称"  v-model="find"/><el-button @click="search(find)" class="search_btn">搜索</el-button>
            </div>
            <ul>
                <li class="li-img" v-for="product in products" :key="product">
                    <div class="gl-item">
                      <div class="p-img">
                        <a target="好东西啊" @click="detail(product)" href="detail">
                            <img :src="require('../../assets/'+product.productimg)">
                        </a>
                        <div class="p-price">
                            <em>￥</em>
                            <i>{{ product.productprice }}</i>
                        </div>
                        <div class="p-desc"><em>{{product.productdesc}}</em></div>
                        <div><a class="p-operate" @click="addcart(product)">加入购物车</a></div>
                      </div>
                    </div>
                   
                </li>
              
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            find:'',
            products:[
                
                {
                    productname:'',
                    productprice:'',
                    productimg:'',
                    productdesc:'',
                    productbrand:'',
                    productremarks:''
                }
            ],
            shopcart:{
                username:'',
                productnum:1,
                productprice:'',
                productimg:'',
                productbrand:''
            }
            
        }
    },
    methods:{
        detail:function(re){
            localStorage.setItem("productN",JSON.stringify(re))
        },
        addcart:function(data){
            this.shopcart.username = localStorage.getItem("username");
            this.shopcart.productprice = data.productprice;
            this.shopcart.productimg = data.productimg;
            this.shopcart.productbrand = data.productbrand;
             this.$http.get("http://localhost:8081/product/repeat/"+this.shopcart.username+"/"+this.shopcart.productbrand).then(res=>{
               if(res.data!==null && res.data!==''){
                   alert("您的购物车中已经存在了");
               }else{
                this.$http.post("http://localhost:8081/product/shopcartList",this.shopcart).then(res=>{
                if(res.data!=null){
                   alert('成功添加到购物车！！')
                }
            }) 
               }
           }) 
        },
        search(val){
            this.$http.get("http://localhost:8081/product/productBybrand",{
                params:{
                    productbrand:val
                }
            }).then(res=>{
                if(res.data!=null&&res.data!=''){
                    this.products = res.data;
                }
            })
        }
    },
     mounted:function(){
       var _this = this
       if(localStorage.getItem("username")!==null && localStorage.getItem("username")!==''){
           _this.username = localStorage.getItem("username");
       }
           
            this.$http.get("http://localhost:8081/product/productList").then(res=>{
                if(res.data!=null){
                    _this.products = res.data;
                }
            })
        }
}
</script>

<style scoped>
.search_btn{    
    width: 100px;
    height: 40px;
    color: #FFFFFF;
    border-radius: 0 5px 5px 0;
    font-weight: 900;
    background: #3388FF;
    border:none;

}
.inp{
    width: 500px;
    margin-left:440px;
    
}
.title-head{
    width: 90%;
    margin: 0 auto;
}
ul{
    list-style-type:none;
    margin: 0;
    padding: 0  !important;
    display: flex;
    flex-wrap: wrap;

}
.li-img{
    height: 476px;
    width: 240px;
    margin-right: 40px;
    margin-top: 10px;
}
.gl-item{
    height: 476px;
    width: 240px;  
}

.p-img{
    height: 220px;
    width: 220px;
}
.p-price{
    color:red;
    font-size: 20px;
    
}
.p-desc{
    line-height: 20px;
    margin-bottom: 8px;
    font-size: 8px;
}
.p-operate{
    color: red  !important;
}

</style>