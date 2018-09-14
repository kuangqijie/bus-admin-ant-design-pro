import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';

import styles from './Station.less';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const status = ['点', '区域'];

@Form.create()
class UpdateForm extends PureComponent{
  state = {
    formVals: {
      type: '',
      area: '',
    }
  }

  onConfirm = ()=>{
    const {onUpdate} = this.props;
    console.log(6)
    onUpdate();
  }

  render(){
    const {isShowModal, setModal, form:{getFieldDecorator}} = this.props;

    return (
      <Modal title="添加站点" visible={isShowModal} onOk={this.onConfirm} onCancel={()=>setModal(false)}>
        <Form layout="inline">
          <Row>
            <Col span={12}>
              <FormItem label="站点类型">
                {getFieldDecorator('type')(<Input placeholder="请输入手机或身份证号" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="所属区域">
                {getFieldDecorator('area')(
                  <Select placeholder="请选择" style={{ width: '100%' }}>
                    <Option value="1">北京</Option>
                    <Option value="2">上海</Option>
                    <Option value="3">深圳</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default
@connect(({ station, loading }) => ({
  station,
  loading: loading.effects['station/fetch'],
}))
@Form.create()
class BaseStation extends PureComponent {
  state = {
    isShowModal: false,
    isEdit: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'station/fetch',
    });
  }

  //搜索
  onSearch = (e)=>{
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue)
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });
    });
  }

  //table change
  onTableChange = (pagination, filtersArg, sorter)=>{
    console.log(filtersArg)
  }

  columns = [
    { title: '编号', dataIndex: 'id' },
    {
      title: '站点类型',
      dataIndex: 'type',
      filters: [
        {
          text: status[0],
          value: 1,
        },
        {
          text: status[1],
          value: 2,
        }
      ],
      render(val) {
        return <span>{status[val-1]}</span>;
      },
    },
    { title: '站点全称', dataIndex: 'fullName', },
    { title: '简称', dataIndex: 'name', },
    { title: '编码', dataIndex: 'code', },
    { title: '所属区域', dataIndex: 'area', },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 140,
      fixed: 'right',
      render: (text, record, index) => {
        return (
          <Fragment>
            <Button type="primary" size="small" className="f-mr10">编辑</Button>
            <Button type="primary" size="small" className="f-bg1">删除</Button>
          </Fragment>
        )
      },
    },
  ];

  //设置弹窗是否显示
  setModal = (b)=>{
    this.setState({isShowModal: b});
  }

  //点击弹窗 ok
  onUpdate = (flag)=>{
    //console.log(flag);
    this.setModal(false);
  }

  render() {
    const {
      form: { getFieldDecorator },
      station,
      loading
    } = this.props;

    const updateFormProp = {
      onUpdate: this.onUpdate,
      setModal: this.setModal,
      isShowModal: this.state.isShowModal
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.wrap}>
          <div className="f-mb15 f-clearFix">
            <Button type="primary" className="f-fl" onClick={()=>this.setModal(true)}>添加站点</Button>

            <Form onSubmit={this.onSearch} layout="inline" className="f-fr">
              <FormItem label="关键字">
                {getFieldDecorator('keyword')(<Input style={{width:260}} placeholder="请输入站点名称" />)
                }
              </FormItem>
              <FormItem style={{marginRight:0}}>
                <Button type="primary" htmlType="submit"> 查询 </Button>
              </FormItem>
            </Form>
          </div>

          <StandardTable
              bordered={true}
              loading={loading}
              data={station}
              //isSetRowSelect={true} //设置表格是否可选
              columns={this.columns}
              onChange={this.onTableChange}
              scroll={{ x: 1000 }}
            />
        </Card>

        <UpdateForm {...updateFormProp} />
      </PageHeaderWrapper>
    );
  }
}
