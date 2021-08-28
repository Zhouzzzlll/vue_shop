<template>
    <div>
        <h3>短视频无水印解析(聚合接口)，支持：抖音、快手、小红书、微视、火山小视频、秒拍、西瓜视频、今日头条、陌陌视频、映客视频、小咖秀、
            皮皮搞笑、开眼、全民小视频、全民K歌、最右、小影、微博、美拍、皮皮虾等平台的短视频去水印解析</h3>
        <el-input style="width:500px"  v-model="tiktokUrl" placeholder="请输入短视频链接,先点击获取地址后点击跳转"></el-input>
        <el-button class="tiktok" type="primary" @click="searchTiktok">获取地址</el-button>
        <el-link class="jump" type="primary" :href=this.url :underline=false :disabled='a' icon='el-icon-s-promotion' >点击跳转</el-link>
    </div>

</template>

<script>
export default {
    data(){
        return {
            tiktokUrl:'',
            url:'',
            a:true,
        }
    },
    
    methods:{
        searchTiktok(){
            this.$http.post('https://v1.alapi.cn/api/video/url',{
                   url:this.tiktokUrl
               
                
            }).then(res=>{
                if(res.data.code===200){
                 this.a=false
                 this.url=res.data.data.video_url
                 console.log(res.data.data.video_url)
                 this.$message.success('地址正确，请继续下一步')
                }
                else{
                 this.$message.error();('视频地址不对，请重新输入！');
                }
                
            })
        }
    }

    
}
</script>

<style scoped>
.tiktok{
    margin-left: 50px;
}
.jump{
    padding-left: 20px;
}
</style>
