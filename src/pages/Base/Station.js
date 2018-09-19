import React, { PureComponent, Component, Fragment } from 'react';
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
import { Promise, reject } from 'rsvp';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const status = ['点', '面'];
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

//地图组件
class GDMap extends Component{
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.mapBtnRef = React.createRef();

    this.state = {
      posList:{
        [Symbol()]:[
          [114.114089, 22.532949],
          [114.117737, 22.531145],
          [114.117715, 22.533999]
        ]
      }
    }
  }

  map = null;
  type = 1;
  areaNum = 0;

  nodeChange = (e, key)=>{
    var paths = e.obj.getPath().map(item => {
      return [item.lng, item.lat]
    });
    this.state.posList[key] = paths;
    this.setState({posList: this.state.posList })
    console.log(this.state.posList)
  }

  //点
  initMap = ()=>{
    console.log('init')
    //初始化地图
    var map = this.map = new AMap.Map(this.mapRef.current, {
      cursor: 'default',
      center:[116.406956,39.905019],
      zoom: 10
    });


    //初始化地理编码对象
    var geocoder = new AMap.Geocoder();

    //根据坐标获取详细地址
    function getAddress(lnglat){
      var p = new Promise((resolve,reject)=>{
        geocoder.getAddress(lnglat, function(status, result) {
          if (status === 'complete' && result.regeocode) {
            var address = result.regeocode.formattedAddress;
            resolve(address);
          }else{
            reject(JSON.stringify(result))
          }
        });
      })
      return p;
    }

    var markerDot = {};
    var n = 0;
    //为地图注册click事件获取鼠标点击出的经纬度坐标
    map.on('click', function(e) {
      var lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]

      getAddress(lnglat).then(adress=>{
        n++;
        //标记点
        markerDot[n] = new AMap.Marker({ position: lnglat });
        // 设置label标签 默认蓝框白底左上角显示，样式className为：amap-marker-label
        markerDot[n].setLabel({
          offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
          content: adress
        });

        map.add(markerDot[n])
        if(markerDot[n-1]){ //删除前一个点
          map.remove(markerDot[n-1])
        }
      })
    });

  }

  //面
  initMap2 = ()=>{
    console.log('init2')
    
    //初始化地图
    var map = this.map = new AMap.Map(this.mapRef.current, {
      cursor: 'default',
      center:[114.117361,22.532572],
      zoom: 16
    });

    //在地图中添加MouseTool插件
    var mouseTool = new AMap.MouseTool(map);
    console.log(mouseTool)
    var {posList} = this.state;
    var keys = Object.getOwnPropertySymbols(posList);

    var polygonList = {}
    var polygonNum = 0;
    keys.forEach(item=>{
      polygonNum++;
      var polygon = new AMap.Polygon({
        path: posList[item],//设置多边形边界路径
        // strokeColor: "#FF33FF", //线颜色
        // strokeOpacity: 0.2, //线透明度
        // strokeWeight: 3,    //线宽
        // fillColor: "#1791fc", //填充色
        // fillOpacity: 0.35//填充透明度
      });
      polygonList[polygonNum] = polygon;
      //添加已有的形状
      map.add(polygon)
      //mouseTool.polygon({path:posList[item]})
    })
  
  
    //点击开始绘制
    AMap.event.addDomListener(this.mapBtnRef.current, 'click', ()=> {
      mouseTool.polygon();

      //已有形状开启编辑
      for(let [key, val] of Object.entries(polygonList)){
        console.log(key,val)
        let editPolygon = new AMap.PolyEditor(map, val);
        editPolygon.open(); //开启编辑
      }
    }, false);


    //监听绘制事件
    AMap.event.addListener( mouseTool,'draw',(e)=>{ 
      //e.obj为多边形对象 通过AMap.PolyEditor插件开启多边形编辑
      var editPolygon = new AMap.PolyEditor(map, e.obj);
      editPolygon.open(); //开启编辑
      this.areaNum++;
      var key = Symbol(this.areaNum);
      var paths = e.obj.getPath().map(item => {
        return {lng:item.lng, lat:item.lat}
      });

      //节点change事件
      //editPolygon.on('addnode',()=>{this.nodeChange(e, key)})
      editPolygon.on('removenode',()=>{this.nodeChange(e, key)})
      editPolygon.on('adjust',()=>{this.nodeChange(e, key)})

      var contextMenu = new AMap.ContextMenu();  //创建右键菜单
      //右键放大
      contextMenu.addItem("删除此区域", ()=>{
        delete this.state.posList[key];
        editPolygon.close()
        this.map.remove(e.obj);
        this.setState({posList: this.state.posList})
      }, 0);

      //多边形绑定右键菜单
      e.obj.on('rightclick',(e)=>{
        contextMenu.open(this.map, e.lnglat);
      })

      this.state.posList[key] = paths;
      this.setState({posList: this.state.posList })
      //this.state.proList.push(paths);
      //this.setState({posList: this.state.posList.concat(paths)})
      console.log(this.state.posList)
    });
  }

  componentDidMount(){
    this.initMap()
  }
  componentWillUpdate(props){
    var stationType = props.stationType;
    console.log(props)
    if(props.isShowModal){
      if(stationType != this.type || !this.map){
        this.type = stationType;
        
        if(stationType == 1){
          this.initMap()
        }else{
          this.initMap2()
        }
        
      }
    }else{
      if(this.map){
        //this.map.destroy();
        this.type = stationType==1 ? 2 : 1;
      }
    }
  }

  render(){
    const {stationType} = this.props;
    
    return(
      <div className="f-mb10 f-pr">
        <div ref={this.mapRef} className={styles.map}></div>
        <span ref={this.mapBtnRef} className={styles.mapBtn} style={{display:stationType==2?'':'none'}}><Button type="primary">点击绘制区域</Button></span>
      </div>
    )
  }
}

