<template>
    <div>
        <div class="detail">
           
            <template v-if="flag == 2">
                <div class="word">修改信息</div>
                <el-form :model="userinfo" :rules="rules" ref="userinfo">
            <el-form-item prop="sex">
            <el-input class="inp"
                placeholder="请输入性别"
                v-model="userinfo.sex"
                clearable>
            </el-input>
            </el-form-item>
            <el-form-item prop="addr">
            <el-input class="inp"
                placeholder="请输入地址"
                v-model="userinfo.addr"
                clearable>
            </el-input>
            </el-form-item>
            <el-form-item  prop="phone">
            <el-input class="inp"
                placeholder="请输入手机号"
                v-model="userinfo.phone"
                clearable>
            </el-input>
            </el-form-item>
            </el-form>
            <div style="text-align:center;"><el-button type="primary" round @click="xg(userinfo)">修改</el-button></div>
            </template>
            <template v-else>
            <div class="word">账号信息</div>
            <el-form :model="userinfo" :rules="rules" ref="userinfo">
            <el-form-item prop="sex">
            <el-input class="inp"
                placeholder="请输入性别"
                v-model="userinfo.sex"
                clearable>
            </el-input>
            </el-form-item>
            <el-form-item prop="addr">
            <el-input class="inp"
                placeholder="请输入地址"
                v-model="userinfo.addr"
                clearable>
            </el-input>
            </el-form-item>
            <el-form-item  prop="phone">
            <el-input class="inp"
                placeholder="请输入手机号"
                v-model="userinfo.phone"
                clearable>
            </el-input>
            </el-form-item>
            </el-form>
            <div style="text-align:center;"><el-button type="primary" round @click="tj(userinfo)">提交</el-button></div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            flag: 0,
            userinfo:{
                sex:'1',
                addr:'',
                phone:'',
                collect:'100',
                username:'',
            },
             rules:{
            sex:[
                { required: true, message: '请输入性别', trigger: 'blur' },
                { min: 1, max: 1, message: '长度必须为1个字符', trigger: 'blur' }
            ],
            addr:[
                { required: true, message: '请输入用户地址', trigger: 'blur' },
            ],
            phone:[
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { min: 11, max: 11, message: '手机号长度错误', trigger: 'blur' }
            ],
               }
        }
    },

    methods:{
        tj(val){
            this.$refs.userinfo.validate(valid=>{
            if(!valid) return;
            this.userinfo = val;
            this.$http.post("http://localhost:8081/product/userinfo",this.userinfo).then(res=>{
                this.$message.success("添加成功");
                localStorage.setItem("flag",2);
                this.$router.push('/index');
             })
              
            })
        },
        xg(){
            this.$http.post("http://localhost:8081/product/updateinfo",this.userinfo).then(res=>{
                    if(res.data>=0){
                        this.$message.success("修改成功");
                    }
                })
        },
        chsj(){
            this.$http.post("http://localhost:8081/product/infoAll",this.userinfo).then(res=>{
                 this.userinfo.sex = res.data.sex;
                 this.userinfo.addr = res.data.addr;
                 this.userinfo.phone = res.data.phone;
                 this.userinfo.collect = res.data.collect;
                 if(res.data!=null && res.data!=''){
                     this.flag = 2;
                 }
            })
        }
    },
    mounted:function(){
        this.flag = localStorage.getItem("flag");
        this.userinfo.username = localStorage.getItem("username");
        this.chsj();
    },
}
</script>

<style scoped>
  .detail{
        width: 300px;
        height: 450px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-55%);
    }
    .word{
        font-size: 40px;
        text-align: center;
        margin-bottom: 20px;
    }
    .inp{
        margin-bottom: 20px;
    }
</style>