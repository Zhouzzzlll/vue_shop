<template>
    <div>
        <template v-if="count!= null && count !=''">
        <el-card class="box-card">
            <div class="sp">您一共购买了{{count}}件商品,价格为￥{{money}}</div>
        </el-card>
        <div class="detail">
            <div class="zit">请选择您的支付方式~~~</div>
            <div class="dx">
                
                <el-radio-group v-model="payment" @change="zffs">
                    <el-radio  label="1" border size="medium ">账户余额</el-radio>
                        <el-tooltip content="暂不支持该支付方式">
                        <el-radio  label="2" border size="medium" disabled>支付宝支付</el-radio>
                        </el-tooltip>
                        <el-tooltip content="暂不支持该支付方式">
                        <el-radio  label="3" border size="medium" disabled>微信支付</el-radio>
                        </el-tooltip> 
                </el-radio-group>
               
            </div>
        <div class="dx">(我的余额：￥{{collect}})</div>
        <div class="dx"><el-button style="width:500px" round type="primary" @click="pay">确认支付</el-button></div>
        </div>
        </template>
        <template v-else>
            <el-card class="box-card">
            <div class="sp">您还没有订单生成呀~~</div>
        </el-card>
        </template>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:'',
            count:'',
            money:'',
            productbrand:'',
            payment:'1' ,
            collect:'', 
        }
    },
    methods:{
        zffs(val){
            if(val===1){

            }
        },
        pay(){
           if(this.collect - this.money < 0){
               this.$message.error("余额不足，请充值后再购买")
           }else{
               this.$http.get("http://localhost:8081/product/updatestate",{
                   params:{
                       username : this.username
                   }
               }).then(res=>{
                   if(res.data!=null){
                       this.$message.success("购买成功");
                this.$http.get("http://localhost:8081/product/updatecollect",{
                    params:{
                        collect : this.collect - this.money,
                        username : this.username
                    }
                })
                   }
               })
           }
        }
    },
    mounted:function(){
        this.username = localStorage.getItem("username");
        this.productbrand = localStorage.getItem("buyone");
        this.$http.get("http://localhost:8081/product/pay/"+this.username+"/"+this.productbrand).then(res=>{
            this.count = res.data.count;
            this.money = res.data.money;
        });
        this.$http.get("http://localhost:8081/product/infoAll",{
            params:{
                username:this.username
            }
        }).then(res=>{
            this.collect = res.data.collect;
        })
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
.detail{
        width: 500px;
        height: 450px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-35%);
    }
.zit{
    font-size: 30px;
    letter-spacing: 3px;
    text-align: center;
}
.dx{
    margin-top: 20px;
    text-align: center;
}
</style>