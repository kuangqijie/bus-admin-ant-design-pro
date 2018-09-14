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
        path:'/platform',
        icon:'form',
        name:'platform',
        //authority:['admin'],
        routes:[
          { path: '/platform/role', name:'role',icon:'team', component: './Platform/Role' },
          { path: '/platform/user', name:'user',icon:'user', component: './Platform/User' },
          { component: '404', isCanTurn:true },
        ]
      },
      {
        path:'/base',
        icon:'setting',
        name:'base',
        routes:[
          { path: '/base/baseinfo', name:'baseinfo', icon:'profile', component: './Base/Baseinfo' },
          { path: '/base/location', name:'location', icon:'environment', component: './Base/Location' },
          { path: '/base/station', name:'station', icon:'environment', component: './Base/Station' },
          { component: '404', isCanTurn:true },
        ]
      },
      {
        path:'/city',
        iconfont:'icon-city',
        name:'city',
        routes:[
          { path: '/city/order', name:'order', icon:'shopping-cart', component: './City/Order', },
          { path: '/city/order/detail/:id', hideInMenu:true, name:'orderdetail', component: './City/OrderDetail/$id.js' },
          { path: '/city/line', name:'line', icon:'branches', component: './City/Line' },
          { component: '404', isCanTurn:true },
        ]
      },

      {
        path:'/bus',
        iconfont:'icon-bus', //自定义图标
        name:'bus',
        routes:[
          { path: '/bus/order', name:'order', icon:'shopping-cart', component: './Bus/Order', },
          { path: '/bus/order/detail/:id', hideInMenu:true, name:'orderdetail', component: './Bus/OrderDetail/$id.js' },
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
          }
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
