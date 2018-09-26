import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'E:/bus-admin/ant-design-pro-master/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "redirect": "/user/login",
    "exact": true
  },
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
    "routes": [
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
    "Routes": [require('../Authorized').default],
    "routes": [
      {
        "id": 1,
        "path": "/platform",
        "icon": "form",
        "name": "platform",
        "routes": [
          {
            "id": 100,
            "path": "/platform/role",
            "name": "role",
            "icon": "team",
            "component": dynamic({ loader: () => import('../Platform/Role'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "id": 101,
            "path": "/platform/user",
            "name": "user",
            "icon": "user",
            "component": dynamic({ loader: () => import('../Platform/User'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import('../404'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "isCanTurn": true,
            "exact": true
          },
          {
            "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "id": 2,
        "path": "/base",
        "icon": "setting",
        "name": "base",
        "routes": [
          {
            "id": 200,
            "path": "/base/baseinfo",
            "name": "baseinfo",
            "icon": "profile",
            "component": dynamic({ loader: () => import('../Base/Baseinfo'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "id": 201,
            "path": "/base/location",
            "name": "location",
            "icon": "environment",
            "component": dynamic({ loader: () => import('../Base/Location'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "id": 202,
            "path": "/base/station",
            "name": "station",
            "icon": "environment",
            "component": dynamic({ loader: () => import('../Base/Station'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "id": 203,
            "path": "/base/carmodel",
            "name": "carmodel",
            "iconfont": "icon-carmodel",
            "component": dynamic({ loader: () => import('../Base/CarModel'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "id": 204,
            "path": "/base/staffs",
            "name": "staffs",
            "icon": "user",
            "component": dynamic({ loader: () => import('../Base/Staffs'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import('../404'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "isCanTurn": true,
            "exact": true
          },
          {
            "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "id": 3,
        "path": "/city",
        "iconfont": "icon-city",
        "name": "city",
        "routes": [
          {
            "path": "/city/order",
            "name": "order",
            "icon": "shopping-cart",
            "component": dynamic({ loader: () => import('../City/Order'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/city/order/detail",
            "hideInMenu": true,
            "name": "orderdetail",
            "component": dynamic({ loader: () => import('../City/OrderDetail'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/city/line",
            "name": "line",
            "icon": "branches",
            "component": dynamic({ loader: () => import('../City/Line'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import('../404'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "isCanTurn": true,
            "exact": true
          },
          {
            "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "id": 4,
        "path": "/bus",
        "iconfont": "icon-bus",
        "name": "bus",
        "routes": [
          {
            "path": "/bus/order",
            "name": "order",
            "icon": "shopping-cart",
            "component": dynamic({ loader: () => import('../Bus/Order'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/bus/order/detail",
            "hideInMenu": true,
            "name": "orderdetail",
            "component": dynamic({ loader: () => import('../Bus/OrderDetail'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import('../404'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "isCanTurn": true,
            "exact": true
          },
          {
            "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/list",
        "icon": "table",
        "name": "list",
        "routes": [
          {
            "path": "/list/table-list",
            "name": "searchtable",
            "component": dynamic({ loader: () => import('../List/TableList'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/list/basic-list",
            "name": "basiclist",
            "component": dynamic({ loader: () => import('../List/BasicList'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/list/card-list",
            "name": "cardlist",
            "component": dynamic({ loader: () => import('../List/CardList'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/list/search",
            "name": "searchlist",
            "component": dynamic({ loader: () => import('../List/List'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/list/search/articles",
                "name": "articles",
                "component": dynamic({ loader: () => import('../List/Articles'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/list/search/projects",
                "name": "projects",
                "component": dynamic({ loader: () => import('../List/Projects'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/list/search/applications",
                "name": "applications",
                "component": dynamic({ loader: () => import('../List/Applications'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "isCanTurn": true,
        "hideInMenu": true,
        "routes": [
          {
            "path": "/exception/403",
            "name": "not-permission",
            "component": dynamic({ loader: () => import('../Exception/403'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "isCanTurn": true,
            "exact": true
          },
          {
            "path": "/exception/404",
            "name": "not-find",
            "component": dynamic({ loader: () => import('../Exception/404'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "isCanTurn": true,
            "exact": true
          },
          {
            "path": "/exception/500",
            "name": "server-error",
            "component": dynamic({ loader: () => import('../Exception/500'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "isCanTurn": true,
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import('../404'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
            "isCanTurn": true,
            "exact": true
          },
          {
            "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/",
        "name": "home",
        "component": dynamic({ loader: () => import('../Main'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
        "hideInMenu": true,
        "isCanTurn": true,
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('E:/bus-admin/ant-design-pro-master/src/components/PageLoading/index').default  }),
        "isCanTurn": true,
        "exact": true
      },
      {
        "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('E:/bus-admin/ant-design-pro-master/node_modules/_umi-build-dev@1.0.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
