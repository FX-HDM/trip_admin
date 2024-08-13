import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/index',
      name: 'index',
      meta:{requireAuth:true},
      redirect: 'index/echarts',
      component: () => import('../views/index.vue'),
      children:[
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/user.vue')
        },
        {
          path: 'user_apply',
          name: 'user_apply',
          component: () => import('../views/user_apply.vue')
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: () => import('../views/coupon.vue')
        },
        {
          path: 'combo',
          name: 'combo',
          component: () => import('../views/combo.vue')
        },
        {
          path: 'complaint',
          name: 'complaint',
          component: () => import('../views/complaint.vue')
        },
          {
            path: 'appeal',
            name: 'appeal',
            component: () => import('../views/appeal.vue')
          },
          {
            path: 'echarts',
            name: 'echarts',
            component: () => import('../views/echarts.vue')
          },

      ]
    },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next)=>{
  if (to.path==='/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr){
    alert('请先登录')
    return next('/login')
  }else{
    return next()
  }
})



export default router
