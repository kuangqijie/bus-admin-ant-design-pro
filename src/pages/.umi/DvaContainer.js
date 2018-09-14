import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'global', ...(require('E:/bus-admin/ant-design-pro-master/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('E:/bus-admin/ant-design-pro-master/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('E:/bus-admin/ant-design-pro-master/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('E:/bus-admin/ant-design-pro-master/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('E:/bus-admin/ant-design-pro-master/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('E:/bus-admin/ant-design-pro-master/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('E:/bus-admin/ant-design-pro-master/src/pages/User/models/register.js').default) });
app.model({ namespace: 'station', ...(require('E:/bus-admin/ant-design-pro-master/src/pages/Base/models/station.js').default) });
app.model({ namespace: 'order', ...(require('E:/bus-admin/ant-design-pro-master/src/pages/City/models/order.js').default) });
app.model({ namespace: 'orderDetail', ...(require('E:/bus-admin/ant-design-pro-master/src/pages/City/models/orderDetail.js').default) });
app.model({ namespace: 'order', ...(require('E:/bus-admin/ant-design-pro-master/src/pages/Bus/models/order.js').default) });
app.model({ namespace: 'orderDetail', ...(require('E:/bus-admin/ant-design-pro-master/src/pages/Bus/models/orderDetail.js').default) });
app.model({ namespace: 'rule', ...(require('E:/bus-admin/ant-design-pro-master/src/pages/List/models/rule.js').default) });
app.model({ namespace: 'error', ...(require('E:/bus-admin/ant-design-pro-master/src/pages/Exception/models/error.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
