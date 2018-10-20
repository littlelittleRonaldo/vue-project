import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import HomeContainer from '@/components/tabbar/HomeContainer'
import MemberContainer from '@/components/tabbar/MemberContainer'
import CartContainer from '@/components/tabbar/CartContainer'
import SearchContainer from '@/components/tabbar/SearchContainer'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'

Vue.use(Router)

export default new Router({
  routes: [
    // { path: '/',name: 'HelloWorld',component: HelloWorld },
    // { path:'/test',name:'Test',component:Test },
    { path:'/home',name:'HomeContainer',component:HomeContainer,alias:'/' },
    { path:'/member',name:'MemberContainer',component:MemberContainer },
    { path:'/cart',name:'CartContainer',component:CartContainer },
    { path:'/search',name:'SearchContainer',component:SearchContainer },
    { path:'/home/newslist',name:'NewsList',component:NewsList },
    { path:'/home/newsinfo/:id',name:'NewsInfo',component:NewsInfo }
  ],
  linkActiveClass:'mui-active'
})
