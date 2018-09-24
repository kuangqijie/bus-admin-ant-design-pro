import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'global', ...(require('F:/project/ant-design-pro/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('F:/project/ant-design-pro/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('F:/project/ant-design-pro/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('F:/project/ant-design-pro/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('F:/project/ant-design-pro/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('F:/project/ant-design-pro/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('F:/project/ant-design-pro/src/pages/User/models/register.js').default) });
app.model({ namespace: 'carmodel', ...(require('F:/project/ant-design-pro/src/pages/Base/models/carmodel.js').default) });
app.model({ namespace: 'staffs', ...(require('F:/project/ant-design-pro/src/pages/Base/models/staffs.js').default) });
app.model({ namespace: 'station', ...(require('F:/project/ant-design-pro/src/pages/Base/models/station.js').default) });
app.model({ namespace: 'order', ...(require('F:/project/ant-design-pro/src/pages/City/models/order.js').default) });
app.model({ namespace: 'orderDetail', ...(require('F:/project/ant-design-pro/src/pages/City/models/orderDetail.js').default) });
app.model({ namespace: 'order', ...(require('F:/project/ant-design-pro/src/pages/Bus/models/order.js').default) });
app.model({ namespace: 'orderDetail', ...(require('F:/project/ant-design-pro/src/pages/Bus/models/orderDetail.js').default) });
app.model({ namespace: 'rule', ...(require('F:/project/ant-design-pro/src/pages/List/models/rule.js').default) });
app.model({ namespace: 'error', ...(require('F:/project/ant-design-pro/src/pages/Exception/models/error.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
