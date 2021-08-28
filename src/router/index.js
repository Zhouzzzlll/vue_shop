import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/manage/Users.vue'
import Hello from '../components/Hello.vue'
import Coupon from '../components/manage/Coupon.vue'
import Order from '../components/manage/Order.vue'
import Watermark from '../components/manage/Watermark.vue'
import Index from '../components/Index.vue'
import Detail from '../components/product/detail.vue'
import Shopcart from '../components/product/shopcart.vue'
import Shophome from '../components/product/shophome.vue'
import Productall from '../components/product/productall.vue'
import Pay from '../components/product/pay.vue'
import Zhangh from '../components/product/zhangh.vue'
import Product from '../components/manage/Product'

Vue.use(VueRouter)

const routes = [
  { path: '/',redirect: '/index'},//重定向到index
  { path: '/login',component:Login},
  { 
    path: '/index',component:Index,redirect:'shophome',children:[
      { path:'/detail',component:Detail},
      { path:'/shopcart',component:Shopcart},
      { path:'/shophome',component:Shophome},
      { path:'/shophome',component:Shophome},
      { path:'/productall',component:Productall},
      { path:'/pay',component:Pay},
      { path:'/zhangh',component:Zhangh}
    ]
  },
  { 
    path: '/home',
    component:Home,
    redirect:'/hello',
    children:[
    { path:'/hello',component:Hello},
    { path:'/users',component:Users},
    { path:'/coupon',component:Coupon},
    { path:'/order',component:Order},
    { path:'/product',component:Product},
    { path:'/watermark',component:Watermark},
  ]
  },
    

]

const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to,from,next)=>{
  //to：将要访问哪个路径
  //from：从哪个路径跳转来的
  //next 是一个函数，表示放行或者强制跳转到.....
  if(to.path==='/login'||to.path==='/productall'||to.path==='/detail'||to.path==='/shophome'){
    return next();
  }
  else{
    const tokenString=window.localStorage.getItem("token");
    if(!tokenString){
      alert("请您登录后再操作！");
      // this.$message.success('请登录！！！');
      return next('/login');
    }else{
      next();
    }
  }
})

export default router
