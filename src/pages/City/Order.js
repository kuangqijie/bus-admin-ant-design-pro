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
@connect(({ order, loading }) => ({
  order,
  loading: loading.effects['order/fetch'],
}))
@Form.create()
class CityOrder extends PureComponent {
  state = {
    isShowRefundModal: false, //是否显示退票弹窗
    selectedRows: [],
    formValues: {},
  };

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
            <Link to={`/city/order/detail/1`}>订单详情</Link>
          </Fragment>
        )
      },
    },
  ];
  
  //获取订单列表数据
  fetchData = (params)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'order/fetch',
      payload:{
        token:'@lkjkadf@456',
        ...params,
        pageSize: 10,
      }
    });
  }

  componentDidMount() {
    this.fetchData({pageNum:1});
  }

  //表格change 分页、排序、筛选变化时触发
  onTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
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
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    this.fetchData(params);
  };

  //重置
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
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

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'order/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  //查询表单
  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, xl:16, xxl:24 }}>
          <Col span={5}>
            <FormItem label="订单状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">已支付</Option>
                  <Option value="2">已关闭</Option>
                  <Option value="3">全部退票</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="关键字">
              {getFieldDecorator('name')(<Input placeholder="请输入手机或身份证号" />)}
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem label="下单日期">
              {getFieldDecorator('date')(
                <RangePicker style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>

          <Col span={6}>
            <div style={{ marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.onExportExcel}>
                导出
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
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
    console.log(order)
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
