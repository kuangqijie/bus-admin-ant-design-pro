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
    console.log(props);

    var {locationData} = props;
    var posList = {};
    for(let k in locationData){
      posList[Symbol(k)] = locationData[k];
    }

    this.state = {
      posList
    }
  }

  map = null;
  type = 1;
  areaNum = 0;

  //绘制区域样式配置
  polygonOptions = {
    strokeColor: "#1791FC", //线颜色
    strokeWeight: 2,    //线宽
    fillColor: "#1791FC", //填充色
    fillOpacity: 0.3//填充透明度
  };

  //区域节点change
  nodeChange = (polygon, key)=>{
    var {updateMapData} = this.props;
    var paths = polygon.getPath().map(item => {
      return [item.lng, item.lat]
    });
    this.state.posList[key] = paths;
    this.setState({posList: this.state.posList })
    console.log(this.state.posList)

    updateMapData(this.state.posList)
  }

  //绘制区域编辑功能Init, polygon=>多边形对象
  initAreaEdit = (polygon, key)=>{
    //通过AMap.PolyEditor插件开启多边形编辑
    var editPolygon = new AMap.PolyEditor(this.map, polygon);
    //editPolygon.open(); //开启编辑

    //节点change事件
    editPolygon.on('removenode',()=>{this.nodeChange(polygon, key)})
    editPolygon.on('adjust',()=>{this.nodeChange(polygon, key)})

    var contextMenu = new AMap.ContextMenu();  //创建右键菜单
    //右键删除
    contextMenu.addItem("删除此区域", ()=>{
      delete this.state.posList[key];
      editPolygon.close()
      this.map.remove(polygon);
      this.setState({posList: this.state.posList})
      this.props.updateMapData(this.state.posList)
    }, 0);

    //多边形绑定右键菜单
    polygon.on('rightclick',(e)=>{
      contextMenu.open(this.map, e.lnglat);
    })

    return editPolygon;
  }

  //点
  initMap = ()=>{
    console.log('init')
    var center = this.map ? this.map.getCenter() : '';
    //初始化地图
    var map = this.map = new AMap.Map(this.mapRef.current, {
      resizeEnable: true,
      center,
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

    //为地图注册click事件获取鼠标点击出的经纬度坐标
    map.on('click', function(e) {
      var lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]

      getAddress(lnglat).then(adress=>{
        map.clearMap();
        //标记点
        new AMap.Marker({
          map, //标记渲染的地图对象
          position: lnglat,
          label:{ //设置label标签
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: adress
          }
        });
      })
    });

  }

  //面
  initMap2 = ()=>{
    console.log('init2')
    var center = this.map ? this.map.getCenter() : '';
    //初始化地图
    var map = this.map = new AMap.Map(this.mapRef.current, {
      resizeEnable: true,
      center,
      zoom: 16
    });

    // if(this.props.belongCity){
    //   map.setCity(this.props.belongCity)
    // }

    //在地图中添加MouseTool插件
    var mouseTool = new AMap.MouseTool(map);

    var {posList} = this.state;
    var keys = Object.getOwnPropertySymbols(posList);

    var polygonList = [];
    //添加已有形状
    keys.forEach(item=>{
      var polygon = new AMap.Polygon({
        path: posList[item],//设置多边形边界路径
        ...this.polygonOptions
      });
      map.add(polygon)
      polygonList.push( this.initAreaEdit(polygon, item) );
    })

    //点击开始绘制
    AMap.event.addDomListener(this.mapBtnRef.current, 'click', ()=> {
      mouseTool.polygon(this.polygonOptions);

      //已有形状开启编辑
      for(let item of polygonList){
        item.open();
      }
    }, false);


    //监听绘制事件
    AMap.event.addListener( mouseTool,'draw',(e)=>{
      //e.obj为多边形对象 通过AMap.PolyEditor插件开启多边形编辑
      //var editPolygon = new AMap.PolyEditor(map, e.obj);
      //editPolygon.open();
      var {updateMapData} = this.props;

      this.areaNum++;
      var key = Symbol(this.areaNum);
      var paths = e.obj.getPath().map(item => {
        return [item.lng, item.lat]
      });

      //开启编辑
      this.initAreaEdit(e.obj, key).open();

      this.state.posList[key] = paths;
      this.setState({posList: this.state.posList })

      updateMapData(this.state.posList)
    });
  }

  componentDidMount(){
    this.initMap()
  }
  //父组件props改变
  componentWillReceiveProps(nextProps){
    var {stationType:preType} = this.props;
    var {stationType:nextType} = nextProps;
    var map = this.map;

    if(nextProps.isShowModal){
      //站点类型change 
      if(preType != nextType){
        if(nextType == 1){
          this.initMap()
        }else{
          this.initMap2()
        }
      }
    }else{
      //弹窗关闭重置map
      setTimeout(()=>{
        this.initMap()
      },0)
    }

    //详细地址change
    if(nextProps.address && nextProps.address != this.props.address){
      console.log(nextProps.address)
      var placeSearch = new AMap.PlaceSearch({
        type:'地名地址信息|公共设施',
        pageSize:5,
        children:1,
        autoFitView:true,
      });
      //根据输入地址查询
      placeSearch.search(nextProps.address, (status, res)=>{
        console.log(status, res)
        if(status=='complete' && res.info=='OK'){
          console.log(6)
          var poiArr = res.poiList.pois;
          map.clearMap();
          //添加marker
          var marker = new AMap.Marker({
              map,
              position: poiArr[0].location,
              label:{
                offset: new AMap.Pixel(20, 20), 
                content: poiArr[0].name
              }
          });
          map.setCenter(marker.getPosition())
          map.setZoom(16)
        }
      });
    }

    //所属城市change
    if(nextProps.belongCity && nextProps.belongCity != this.props.belongCity){
      //console.log(nextProps.belongCity)
      map.setCity(nextProps.belongCity)
      //console.log(map.getZoom())
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
    formVals: {},
    // stationLnglatList:[
    //   {index:0, lng:114.114089, lat:22.532949},
    //   {index:0, lng:114.117737, lat:22.531145},
    //   {index:0, lng:114.117715, lat:22.533999},
    // ],
    locationData:{ //经纬度数据
      '1':[
        [114.114089, 22.532949],
        [114.117737, 22.531145],
        [114.117715, 22.533999]
      ],
      //'2':[114.114089, 22.532949]
    }
  }

  //地图数据更新
  updateMapData = (data)=>{
    console.log(data);
    var keys = Object.getOwnPropertySymbols(data);
    var list = {};
    keys.forEach((item,index)=>{
      list[index] = data[item];
    })
    this.setState({locationData: list})
    console.log(this.state.locationData)
  }

  //类型change
  onTypeChange = (v)=>{
    var {form} = this.props;
    var fieldsValue = form.getFieldsValue();
    fieldsValue.stationType = v;
    this.setState({formVals: fieldsValue});
  }
  //所属城市change
  onCityChange = (v)=>{
    var {form} = this.props;
    var fieldsValue = form.getFieldsValue();
    fieldsValue.belongCity = v;
    this.setState({formVals: fieldsValue});
  }

  //详细地址输入地图联动
  onInputAddress = (e)=>{
    var {form} = this.props;
    var fieldsValue = form.getFieldsValue();
    this.setState({formVals: fieldsValue});
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
    this.setState({ formVals: {} });
  }

  render(){
    const {isShowModal, form:{getFieldDecorator}} = this.props;
    const { locationData, formVals} = this.state;

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
                  <Select placeholder="请选择" onChange={this.onTypeChange}>
                    <Option value="1">点</Option>
                    <Option value="2">面</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="所属区域" {...formItemLayout}>
                {getFieldDecorator('belongCity',{
                  rules: [{ required: true, message: '请选择所属区域!', }],
                })(
                  <Select placeholder="请选择" onChange={this.onCityChange}>
                    <Option value="010">北京</Option>
                    <Option value="021">上海</Option>
                    <Option value="0755">深圳</Option>
                    <Option value="0734">衡阳</Option>
                    <Option value="0731">长沙</Option>
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
            })(<Input placeholder="请输入详情地址" onKeyUp={this.onInputAddress} />)}
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
        <GDMap {...formVals} isShowModal={isShowModal} locationData={locationData} updateMapData={this.updateMapData} />
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
