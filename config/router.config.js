export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },

    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'], //权限路由
    routes: [
      {
        id:1,
        path:'/platform',
        icon:'form',
        name:'platform',
        //authority:['admin'],
        routes:[
          { id:100, path: '/platform/role', name:'role',icon:'team', component: './Platform/Role' },
          { id:101, path: '/platform/user', name:'user',icon:'user', component: './Platform/User' },
          { component: '404', isCanTurn:true },
        ]
      },
      {
        id:2,
        path:'/base',
        icon:'setting',
        name:'base',
        routes:[
          { id:200, path: '/base/baseinfo', name:'baseinfo', icon:'profile', component: './Base/Baseinfo' },
          { id:201, path: '/base/location', name:'location', icon:'environment', component: './Base/Location' },
          { id:202, path: '/base/station', name:'station', icon:'environment', component: './Base/Station' },
          { id:203, path: '/base/carmodel', name:'carmodel', iconfont:'icon-carmodel', component: './Base/CarModel' },
          { id:204, path: '/base/staffs', name:'staffs', icon:'user', component: './Base/Staffs' },
          { component: '404', isCanTurn:true },
        ]
      },
      {
        id:3,
        path:'/city',
        iconfont:'icon-city',
        name:'city',
        routes:[
          { path: '/city/order', name:'order', icon:'shopping-cart', component: './City/Order', },
          { path: '/city/order/detail', hideInMenu:true, name:'orderdetail', component: './City/OrderDetail' },
          { path: '/city/line', name:'line', icon:'branches', component: './City/Line' },
          { component: '404', isCanTurn:true },
        ]
      },

      {
        id:4,
        path:'/bus',
        iconfont:'icon-bus', //自定义图标
        name:'bus',
        routes:[
          { path: '/bus/order', name:'order', icon:'shopping-cart', component: './Bus/Order', },
          { path: '/bus/order/detail', hideInMenu:true, name:'orderdetail', component: './Bus/OrderDetail' },
          { component: '404', isCanTurn:true },
        ]
      },

      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },

      //错误页
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        isCanTurn:true,
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
            isCanTurn:true,
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
            isCanTurn:true,
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
            isCanTurn:true,
          },
          {component: '404', isCanTurn:true}
        ],
      },

      // 欢迎页
      { path: '/', name:'home', component:'./Main', hideInMenu:true, isCanTurn:true },
      {
        component: '404', isCanTurn:true
      },
    ],
  },
];
