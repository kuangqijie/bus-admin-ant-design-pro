import React, { Component } from 'react';
import { Icon } from 'antd';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_837090_cviqvygsdi6.js', //通过 iconfont.cn 生成
});

//使用阿里iconfont自定义图标
export default class IconFont extends Component {
  render(){
    return (
      <MyIcon {...this.props} />
    )
  }
}
