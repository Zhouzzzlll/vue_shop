<template>
    <div>
        <div class="detail">
            <div class="detail-img">
                <img :src="require('../../assets/'+this.productN.productimg)">
            </div>
            <div class="detail-word">
               品牌 ：{{productN.productname}}<br><br>
               名称 : {{productN.productbrand}}<br><br>
               商品价格 ：{{productN.productprice}}<br><br>
               商品详情 : {{productN.productdesc}}<br><br>
               库存 ： {{productN.productremarks}}<br><br>
               <el-button type="danger" icon="el-icon-shopping-cart-full" @click="addShop">加入购物车</el-button>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            productN:'',
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
        addShop:function(){
            this.shopcart.username = localStorage.getItem("username");
            this.shopcart.productprice = this.productN.productprice;
            this.shopcart.productimg = this.productN.productimg;
            this.shopcart.productbrand = this.productN.productbrand;
            this.$http.get("http://localhost:8081/product/repeat/"+this.shopcart.username+"/"+this.shopcart.productbrand).then(res=>{
               if(res.data!==null && res.data!==''){
                   alert("您的购物车中已经存在了");
               }else{
                this.$http.post("http://localhost:8081/product/shopcartList",this.shopcart).then(res=>{
                if(res.data!=null){
                   this.$router.push('/shopcart')
                   if(this.shopcart.username!=null)
                   alert('成功添加到购物车！！');
                }
            })
               }
           })
        }
     },
     mounted:function(){
       this.productN = JSON.parse(localStorage.getItem("productN"))
       console.log(this.productN)
        }
}
</script>

<style scoped>
    .detail{
        width: 600px;
        height: 700px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .detail-img{
        padding-top: 90px ;
        text-align: center !important;
    }
    .detail-word{
        padding-top: 50px ;
        text-align: center  !important;
    }
</style>