import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import {Popconfirm, Row, Col, Card, Form, Input, InputNumber, Select, Icon, Button,  Modal, message, Radio, Badge } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Staffs.less';

const FormItem = Form.Item;

const { TextArea, Search } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusText = {
  '1':'启用',
  '2':'停用'
}
const sexText = {
  '1':'男',
  '2':'女'
}
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export default
@connect(({ staffs, loading }) => ({
  staffs,
  loading: loading.effects['carmodel/fetch'],
}))
@Form.create()
class BaseStaffs extends PureComponent {
  state = {
    isShowModal: false, //是否显示弹窗
    formVals: {},
    pageSize: 10,
    pageNum: 1,
  };

  componentDidMount() {
    //this.fetchData();
  }

  columns = [
    { title: '编号', dataIndex: 'id', },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        { text: statusText[1], value: 1 },
        { text: statusText[2], value: 2 }
      ],
      filterMultiple:false, //设置是否多选
      render(val) {
        if(val==1){
          return <Badge status="success" text={statusText[val]} />
        }else if(val==2){
          return <Badge status="error" text={statusText[val]} />
        }
      },
    },
    { title: '工号', dataIndex: 'employeeNo' },
    { title: '姓名', dataIndex: 'realName' },
    { title: '年龄', dataIndex: 'age', },
    { title: '性别', dataIndex: 'sex', render:val=>sexText[val]},
    { title: '身份证号', dataIndex: 'certificateNo', },
    { title: '联系方式', dataIndex: 'mobilePhone', },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 140,
      fixed: 'right',
      render: (text, record, index) => {
        return (
          <Fragment>
            <Button type="primary" size="small" className="f-mr10" onClick={()=>this.onEdit(record)}>编辑</Button>
            <Popconfirm title="确定要删除这条数据吗?" onConfirm={()=>this.onDelete(record.id, record.delFlag)}>
              <Button type="primary" size="small" className="f-bg1">删除</Button>
            </Popconfirm>
          </Fragment>
        )
      },
    },
  ];

  //获取订单列表数据
  fetchData = (params)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'carmodel/fetch',
      payload:{
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
        ...params,
      }
    });
  }

  //表格change 分页、排序、筛选变化时触发
  onTableChange = (pagination, filtersArg, sorter) => {
    const { formVals } = this.state;

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
      ...formVals,
      ...filters,
    };
    this.setState({pageSize:pagination.pageSize})
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    this.fetchData(params);
  };

  //弹窗确认
  onAdd = ()=>{
    var {form} = this.props;
    form.validateFields((err, fieldsValue)=>{
      if(err) return;

      console.log(fieldsValue)
      this.setModal(false);
    })
  }
  //列表编辑
  onEdit = (record)=>{
    this.setState({formVals: record})
    this.setModal(true)
  }
  //列表删除
  onDelete = (id)=>{

  }
  
  setModal = (b)=>{
    this.setState({isShowModal: b});
  }

  //类别change
  onChangeCate = ()=>{

  }

  //搜索
  onSearch = (v)=>{
    console.log(v)
  }

  //弹窗表单
  renderForm = ()=>{
    const { form:{getFieldDecorator} } = this.props;
    const { formVals } = this.state;

    return (
      <Form layout="horizontal">
        <Row>
          <Col>
            <FormItem label="类别" labelCol={{span:4}} wrapperCol={{span:20}}>
              {getFieldDecorator('category',{
                initialValue:formVals.category,
                rules: [{ required: true, message: '请选择类别!', }],
              })(
                <RadioGroup onChange={this.onChangeCate}>
                  <Radio value={1}>大车</Radio>
                  <Radio value={2}>小车</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="车辆类型" {...formItemLayout}>
              {getFieldDecorator('busType',{
                initialValue:formVals.busType,
                rules: [{ required: true, message: '请选择车辆类型!', }],
              })(
                <Select placeholder="请选择">
                  <Option value="1">点</Option>
                  <Option value="2">面</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="品牌" {...formItemLayout}>
              {getFieldDecorator('brand',{
                initialValue:formVals.brand,
                rules: [{ required: true, message: '请输入品牌!', }],
              })(<Input placeholder="请输入品牌" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="核定座数" {...formItemLayout}>
              {getFieldDecorator('cofirmSeatsCount',{
                initialValue:formVals.cofirmSeatsCount,
                rules: [{ required: true, message: '请输入核定座数!', }],
              })(<Input placeholder="请输入核定座数" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="乘客座数" {...formItemLayout}>
              {getFieldDecorator('passengerSeatsCount',{
                initialValue:formVals.passengerSeatsCount,
                rules: [{ required: true, message: '请输入乘客座数!', }],
              })(<Input placeholder="请输入乘客座数" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }

  render() {
    const { order, loading, } = this.props;
    //console.log(order)
    const data = {
      list: [
        {id:1, status:1, employeeNo:'001', realName:'张翰', age:'25', sex:1, certificateNo:'430426198823146688', mobilePhone:18028786128},
        {id:3, status:2, employeeNo:'006', realName:'小王', age:'18', sex:2, certificateNo:'412426198823146622', mobilePhone:18028786128}
      ],
      pagination: {
        total:1,
        showTotal:t=>'共'+t+'条数据',
      }
    }
  
    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.wrap}>
          <Row className="f-mb20">
            <Col span={6}>
              <Button type="primary" onClick={()=>this.setModal(true)}>添加车型</Button>
            </Col>
            <Col span={10} offset={8} xxl={{ span: 8, offset: 10 }}>
              <Search placeholder="请输入工作人员名称" enterButton
                onSearch={(v)=>this.onSearch(v)}
              />
            </Col>
          </Row>
          

          <StandardTable
              bordered={true}
              loading={loading}
              data={data}
              columns={this.columns}
              rowKey={'id'}
              onChange={this.onTableChange}
          />

          <Modal title="添加车型" width={700} visible={this.state.isShowModal} onOk={this.onAdd} onCancel={()=>this.setModal(false)} maskClosable={false} destroyOnClose={true}>
            {this.renderForm()}
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
