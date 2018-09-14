import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './OrderDetail.less';

const { Description } = DescriptionList;

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

export default
@connect(({ orderDetail, loading }) => ({
  orderDetail,
  loading: loading.effects['orderDetail/fetch'],
}))
class OrderDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetail/fetch',
      payload:{id:2}
    });
  }

  render() {
    const { loading, orderDetail:{orderInfo, stationInfo, messageList, insuranceInfo} } = this.props;

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
