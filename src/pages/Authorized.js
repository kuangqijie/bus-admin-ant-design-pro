import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import RenderAuthorized from '@/components/Authorized';
import Exception from '@/components/Exception';
import { matchRoutes } from 'react-router-config';
import uniq from 'lodash/uniq';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import PageLoading from '@/components/PageLoading';

const Authorized = RenderAuthorized(['admin','user']);

export default @connect(({ user, loading }) => ({
  loadingAuth:loading.effects['user/fetchAuthority'],
  authorityList:user.authorityList || []
}))
class AuthorizedWrap extends React.Component {
  constructor(props){
    super(props);
    //console.log(props)

    if(sessionStorage.isLogin == 2){
      console.log('nologin')
      router.replace('/user/login');
    }
  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchAuthority',
      payload: {
        token:'@dfasd'
      }
    });
    //console.log(dispatch)
  }

  //页面权限控制 => false:无权限
  isCanTurn = ()=>{
    var { route:{routes}, location, authorityList } = this.props;
    //console.log('权限列表',authorityList)

    function setAuth(routeList){
      authorityList.forEach(item=>{
        routeList.forEach(route=>{
          if(item.path == route.path){
            route.isCanTurn = true;
          }
          if(route.routes && route.routes.length>0){
            setAuth(route.routes);
          }
        })
      })
    }

    setAuth(routes) //设置路由权限 隐藏无权访问的menu
    //console.log(routes)

    var matchRes = matchRoutes(routes, location.pathname);
    //console.log(matchRes)
    let flag = true;
    matchRes.forEach((item) => {
      if(item.route.path){
        flag = item.route.isCanTurn;
      }
    });
    // console.log(flag)
    return flag;
  }

  render(){
    const {loadingAuth} = this.props;
    //console.log(loadingAuth)

    const noMatch = (
      <Exception
        type="403"
        desc={formatMessage({ id: 'app.exception.description.403' })}
        linkElement={Link}
        backText={formatMessage({ id: 'app.exception.back' })}
      />
    );

    return !loadingAuth ?
      (
      <Authorized
      authority={this.isCanTurn}
      noMatch={noMatch}>
        {this.props.children}
      </Authorized>
      )
      :
      (<PageLoading />)
  }
}
