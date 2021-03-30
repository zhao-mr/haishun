import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '../index/index'//主页
import train from '../train/index'//培训资料主页
import cultivate from '../cultivate/cultivate'//培训主页
import Cuillist from '../cultivate/Cuillist'//培训列表
import forshipin from '../cultivate/formatuoe'//视频页
import keyuizi from '../cultivate/keyGuzi'//关键字和分类页

import cultvate from '../train/cultvate'//默认培训列表页
import hentop from '../train/trainTop/Henxtop'//培训视频文件以及关键字和分类头部
import format from '../train/trainTop/format'//培训资料视频文件页
import keywords from '../train/trainTop/keywords'//培训资料关键字和分类页

import propaganda from '../components/propaganda'//宣传页面

import partake from '../components/partake'//宣传分享页面
import partaketrain from '../index/partaketrain'//培训分享页面

import customer from '../page/customer'//客户中心页面
import finance from '../page/finance'//财务管理页面
import personnel from '../page/personnel'//人事管理

// partaketrain
Vue.use(Router);

export default new Router({
  // mode:"history",
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: "index"
    },{
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/propaganda',
      name: 'propaganda',
      component: propaganda,
    },
    {
      path: '/cultivate',
      name: 'cultivate',
      component: cultivate,
      children:[{
        path: '/',
        name: 'Cuillist',
        component: Cuillist,
      },{
        path: '/Cuillist',
        name: 'Cuillist',
        component: Cuillist,
      },{
        path: '/cultivate/forshipin',
        name: 'forshipin',
        component: forshipin,
      },{
        path: '/cultivate/keyuizi',
        name: 'keyuizi',
        component: keyuizi,
      }]
    },
    {
      // path: '/train',
      // name: 'train',
      // component: resolve => require(['../train/index'], resolve)
      path: '/train',
      name: 'train',
      component: train,
      children:[{
        path: '/',
        name: 'cultvate',
        component: cultvate,
      },{
        path: '/cultvate',
        name: 'cultvate',
        component: cultvate,
      }]
    },{
      path: '/hentop',
      name: 'hentop',
      component: hentop,
      children:[
        ,{
          path: '/',
          name: 'hentop',
          component: hentop,
        }
        ,{
          path: '/cultvate/format',
          name: 'format',
          component: format,
        },{
          path: '/cultvate/keywords',
          name: 'keywords',
          component: keywords,
        }
      ]
    },
    {
      path: '/partake',
      name: 'partake',
      component: partake,
    },
    {
      path: '/partaketrain',
      name: 'partaketrain',
      component: partaketrain,
    },
    {
      path: '/customer',
      name: 'customer',
      component: customer,
    },
    {
      path: '/finance',
      name: 'finance',
      component: finance,
    },
    {
      path: '/personnel',
      name: 'personnel',
      component: personnel,
    },
  ],

})
