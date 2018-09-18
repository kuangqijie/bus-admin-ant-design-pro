import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getPageQuery} from '@/utils/utils';
import styles from './OrderDetail.less';

const { Description } = DescriptionList;

const orderStatus = {
  1:'订单新建',
  2:'订单已超时',
  3:'订单已取消',
  4:'订单出票中',
  5:'订单成功',
  6:'订单失败',
  7:'订单已退票',
  8:'订单异常'
}

//保险信息col
const progressColumns = [
  { title: '行程类型', dataIndex: 'tripType', },
  { title: '乘客名', dataIndex: 'username', },
  { title: '证件类型', dataIndex: 'certType', },
  { title: '证件号码', dataIndex: 'certId', },
  { title: '出生日期', dataIndex: 'birthday', },
  { title: '保险名称', dataIndex: 'insName', },
  { title: '保单号', dataIndex: 'insId', },
  { title: '保险份数', dataIndex: 'insNum', },
  {
    title: '保险状态',
    dataIndex: 'insStatus',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="processing" text="进行中" />
      ),
  },
  {
    title: '操作',
    dataIndex: 'operate',
  },
];
//乘客信息col
const passengerColumns = [
  {title:'乘客名', dataIndex:'name'},
  {title:'证件', dataIndex:'certificateNo'},
  {title:'联系电话', dataIndex:'mobilePhone'},
]

export default
@connect(({ busOrderDetail, loading }) => ({
  orderDetail:busOrderDetail,
  loading: loading.effects['busOrderDetail/fetch'],
}))
class OrderDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const options = getPageQuery();
    dispatch({
      type: 'busOrderDetail/fetch',
      payload:{...options}
    });
  }

  render() {
    const { loading, orderDetail:OD } = this.props;

    let orderInfo = [
      { key: '订单状态', val: orderStatus[OD.orderStatus] },
      { key: '出发日期', val: OD.startDate },
      { key: '出发时间', val: OD.startTime },
      { key: '出发站', val: OD.startStationName },
      { key: '到达站', val: OD.endStationName },
      { key: '支付总金额', val: OD.totalMoney },
      { key: '票价总金额', val: OD.totalMoney },
      { key: '差额退款', val: '0' },
      { key: '订单号', val: OD.orderNo },
      { key: '保险价格', val: OD.insurancePrice },
      { key: '退票状态', val: '' },
      { key: '取票状态', val: '' },
    ];
    
    let stationInfo = [
      { key: '车站名', val: '' },
      { key: '车站地址', val: '' },
      { key: '联系电话', val: '' },
    ];
    let messageList = [];
    let insuranceInfo = [];

    

    //订单信息
    const renderOrderInfo = ()=>{
      return orderInfo.map((item,index)=>{
        return (<Description key={index} term={item.key}>{item.val}</Description>);
      })
    }
    //车站信息
    const renderStationInfo = ()=>{
      return stationInfo.map((item,index)=>{
        return (<Description key={index} term={item.key}>{item.val}</Description>);
      })
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.wrap}>
          <DescriptionList size="large" col={4} title="订单信息" style={{ marginBottom: 32 }}>
            {renderOrderInfo()}
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          
          <div className={styles.title}>乘客信息</div>
          <Table
            bordered
            style={{ marginBottom: 30 }}
            pagination={false}
            loading={loading}
            dataSource={OD.passengerInfo}
            columns={passengerColumns}
            rowKey='name'
          />

          <DescriptionList size="large" col={4} title="车站信息" style={{ marginBottom: 32 }}>
            {renderStationInfo()}
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />

          <DescriptionList size="large" col={1} title="短信列表" style={{ marginBottom: 32 }}>
            {messageList.map( (item,index) => <Description key={index}>{item}</Description>)}
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />

          <div className={styles.title}>保险信息</div>
          <Table
            bordered
            style={{ marginBottom: 30 }}
            pagination={false}
            loading={loading}
            dataSource={insuranceInfo}
            columns={progressColumns}
          />

          <div className="f-tc">
            <Button type="primary" className="f-mr10" icon="close">取消订单</Button>
            <Button type="primary" className="f-mr10 f-bg2" icon="upload">催出票</Button>
            <Button type="primary" className="f-mr10 f-bg1" icon="export">退票退款</Button>
            <Button type="primary" className="f-mr10" icon="mail">补发短信</Button>
            <Button type="primary" className="f-mr10 f-bg1" icon="notification">发送重要通知</Button>
            <Button type="primary" icon="file-text">查看重要通知</Button>
          </div>
        </Card>

      </PageHeaderWrapper>
    );
  }
}
