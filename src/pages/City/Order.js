import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';
import jsonToExcel from '@/utils/jsonToExcel';

import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider, Steps, Radio, } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { RangePicker } = DatePicker;

import styles from './Order.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


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

export default
@connect(({ cityOrder, loading }) => ({
  order: cityOrder,
  loading: loading.effects['cityOrder/fetch'],
}))
@Form.create()
class CityOrder extends PureComponent {
  state = {
    isShowRefundModal: false, //是否显示退票弹窗
    selectedRows: [],
    formValues: {},
    expandForm: false,
    pageSize: 10
  };

  componentDidMount() {
    this.fetchData({pageNum:1});
  }

  columns = [
    { title: '订单号', dataIndex: 'orderNo', },
    {
      title: '下单时间',
      dataIndex: 'createDate',
      render: (val) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '行程',
      dataIndex: 'line',
      render: (val,record) => <span>{record.startStationName+'-'+record.endStationName}</span>,
    },
    {
      title: '出发时间',
      dataIndex: 'goTime',
      render:(val,record)=><span>{record.startDate+' '+record.startTime}</span>
    },
    { title: '车次号', dataIndex: 'busLineNo', },
    { title: '预定手机', dataIndex: 'mobilePhone', },
    { title: '票张数', dataIndex: 'ticketNum', },
    { title: '票价', dataIndex: 'ticketPrice', },
    { title: '订单总额', dataIndex: 'totalMoney', },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      render:(val)=><span>{orderStatus[val]}</span>
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 140,
      fixed: 'right',
      render: (text, record, index) => {
        return (
          <Fragment>
            <a className="f-mr10" onClick={()=>this.setRefundModal(true)}>退票</a>
            <Link to={`/bus/order/detail?orderNo=${record.orderNo}`}>订单详情</Link>
          </Fragment>
        )
      },
    },
  ];

  //获取订单列表数据
  fetchData = (params)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'cityOrder/fetch',
      payload:{
        pageSize: this.state.pageSize,
        ...params,
      }
    });
  }

  //表格change 分页、排序、筛选变化时触发
  onTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    //console.log(filters)
    //console.log(pagination)
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    this.setState({pageSize:pagination.pageSize})
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    this.fetchData(params);
  };

  //重置
  onFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.fetchData({pageNum:1});
  };

  //设置已选中的行
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  //导出excel
  onExportExcel = ()=>{
    const {order:{list}} = this.props;
    let arr = [];
    list.forEach(item=>{
      var o = {}
      this.columns.forEach(col=>{
        if(item[col.dataIndex]){
          o[col.title] = item[col.dataIndex];
        }

      })
      arr.push(o);
    })
    //console.log(arr);
    jsonToExcel(arr, '订单数据')
  }

  //搜索
  onSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue)
      if (err) return;

      //解析时间
      var orderTime = {} //下车时间
      if(fieldsValue.orderTime){
        orderTime.beginDate = fieldsValue.orderTime[0].format('YYYY-MM-DD')
        orderTime.endDate = fieldsValue.orderTime[1].format('YYYY-MM-DD')
      }
      var startTime = {} //发车时间
      if(fieldsValue.startTime){
        startTime.departureDate = fieldsValue.startTime[0].format('YYYY-MM-DD')
        startTime.arriveDate = fieldsValue.startTime[1].format('YYYY-MM-DD')
      }

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      this.fetchData({pageNum:1, ...values, ...orderTime, ...startTime})
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  //展开查询表单
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  //订单状态select
  renderSelectStatus(){
    var opts = [];
    for(let k in orderStatus){
      opts.push(<Option value={k} key={k}>{orderStatus[k]}</Option>)
    }
    return (
      <Select placeholder="请选择" style={{ width: '100%' }}>
        {opts}
      </Select>
    )
  }

  //查询表单(默认表单)
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, xl:16, xxl:24 }}>
          <Col span={6}>
            <FormItem label="订单状态">
              {getFieldDecorator('orderStatus')(
                this.renderSelectStatus()
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="订单号">
              {getFieldDecorator('orderNo')(<Input placeholder="请输入订单号" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机号">
              {getFieldDecorator('mobilePhone')(<Input placeholder="请输入手机号" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <div style={{ marginBottom: 24 }}>
              <Button type="primary" htmlType="submit" className="f-mr10">查询</Button>
              <Button type="primary" className="f-mr10" onClick={this.onFormReset}>重置</Button>
              <a onClick={this.toggleForm}> 展开 <Icon type="down" /> </a>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
  //查询表单(展开表单)
  renderAdvancedForm(){
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, xl:16, xxl:24 }}>
          <Col span={6}>
            <FormItem label="订单状态">
              {getFieldDecorator('orderStatus')(
                this.renderSelectStatus()
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="订单号">
              {getFieldDecorator('orderNo')(<Input placeholder="请输入订单号" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机号">
              {getFieldDecorator('mobilePhone')(<Input placeholder="请输入手机号" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="身份证">
              {getFieldDecorator('certificateNo')(<Input placeholder="请输入取票人身份证" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, xl:16, xxl:24 }}>
          <Col span={8}>
            <FormItem label="下单时间">
              {getFieldDecorator('orderTime')(
                <RangePicker style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="发车时间">
              {getFieldDecorator('startTime')(
                <RangePicker style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <div style={{ marginBottom: 24 }}>
              <Button type="primary" htmlType="submit" className="f-mr10">查询</Button>
              <Button type="primary" className="f-mr10" onClick={this.onFormReset}>重置</Button>
              <Button type="primary" className="f-mr10" onClick={this.onExportExcel}>导出</Button>
              <a onClick={this.toggleForm}> 收起 <Icon type="up" /></a>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  //设置退票弹窗是否显示
  setRefundModal = (b)=>{
    this.setState({isShowRefundModal: b});
  }

  //点击退票弹窗 ok
  onRefundModalOk = (flag)=>{
    //console.log(flag);
    this.setRefundModal(false);
  }

  render() {
    const { order, loading, } = this.props;
    //console.log(order)
    const data = {
      list: order.list,
      pagination: {
        total:order.total,
        showTotal:t=>'共'+t+'条数据',
      }
    }
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <StandardTable
              bordered={true}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              //isSetRowSelect={true} //设置表格是否可选
              columns={this.columns}
              rowKey={'id'}
              onSelectRow={this.handleSelectRows}
              onChange={this.onTableChange}
              scroll={{ x: 1400 }}
            />
          </div>
        </Card>
        <Modal title="退票" visible={this.state.isShowRefundModal} onOk={this.onRefundModalOk} onCancel={()=>this.setRefundModal(false)}>
          <p>确定要退票吗</p>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
