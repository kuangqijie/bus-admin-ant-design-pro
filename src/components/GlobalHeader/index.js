import React, { PureComponent } from 'react';
import { Icon, Menu } from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';
import { formatMessage } from 'umi/locale';
import { matchRoutes } from 'react-router-config';
import IconFont from '@/components/IconFont';


export default class GlobalHeader extends PureComponent {
  state = {
    current: '',
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  componentDidUpdate(){
    const {  menuData } = this.props;
    const routes = matchRoutes(menuData, location.pathname);

    if(routes.length){
      this.setState({current: routes[0].route.path})
    }
  }

  handleOpenChange = (e)=>{
    console.log(e)
  }

  /**
   * 获得菜单节点
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    var current = this.state.current;
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        var name = formatMessage({ id: item.locale });
        var cur = '';
        if(item.path == current){
          cur = styles.curNav;
        }
        var child = item.children.filter(item=>item.name && !item.hideInMenu);
        var path = item.path;
        if(child.length){
          path = child[0].path
        }
        var icon = item.iconfont ? <IconFont className="f-mr8" type={item.iconfont} /> : <Icon className={styles.ico} type={item.icon} />;
        return <li key={item.path}><Link to={path} className={cur}>{icon}{name}</Link></li>;
      });
  };

  render() {
    const { collapsed, isMobile, logo, menuData } = this.props;

    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />

        <ul className={styles.mainNav}>
          {this.getNavMenuItems(menuData)}
        </ul>

        <RightContent {...this.props} />
      </div>
    );
  }
}
