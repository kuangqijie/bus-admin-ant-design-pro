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
  Popconfirm,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Promise, reject } from 'rsvp';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const { TextArea,Search } = Input;
const { Option } = Select;

const status = ['', '点', '面'];
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

//地图组件
class GDMap extends PureComponent{
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.mapBtnRef = React.createRef();
    //console.log(props);

    // var {location, dotData, stationType} = props;
    
    // var posList = {};
    // if(stationType==2){
    //   for(let k in location){
    //     posList[Symbol(k)] = location[k];
    //   }
    // }

    this.state = {
      posList: [],
      type: 1,
      city: ''
    }
    //console.log(this.state)
  }

  map = null;
  type = 1;
  areaNum = 0;

  componentDidMount(){
    var {location, stationType, belongCity} = this.props
    console.log(this.props)
    // if(location){
    //   if(stationType==1){
    //     this.setState({dotData: location})
    //   }
    // }

    // this.setState({
    //   posList: location,
    //   city: belongCity,
    //   type: stationType
    // })

    if(stationType == 1){
      this.initMap(belongCity, location)
    }else{
      this.initMap2(belongCity, location)
    }
  
  }

  //父组件props改变
  componentWillReceiveProps(nextProps){
    var {stationType:preType, updateMapData, preId} = this.props;
    var {stationType:nextType, nextId} = nextProps;
    var map = this.map;
    console.log(nextProps)
    if(nextProps.isShowModal){
      //站点类型change
      if(preType != nextType || preId != nextId){
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

    //所属城市change
    if(nextProps.belongCity && nextProps.belongCity != this.props.belongCity){
      console.log('setCity')
      map.setCity(nextProps.belongCity)
    }

    //详细地址change
    // if(nextProps.address && nextProps.address != this.props.address){
    //   console.log(nextProps.address)
    //   var placeSearch = new AMap.PlaceSearch({
    //     //type:'地名地址信息|公共设施',
    //     pageSize:5,
    //     children:1,
    //     autoFitView:true,
    //   });
    //   //根据输入地址查询
    //   placeSearch.search(nextProps.address, (status, res)=>{
    //     console.log(status, res)
    //     if(status=='complete' && res.info=='OK'){
    //       console.log(6)
    //       var poiArr = res.poiList.pois;
    //       map.clearMap();
    //       //添加marker
    //       var marker = new AMap.Marker({
    //           map,
    //           position: poiArr[0].location,
    //           label:{
    //             offset: new AMap.Pixel(20, 20),
    //             content: poiArr[0].name
    //           }
    //       });
    //       var pos = marker.getPosition();
    //       map.setCenter(pos)
    //       map.setZoom(16)
    //       this.setState({
    //         dotData:{position:[pos.lng, pos.lat], name:poiArr[0].name, type:'dot'}
    //       })

    //       updateMapData(this.state.dotData)
    //     }
    //   });
    // }
  }

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
      return item.lng+','+item.lat
    });
    //this.state.posList[key] = paths;
    //this.setState({posList: this.state.posList })
    //console.log(this.state.posList)

    updateMapData(paths)
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
      //delete this.state.posList[key];
      editPolygon.close()
      this.map.remove(polygon);
      //this.setState({posList: this.state.posList})
      this.props.updateMapData()
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
    //console.log(this.props)
    var {location, belongCity} = this.props
    //var center = this.state.dotData ? this.state.dotData.position : '';
    //console.log(this.state.dotData)
    //初始化地图
    var map = this.map = new AMap.Map(this.mapRef.current, {
      resizeEnable: true,
      //center,
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

    //定位到当前城市
    if(belongCity){
      map.setCity(belongCity);
    }else if(location){
      map.setCenter(location)
    }
    if(location){
      let lnglat = location.map(item=>parseFloat(item));
      getAddress(lnglat).then(address=>{
        //初始化创建标记点
        new AMap.Marker({
          map, 
          position: location,
          label:{ 
            offset: new AMap.Pixel(20, 20),
            content: address
          }
        });
      }).catch((err)=>{
        console.log(err)
      })
    }

    // if(center){
    //   //创建已有标记点
    //   new AMap.Marker({
    //     map, //标记渲染的地图对象
    //     position: center,
    //     label:{
    //       offset: new AMap.Pixel(20, 20),
    //       content: this.state.dotData.name
    //     }
    //   });
    // }

    //为地图注册click事件获取鼠标点击出的经纬度坐标
    map.on('click', (e)=>{
      var lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]
      console.log(lnglat)
      getAddress(lnglat).then(address=>{
        map.clearMap();
        //标记点
        new AMap.Marker({
          map, //标记渲染的地图对象
          position: lnglat,
          label:{ //设置label标签
            offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
            content: address
          }
        });
        // this.setState({
        //   dotData: {position:lnglat, name:address, type:'dot'}
        // })
        
        this.props.updateMapData([lnglat.join()])
      })
    });

  }

  //面
  initMap2 = ()=>{
    console.log('init2')
    // var {posList} = this.state;
    // var keys = Object.getOwnPropertySymbols(posList);

    // var center = '';
    // if(keys.length){
    //   center = posList[keys[0]][0]
    //   console.log(center)
    // }else{
    //   center = this.map ? this.map.getCenter() : '';
    // }
    //初始化地图
    var map = this.map = new AMap.Map(this.mapRef.current, {
      resizeEnable: true,
      //center,
      zoom: 10
    });

    var {location, belongCity} = this.props
    if(belongCity){
      map.setCity(belongCity);
    }else if(location){
      map.setCenter(location)
    }

    // if(this.props.belongCity){
    //   map.setCity(this.props.belongCity)
    // }

    //在地图中添加MouseTool插件
    var mouseTool = new AMap.MouseTool(map);

    var polygonList = [];
    //添加已有形状
    // keys.forEach(item=>{
    //   var polygon = new AMap.Polygon({
    //     path: posList[item],//设置多边形边界路径
    //     ...this.polygonOptions
    //   });
    //   map.add(polygon)
    //   polygonList.push( this.initAreaEdit(polygon, item) );
    // })

    //点击开始绘制
    AMap.event.addDomListener(this.mapBtnRef.current, 'click', ()=> {
      console.log(this.props.location)
      if(this.props.location){
        message.warning('最多只能绘制一个区域');
        return;
      }
      mouseTool.polygon(this.polygonOptions);

      //已有形状开启编辑
      for(let item of polygonList){
        item.open();
      }
    }, false);


    //监听绘制事件
    AMap.event.addListener( mouseTool,'draw',(e)=>{
      //e.obj为多边形对象
      var {updateMapData} = this.props;

      //this.areaNum++;
      //var key = Symbol(this.areaNum);
      var paths = e.obj.getPath().map(item => {
        return item.lng+','+item.lat;
      });

      //开启编辑
      this.initAreaEdit(e.obj).open();

      //this.state.posList[key] = paths;
      //this.setState({posList: this.state.posList })
      console.log(paths)
      updateMapData(paths)

      mouseTool.close();
    });
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
@connect(({ station, loading }) => ({
  station,
  loading: loading.effects['station/fetchCityList'],
}))
@Form.create()
class UpdateForm extends PureComponent{
  constructor(props){
    super(props)
    
    this.state = {
      id:'',
      formVals: {},
      location: [] //经纬度数据
      //['22.464,112.2245', '22.464,112.2245']
    }
  }
  
  flag = false;

  // componentDidMount(){ //获取城市列表
  //   console.log('form DidMount')
  //   var {  dispatch } = this.props;
  //   dispatch({
  //     type:'station/fetchCityList',
  //     payload:{
  //       typeId:1
  //     }
  //   })
  // }
  //父组件状态change
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps.isShowModal && !this.flag){
      console.log('set')
      this.flag = true;
      this.setState({
        id:nextProps.formVals.id || '',
        formVals:nextProps.formVals,
        location: nextProps.formVals.location
      })
    }
    if(!nextProps.isShowModal){
      this.flag = false;
    }
  }

  //地图数据更新
  updateMapData = (data)=>{
    console.log(data);
    // if(data.type == 'dot'){
    //   this.setState({location: data.position})
    // }else{
    //   var keys = Object.getOwnPropertySymbols(data);
    //   var list = {};
    //   keys.forEach((item,index)=>{
    //     list[index] = data[item];
    //   })
    //   this.setState({location: list})
    // }
    this.setState({location: data})
    console.log(this.state.location)
  }

  //类型change
  onTypeChange = (v)=>{
    this.setState((prevState, props) => ({
      formVals: {
        ...prevState.formVals,
        stationType: v,
      }
    }));
  }
  //所属城市change
  onCityChange = (v)=>{
    this.setState((prevState, props) => ({
      formVals: {
        ...prevState.formVals,
        belongCity: v,
      }
    }));
  }

  //详细地址输入地图联动
  // onInputAddress = (e)=>{
  //   var {form} = this.props;
  //   var fieldsValue = form.getFieldsValue();
  //   this.setState({formVals: fieldsValue});
  // }

  //弹窗点击确定
  onConfirm = ()=>{
    const {onUpdate, form} = this.props;

    form.validateFields((err, fieldsValue) => {
      //console.log(fieldsValue)
      if (err) return;
      var {location, id} = this.state;
      
      const values = {
        ...fieldsValue,
        location,
        id,
      };

      onUpdate(values);
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
    const { location, formVals} = this.state;

    return (
      <Modal title="添加站点" visible={isShowModal} width={700} onOk={this.onConfirm} onCancel={this.onCancel} maskClosable={false} destroyOnClose={true}>
        <Form layout="horizontal">
          <Row>
            <Col span={12}>
              <FormItem label="站点类型" {...formItemLayout}>
                {getFieldDecorator('stationType',{
                  initialValue:status[formVals.stationType],
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
                  initialValue:formVals.belongCity,
                  rules: [{ required: true, message: '请选择所属区域!', }],
                })(
                  <Select placeholder="请选择" onChange={this.onCityChange}>
                    <Option value='北京' code="010">北京</Option>
                    <Option value='上海' code="021">上海</Option>
                    <Option value='深圳' code="0755">深圳</Option>
                    <Option value='衡阳' code="0734">衡阳</Option>
                    <Option value='长沙' code="0731">长沙</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="站点全称" {...formItemLayout}>
                {getFieldDecorator('name',{
                  initialValue:formVals.name,
                  rules: [{ required: true, message: '请输入站点全称!', }],
                })(<Input placeholder="请输入站点全称" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="简称" {...formItemLayout}>
                {getFieldDecorator('aliasName',{
                  initialValue:formVals.aliasName,
                  rules: [{ required: true, message: '请输入站点简称!', }],
                })(<Input placeholder="请输入站点简称" />)}
              </FormItem>
            </Col>
          </Row>
          {formVals.stationType==1 && 
          <FormItem label="详情地址" labelCol={{span:4}} wrapperCol={{span:20}}>
            {getFieldDecorator('address',{
              initialValue:formVals.address,
              rules: [{ required: true, message: '请输入详情地址!', }],
            })(<Input placeholder="请输入详情地址" />)}
          </FormItem>}
          <Row>
            <Col span={12}>
              <FormItem label="编码" {...formItemLayout}>
                {getFieldDecorator('code',{
                  initialValue:formVals.code,
                  rules: [{ required: true, message: '请输入编码!', }],
                })(<Input placeholder="请输入编码" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <GDMap isShowModal={isShowModal} stationType={formVals.stationType} location={location} belongCity={formVals.belongCity} updateMapData={this.updateMapData} />
      </Modal>
    )
  }
}

export default
@connect(({ station, loading }) => ({
  station,
  loading: loading.effects['station/fetch'],
}))
class BaseStation extends PureComponent {
  state = {
    isShowModal: false,
    isEdit: false,
    pageNum:1,
    pageSize:10,
    keyWords:'',
    formVals:{
      stationType:1
    },
    location:[],
  }

  componentDidMount() {
    this.fetchData();
  }

  //获取数据
  fetchData(params){
    //console.log(66)
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
  onSearch = (v)=>{
    this.fetchData({keyWords: v, pageNum:1})
    this.setState({keyWords: v, pageNum:1});
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
    this.setState({
      pageNum:pagination.current, 
      pageSize:pagination.pageSize, 
    })
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
            <Button type="primary" size="small" className="f-mr10" onClick={()=>this.onEdit(record)}>编辑</Button>
            <Popconfirm title="确定要删除这条数据吗?" onConfirm={()=>this.onDelete(record.id, record.delFlag)}>
              <Button type="primary" size="small" className="f-bg1">删除</Button>
            </Popconfirm>
          </Fragment>
        )
      },
    },
  ];

  //设置弹窗是否显示
  setModal = (b)=>{
    this.setState({isShowModal: b});
  }

  //删除
  onDelete = (id, delFlag)=>{
    var {dispatch} = this.props;
    dispatch({
      type:'station/delete',
      payload:{id, delFlag},
      callback:(res)=>{
        if(res.status){
          message.success('删除成功')
        }
        this.fetchData();
      }
    })
  }

  //点击编辑
  onEdit = (record)=>{
    //console.log(record)
    var values = {
      ...record,
      location: record.location? record.location.split(','): ''
    }
    this.setState({
      formVals: {...values},
      location: values.location
    })
    this.setModal(true);
  }

  //添加&编辑站点
  onUpdate = (data)=>{
    console.log(data);
    var {dispatch} = this.props;
    dispatch({
      type:'station/update',
      payload:{
        businessType:'广东',
        businessType:1,
        ...data,
        //location: data.location ? data.location.join() : '',
      },
      callback:()=>{
        console.log(99)
      }
    }).then(()=>{
      console.log(100)
      this.fetchData();
    })
    this.setModal(false);
  }

  render() {
    const {
      station,
      loading
    } = this.props;

    const data = {
      list: station.list,
      pagination: {
        current: this.state.pageNum,
        total:station.total,
        showTotal:t=>'共'+t+'条数据',
      }
    }


    const updateFormProp = {
      onUpdate: this.onUpdate,
      setModal: this.setModal,
      isShowModal: this.state.isShowModal,
      formVals: this.state.formVals,
      location: this.state.location
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false} className={styles.wrap}>

          <Row className="f-mb20">
            <Col span={6}>
              <Button type="primary" onClick={()=>this.setModal(true)}>添加站点</Button>
            </Col>
            <Col span={10} offset={8} xxl={{ span: 8, offset: 10 }}>
              <Search placeholder="请输入站点名称" enterButton
                onSearch={(v)=>this.onSearch(v)}
              />
            </Col>
          </Row>

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
