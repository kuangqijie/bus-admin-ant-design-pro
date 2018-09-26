import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';

import {Popconfirm, Row, Col, Card, Form, Input, InputNumber, Select, Icon, Button,  Modal, message, Radio, Badge,Tree } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Role.less';

const FormItem = Form.Item;

const { TextArea, Search } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusText = {
  '1':'启用',
  '2':'停用'
}

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}


class RightsSet extends PureComponent{
  state = {
    //expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    //checkedKeys: ['0-0-0'], //选中复选框的树节点
    selectedKeys: [], //设置选中的树节点
  }

  treeData = [
    {
      title: '平台管理',
      key: '0-0',
      children: [
        { title: '角色管理', key: '0-0-0' },
        { title: '用户管理', key: '0-0-1' },
      ],
    },
    {
      title: '基础设置',
      key: '0-1',
      children: [
        { title: '基本信息', key: '0-1-0' },
        { title: '城市管理', key: '0-1-1' },
        { title: '站点设置', key: '0-1-2' },
        { title: '车型管理', key: '0-1-3' },
      ],
    },
    {
      title: '汽车票',
      key: '0-2',
      children: [
        { title: '订单管理', key: '0-2-0' },
      ],
    },
  ];

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  render() {

    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(this.treeData)}
      </Tree>
    );
  }
}

export default
@connect(({ role, loading }) => ({
  role,
  loading: loading.effects['role/fetch'],
}))
@Form.create()
class BaseStaffs extends PureComponent {
  state = {
    isShowModal: false, //是否显示弹窗
    formVals: {},
    pageSize: 10,
    pageNum: 1,
  };

  isEdit = false //是否是编辑

  componentDidMount() {
    this.fetchData();
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
    { title: '角色名称', dataIndex: 'name' },
    { title: '备注信息', dataIndex: 'content' },
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
      type: 'role/fetch',
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

  //显示添加弹窗
  onShowAddModel = ()=>{
    this.isEdit = false;
    this.setModal(true);
  }

  //列表编辑
  onEdit = (record)=>{
    this.isEdit = true;
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
        <FormItem label="角色名称" labelCol={{span:4}} wrapperCol={{span:20}}>
          {getFieldDecorator('name',{
            initialValue:formVals.name,
            rules: [{ required: true, message: '请输入角色名称!', }],
          })(<Input placeholder="请输入角色名称" />)}
        </FormItem>
        <FormItem label="备注信息" labelCol={{span:4}} wrapperCol={{span:20}}>
          {getFieldDecorator('content',{
            initialValue:formVals.content,
          })(<TextArea placeholder="请输入备注信息" />)}
        </FormItem>
        <FormItem label="权限设置" labelCol={{span:4}} wrapperCol={{span:20}}>
          <RightsSet />
        </FormItem>

      </Form>
    )
  }

  render() {
    const { role, loading, } = this.props;
    console.log(router)
    const data = {
      list: role.list,
      pagination: {
        total:role.total,
        showTotal:t=>'共'+t+'条数据',
      }
    }

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.wrap}>
          <Row className="f-mb20">
            <Col span={6}>
              <Button type="primary" onClick={()=>this.onShowAddModel()}>添加角色</Button>
            </Col>
            <Col span={10} offset={8} xxl={{ span: 8, offset: 10 }}>
              <Search placeholder="请输入角色名称" enterButton
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

          <Modal title={this.isEdit?'编辑角色':'添加角色'} width={500} visible={this.state.isShowModal} onOk={this.onAdd} onCancel={()=>this.setModal(false)} maskClosable={false} destroyOnClose={true}>
            {this.renderForm()}
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
