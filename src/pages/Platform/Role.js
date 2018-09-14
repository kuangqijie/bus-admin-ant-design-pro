import React, {Component, Fragment} from 'react';
import { connect } from 'dva';
import { Form, Table, Card, Alert, Button, Select, Input, DatePicker } from 'antd';
import moment from 'moment';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class PlatformRolePage extends Component{
  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <FormItem label="订单状态" className={styles.w1}>
          {getFieldDecorator('status')(
            <Select placeholder="请选择">
              <Option value="1">已支付</Option>
              <Option value="2">已关闭</Option>
              <Option value="3">全部退票</Option>
            </Select>
          )}
        </FormItem>

        <FormItem label="关键字" className={styles.w2}>
          {getFieldDecorator('name')(<Input placeholder="请输入手机或身份证号" />)}
        </FormItem>

        <FormItem label="下单时间" className={styles.w3}>
          {getFieldDecorator('date')(
            <RangePicker />
          )}
        </FormItem>

        <FormItem>
          <Button type="primary"> 查询 </Button>
          <Button type="primary" style={{ marginLeft: 8 }}> 导出 </Button>
        </FormItem>
      </Form>
    );
  }

  //搜索
  handleSearch = ()=>{

  }

  columns = [
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      render: (val) => <span>{moment(parseInt(val)).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    { title: '线路编号', dataIndex: 'lineId', },
    { title: '线路名称', dataIndex: 'lineName', },
    { title: '发车时间', dataIndex: 'startTime', },
    { title: '上车点', dataIndex: 'getOnStation', },
    { title: '下车点', dataIndex: 'getOffStation', },
    { title: '购票人手机号', dataIndex: 'mobile', },
    { title: '售票数', dataIndex: 'ticketNum', },
    { title: '订单总额', dataIndex: 'orderAmount', },
    { title: '实际支付金额', dataIndex: 'payAmount', },
    { title: '订单状态', dataIndex: 'orderStatus', },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 140,
      fixed: 'right',
      render: (text, record, index) => {
        return (
          <Fragment>
            <a className="f-mr10" onClick={()=>this.handleClick(record)}>退票</a>
            <a>订单详情</a>
          </Fragment>
        )
      },
    },
  ];
  dataSource = [
    { key:1, orderTime:'1536552942236', lineId:'007', lineName:'深圳线路', startTime:'1536552962236',getOnStation:'大新地铁站',getOffStation:'罗湖火车站',mobile:'18713246588', ticketNum:1, orderAmount:200,payAmount:200,orderStatus:'已支付'},
    { key:2, orderTime:'1536552942236', lineId:'007', lineName:'深圳线路', startTime:'1536552962236',getOnStation:'大新地铁站',getOffStation:'罗湖火车站',mobile:'18713246588', ticketNum:1, orderAmount:200,payAmount:200,orderStatus:'已支付'}
  ];

  handleClick = (record)=>{
    console.log(record);
  }

  //分页
  pagination = {
    total:150
  }

  //表格change 分页、排序、筛选变化时触发
  onTableChange = (pagination, filters, sorter)=>{
    console.log(pagination)
  }

  render(){
      return (
          <Card className={styles.platformRole} bordered={false}>
            <div className="f-mb20">{this.renderForm()}</div>

            <Table bordered dataSource={this.dataSource} pagination={this.pagination} columns={this.columns} onChange={this.onTableChange} scroll={{ x: 1400 }} />
          </Card>
      )
  }
}

export default Form.create()(PlatformRolePage)
