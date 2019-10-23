import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('../components/pages/login.vue')
const index = () => import('../components/pages/index.vue')
const admin = () => import('../components/pages/admin.vue')
const welcome=()=>import('../components/pages/welcome.vue')
const banner=()=>import('../components/pages/banner.vue')
const hometeach=()=>import('../components/pages/hometeach.vue')
const water=()=>import('../components/pages/water.vue')
const maintenance=()=>import('../components/pages/maintenance.vue')
const housework=()=>import('../components/pages/housework.vue')
const cpassword=()=>import('../components/pages/cpassword.vue')
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [{
          path: 'admin',
          component: admin,
          name:'管理员管理'
        },
        {
          path: 'banner',
          component: banner,
          name:'banner管理'
        },
        {
          path: 'hometeach',
          component: hometeach,
          name:'家教管理'
        },
        {
          path: 'water',
          component: water,
          name:'水站管理'
        },
        {
          path: 'maintenance',
          component:maintenance,
          name:'维修管理'
        },
        {
          path: 'housework',
          component:housework,
          name:'家政管理'
        },
        {
          path: 'cpassword',
          component:cpassword,
          name:'修改密码'
        },
        {
          path: 'welcome',
          component: welcome,
        },
        {
          path:'',
          redirect:'welcome'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