//添加&编辑站点弹窗组件
@Form.create()
class UpdateForm extends Component{

  state = {
    stationType:1,
    formVals: {},
    stationLnglatList:[ //经纬度数据
      {index:0, lng:24, lat:56},
      {index:0, lng:24, lat:56},
      {index:0, lng:24, lat:56},
      {index:1, lng:24, lat:56},
      {index:1, lng:24, lat:56},
      {index:1, lng:24, lat:56},
    ] 
  }

  onTtypeChange = (v)=>{
    this.setState({stationType:v});
  }
  //弹窗点击确定
  onConfirm = ()=>{
    const {onUpdate, form} = this.props;

    form.validateFields((err, fieldsValue) => {
      //console.log(fieldsValue)
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      onUpdate();
    });

  }
  //弹窗点击取消
  onCancel = ()=>{
    const {setModal, form} = this.props;
    setModal(false)
    //重置表单
    form.resetFields();
    this.setState({
      stationType:1
    });
  }

  render(){
    const {isShowModal, setModal, form:{getFieldDecorator}} = this.props;

    return (
      <Modal title="添加站点" visible={isShowModal} width={700} onOk={this.onConfirm} onCancel={this.onCancel} maskClosable={false}>
        <Form layout="horizontal">
          <Row>
            <Col span={12}>
              <FormItem label="站点类型" {...formItemLayout}>
                {getFieldDecorator('stationType',{
                  initialValue:'1',
                  rules: [{ required: true, message: '请选择站点类型!', }],
                })(
                  <Select placeholder="请选择" onChange={this.onTtypeChange}>
                    <Option value="1">点</Option>
                    <Option value="2">面</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="所属区域" {...formItemLayout}>
                {getFieldDecorator('area',{
                  rules: [{ required: true, message: '请选择所属区域!', }],
                })(
                  <Select placeholder="请选择">
                    <Option value="1">北京</Option>
                    <Option value="2">上海</Option>
                    <Option value="3">深圳</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="站点全称" {...formItemLayout}>
                {getFieldDecorator('name',{
                  rules: [{ required: true, message: '请输入站点全称!', }],
                })(<Input placeholder="请输入站点全称" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="简称" {...formItemLayout}>
                {getFieldDecorator('aliasName',{
                  rules: [{ required: true, message: '请输入站点简称!', }],
                })(<Input placeholder="请输入站点简称" />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="详情地址" labelCol={{span:4}} wrapperCol={{span:20}}>
            {getFieldDecorator('address',{
              rules: [{ required: true, message: '请输入详情地址!', }],
            })(<Input placeholder="请输入详情地址" />)}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem label="编码" {...formItemLayout}>
                {getFieldDecorator('code',{
                  rules: [{ required: true, message: '请输入编码!', }],
                })(<Input placeholder="请输入编码" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <GDMap isShowModal={isShowModal} stationType={this.state.stationType} />
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
    pageNum:1,
    pageSize:10,
    keyWords:''
  }

  componentDidMount() {
    this.fetchData();
  }

  //获取数据
  fetchData(params){
    const { dispatch } = this.props;
    let { pageNum, pageSize,keyWords} = this.state;
    dispatch({
      type: 'station/fetch',
      payload:{
        pageNum,
        pageSize,
        keyWords,
        ...params
      }
    });
  }

  //搜索
  onSearch = (e)=>{
    e.preventDefault();

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue)
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      this.fetchData({pageNum:1, ...values})
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
    this.fetchData(params);
  };

  columns = [
    { title: '编号', dataIndex: 'id' },
    {
      title: '站点类型',
      dataIndex: 'stationType',
      filters: [
        { text: status[0], value: 1 },
        { text: status[1], value: 2 }
      ],
      filterMultiple:false, //设置是否多选
      render(val) {
        return <span>{status[val-1]}</span>;
      },
    },
    { title: '站点全称', dataIndex: 'name', },
    { title: '简称', dataIndex: 'aliasName', },
    { title: '编码', dataIndex: 'code', },
    { title: '所属区域', dataIndex: 'belongCity', },
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

  //添加&编辑站点
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

    const data = {
      list: station.list,
      pagination: {
        total:station.total,
        showTotal:t=>'共'+t+'条数据',
      }
    }


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
                {getFieldDecorator('keyWords')(<Input style={{width:260}} placeholder="请输入站点名称" />)
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
            data={data}
            //isSetRowSelect={true} //设置表格是否可选
            columns={this.columns}
            onChange={this.onTableChange}
            scroll={{ x: 1000 }}
            rowKey='id'
          />
        </Card>

        <UpdateForm {...updateFormProp} />
      </PageHeaderWrapper>
    );
  }
}
