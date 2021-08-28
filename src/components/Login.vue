<template>
    <div class="login_container" >
        <!-- <img src="../assets/bg.jpg" alt=""> -->
       <div class="login_box">
           <div class="avatar_box">
               <img src="../assets/true.jpg" alt="">
           </div>
           <div class="input">
               <template v-if="flag === 1">
               <el-form :model="LoginForm"  ref="LoginRef"  :rules="rules">
                   <el-form-item prop="username">
                    <el-input  prefix-icon="el-icon-user" v-model="LoginForm.username" placeholder="请输入用户名"></el-input>
                   </el-form-item>
                   <el-form-item prop="password">
                    <el-input class="pwd" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="LoginForm.password" show-password></el-input>
                    </el-form-item>
                    <div class="bt">
                   <el-button type="primary" @click="login">登录</el-button>
                   <el-button type="info" @click="rest">重置</el-button>
                   <el-button type="error" @click="regist">立即注册</el-button>
                    </div>
               </el-form>
               </template>
               <template v-if="flag === 2 ">
               <el-form :model="LoginForm"  ref="LoginRef"  :rules="rules">
                   <el-form-item prop="username">
                    <el-input  prefix-icon="el-icon-user" v-model="LoginForm.username" placeholder="管理员用户"></el-input>
                   </el-form-item>
                   <el-form-item prop="password">
                    <el-input class="pwd" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="LoginForm.password" show-password></el-input>
                    </el-form-item>
                    <div class="bt">
                   <el-button type="primary" @click="loginadmin">登录</el-button>
                   <el-button type="info" @click="rest">重置</el-button>
                    </div>
               </el-form>
           </template>
           <el-radio-group  v-model="xz" @change="dlfs">
                    <el-radio label="1" size="medium">用户</el-radio>
                     <el-radio label="2" size="medium">管理员</el-radio>
            </el-radio-group>
           </div>
       </div>

        <div>
            <el-dialog
                title="注册用户"
                :visible.sync="registVisible"
                width="30%"
                >
                <el-form :model="registForm" :rules="rules" ref="registForm" label-width="100px">
                <el-form-item label="用户名" prop="name">
                    <el-input type="username" v-model="registForm.name" autocomplete="off"></el-input>
                </el-form-item>    
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="registForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="registForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="registVisible = false">取 消</el-button>
                    <el-button type="primary" @click="registSubmit">确 定</el-button>
                </span>
            </el-dialog>
           </div>
    </div>
</template>

<script>
export default {
    data() {
     return {
         flag:1,
         xz:'1',
         registVisible:false,
         registForm:{
             id:'',
             name:'',
             pass:'',
             checkPass:''
         },
         token:'',
         showname:'',
         LoginForm:{
             username:'',
             password:''
         },
         code:'',
         rules:{
            username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            name:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            pass:[
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            checkPass:[
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
               }
           }
        },
    mounted:{
        
    },
    methods:{
        rest(){
            this.$refs.LoginRef.resetFields();
        },
        login(){
                this.$refs.LoginRef.validate(valid=>{
                if(!valid) return;
                this.$http.post("http://localhost:8081/User/selectUser",{
                    username:this.LoginForm.username,
                    password:this.LoginForm.password,
                }).then(res=>{
                    console.log(res);
                    this.code=res.data.code;
                    this.token=res.data.token;
                    console.log(this.code)
                    if(this.code!==200){
                        return this.$message.error('登陆失败！');    
                    }  
                    else{ 
                        this.showname=res.data.user.username;
                       // this.token=this.LoginForm.username;
                        window.localStorage.setItem("token",this.token);
                        window.localStorage.setItem("username",this.showname)
                        this.$router.push('/zhangh');
                        return this.$message.success('登录成功！');
                        }
                })
        
            })
        },
         dlfs(val){
            if(val=='1'){
                this.flag = 1
                console.log(val)
            }
            if(val=='2')
            {
                this.flag = 2
            }
        },
        loginadmin(){
             this.$refs.LoginRef.validate(valid=>{
                if(!valid) return;
                this.$http.post("http://localhost:8081/User/selectAdmin",{
                    username:this.LoginForm.username,
                    password:this.LoginForm.password,
                }).then(res=>{
                    this.code=res.data.code;
                    this.token=res.data.token;
                    if(this.code!==200){
                        return this.$message.error('登陆失败！');    
                    }  
                    else{ 
                        this.showname=res.data.user.username;
                       // this.token=this.LoginForm.username;
                        window.localStorage.setItem("token",this.token);
                        window.localStorage.setItem("username",this.showname)
                        this.$router.push('/home');
                        return this.$message.success('登录成功！');
                        }
                })
        
            })
        },
        regist(){
            this.registVisible=true
        },

        registSubmit(){
            this.$refs.registForm.validate(valid=>{
                if(!valid) return;
                if(this.registForm.pass!==this.registForm.checkPass){
                return this.$message.error("两次输入密码不一致");
            }
            else{
                this.$http.post("http://localhost:8081/User/selectUserByname",{
                    username:this.registForm.name,
                    password:this.registForm.pass,
                }).then(res=>{
                    console.log(res.data)
                     this.code=res.data.code;
                     if(this.code===200){
                         return this.$message.error('用户已经存在');
                     }else{
                         console.log(res.data);
                         
                         this.$http.post("http://localhost:8081/User/addUser",{
                            username:this.registForm.name,
                            password:this.registForm.pass,
                }).then(res=>{
                    console.log(res)
                    if(res.data.code===200){
                        this.registVisible=false
                        this.$message.success("注册成功")
                    }
                    else{
                        this.$message.error("用户名已经存在，请重试")
                    }
                   
                })
                     }
                })
                
            }

            })
            
        }
    }

  }
</script>

<style scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 320px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border:1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
}
 img{
     width: 100%;
     height: 100%;
     border-radius: 50%;
     background-color: #eee;
 }
 .input{
     margin: 85px auto;
     width: 300px;
     padding-left: 20px;
 }
 .pwd{
     margin-top: 20px;
 }
 .bt{
     margin-top: 20px;
 }
</style>