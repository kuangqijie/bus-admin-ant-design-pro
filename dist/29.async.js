(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[29],{kAJ7:function(e,t,a){e.exports={title:"antd-pro\\pages\\-bus\\-order-detail-title",wrap:"antd-pro\\pages\\-bus\\-order-detail-wrap"}},zued:function(e,t,a){"use strict";var l=a("0ZgE"),r=a("VY4n");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("UsS6");var n=l(a("xqAZ"));a("3PXm");var d=l(a("m2aW"));a("ggfa");var i=l(a("M+wZ"));a("pdEl");var u=l(a("0Hx8")),o=l(a("U2oY")),f=l(a("TFzq")),c=l(a("DEU0")),s=l(a("+hkI")),m=l(a("54rf")),y=l(a("oHNe"));a("Qd5y");var p,v,g=l(a("wyIq")),k=r(a("PQfD")),E=a("rAnT"),x=l(a("+kNj")),I=l(a("zHco")),N=a("+n12"),b=l(a("kAJ7")),h=x.default.Description,w={1:"\u8ba2\u5355\u65b0\u5efa",2:"\u8ba2\u5355\u5df2\u8d85\u65f6",3:"\u8ba2\u5355\u5df2\u53d6\u6d88",4:"\u8ba2\u5355\u51fa\u7968\u4e2d",5:"\u8ba2\u5355\u6210\u529f",6:"\u8ba2\u5355\u5931\u8d25",7:"\u8ba2\u5355\u5df2\u9000\u7968",8:"\u8ba2\u5355\u5f02\u5e38"},D=[{title:"\u884c\u7a0b\u7c7b\u578b",dataIndex:"tripType"},{title:"\u4e58\u5ba2\u540d",dataIndex:"username"},{title:"\u8bc1\u4ef6\u7c7b\u578b",dataIndex:"certType"},{title:"\u8bc1\u4ef6\u53f7\u7801",dataIndex:"certId"},{title:"\u51fa\u751f\u65e5\u671f",dataIndex:"birthday"},{title:"\u4fdd\u9669\u540d\u79f0",dataIndex:"insName"},{title:"\u4fdd\u5355\u53f7",dataIndex:"insId"},{title:"\u4fdd\u9669\u4efd\u6570",dataIndex:"insNum"},{title:"\u4fdd\u9669\u72b6\u6001",dataIndex:"insStatus",render:function(e){return"success"===e?k.default.createElement(g.default,{status:"success",text:"\u6210\u529f"}):k.default.createElement(g.default,{status:"processing",text:"\u8fdb\u884c\u4e2d"})}},{title:"\u64cd\u4f5c",dataIndex:"operate"}],B=[{title:"\u4e58\u5ba2\u540d",dataIndex:"name"},{title:"\u8bc1\u4ef6",dataIndex:"certificateNo"},{title:"\u8054\u7cfb\u7535\u8bdd",dataIndex:"mobilePhone"}],S=(p=(0,E.connect)(function(e){var t=e.busOrderDetail,a=e.loading;return{orderDetail:t,loading:a.effects["busOrderDetail/fetch"]}}),p(v=function(e){function t(){return(0,f.default)(this,t),(0,s.default)(this,(0,m.default)(t).apply(this,arguments))}return(0,y.default)(t,e),(0,c.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch,t=(0,N.getPageQuery)();e({type:"busOrderDetail/fetch",payload:(0,o.default)({},t)})}},{key:"render",value:function(){var e=this.props,t=e.loading,a=e.orderDetail,l=[{key:"\u8ba2\u5355\u72b6\u6001",val:w[a.orderStatus]},{key:"\u51fa\u53d1\u65e5\u671f",val:a.startDate},{key:"\u51fa\u53d1\u65f6\u95f4",val:a.startTime},{key:"\u51fa\u53d1\u7ad9",val:a.startStationName},{key:"\u5230\u8fbe\u7ad9",val:a.endStationName},{key:"\u652f\u4ed8\u603b\u91d1\u989d",val:a.totalMoney},{key:"\u7968\u4ef7\u603b\u91d1\u989d",val:a.totalMoney},{key:"\u5dee\u989d\u9000\u6b3e",val:"0"},{key:"\u8ba2\u5355\u53f7",val:a.orderNo},{key:"\u4fdd\u9669\u4ef7\u683c",val:a.insurancePrice},{key:"\u9000\u7968\u72b6\u6001",val:""},{key:"\u53d6\u7968\u72b6\u6001",val:""}],r=[{key:"\u8f66\u7ad9\u540d",val:""},{key:"\u8f66\u7ad9\u5730\u5740",val:""},{key:"\u8054\u7cfb\u7535\u8bdd",val:""}],o=[],f=[],c=function(){return l.map(function(e,t){return k.default.createElement(h,{key:t,term:e.key},e.val)})},s=function(){return r.map(function(e,t){return k.default.createElement(h,{key:t,term:e.key},e.val)})};return k.default.createElement(I.default,null,k.default.createElement(n.default,{bordered:!1,className:b.default.wrap},k.default.createElement(x.default,{size:"large",col:4,title:"\u8ba2\u5355\u4fe1\u606f",style:{marginBottom:32}},c()),k.default.createElement(u.default,{style:{marginBottom:32}}),k.default.createElement("div",{className:b.default.title},"\u4e58\u5ba2\u4fe1\u606f"),k.default.createElement(i.default,{bordered:!0,style:{marginBottom:30},pagination:!1,loading:t,dataSource:a.passengerInfo,columns:B,rowKey:"name"}),k.default.createElement(x.default,{size:"large",col:4,title:"\u8f66\u7ad9\u4fe1\u606f",style:{marginBottom:32}},s()),k.default.createElement(u.default,{style:{marginBottom:32}}),k.default.createElement(x.default,{size:"large",col:1,title:"\u77ed\u4fe1\u5217\u8868",style:{marginBottom:32}},o.map(function(e,t){return k.default.createElement(h,{key:t},e)})),k.default.createElement(u.default,{style:{marginBottom:32}}),k.default.createElement("div",{className:b.default.title},"\u4fdd\u9669\u4fe1\u606f"),k.default.createElement(i.default,{bordered:!0,style:{marginBottom:30},pagination:!1,loading:t,dataSource:f,columns:D}),k.default.createElement("div",{className:"f-tc"},k.default.createElement(d.default,{type:"primary",className:"f-mr10",icon:"close"},"\u53d6\u6d88\u8ba2\u5355"),k.default.createElement(d.default,{type:"primary",className:"f-mr10 f-bg2",icon:"upload"},"\u50ac\u51fa\u7968"),k.default.createElement(d.default,{type:"primary",className:"f-mr10 f-bg1",icon:"export"},"\u9000\u7968\u9000\u6b3e"),k.default.createElement(d.default,{type:"primary",className:"f-mr10",icon:"mail"},"\u8865\u53d1\u77ed\u4fe1"),k.default.createElement(d.default,{type:"primary",className:"f-mr10 f-bg1",icon:"notification"},"\u53d1\u9001\u91cd\u8981\u901a\u77e5"),k.default.createElement(d.default,{type:"primary",icon:"file-text"},"\u67e5\u770b\u91cd\u8981\u901a\u77e5"))))}}]),t}(k.Component))||v);t.default=S}}]);