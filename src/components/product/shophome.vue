<template>
    <div>
    
        <div class="banner">
            <div class="item" style="margin:auto auto;width:1000px">
               <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in dataList" :key="item">
                <img style="width:1000px;height:auto" :src="item">
                </el-carousel-item>
            </el-carousel>
            </div>

        </div>
        <div class="title-head">
            <span>每日精选</span>
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
                        <div><a class="p-operate"  @click="addcart(product)">加入购物车</a></div>
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
            Search:'',
            dataList:[require("../../assets/oneplus9.jpg"),require("../../assets/meidi.jpg"),require("../../assets/q.jpg")],
            products:[
                {
                    productname:'',
                    productprice:'',
                    productimg:'',
                    productdesc:'',
                    productbrand:'',
                    productremarks:''
                },
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
                   this.$router.push('/shopcart');
                   if(this.shopcart.username != null)
                    alert('成功添加到购物车！！');
                }
            }) 
               }
           })
            
            
        }
    },
     mounted:function(){
       var _this = this
       if(localStorage.getItem("username")!==null && localStorage.getItem("username")!==''){
           _this.username = localStorage.getItem("username");
       }
           
            this.$http.get("http://localhost:8081/product/productListselected").then(res=>{
                if(res.data!=null){
                    _this.products = res.data;
                    console.log(_this.products)
                }
            })
        }
}
</script>

<style scoped>

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