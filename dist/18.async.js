(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{G0w1:function(e,t,a){e.exports={wrap:"antd-pro\\pages\\-platform\\-role-wrap"}},TrZC:function(e,t,a){"use strict";var n=a("0ZgE"),l=a("VY4n");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("UsS6");var r=n(a("xqAZ"));a("NG6T");var o=n(a("uZXS"));a("sL9k");var d=n(a("BlmP"));a("hjcW");var u=n(a("Tmqy")),i=n(a("U2oY"));a("8EHj");var c=n(a("6xKx"));a("3PXm");var s=n(a("m2aW"));a("Qd5y");var f=n(a("wyIq")),p=n(a("TFzq")),h=n(a("DEU0")),m=n(a("+hkI")),y=n(a("54rf")),E=n(a("oHNe"));a("4Th3");var g=n(a("ZGjQ"));a("YJ5n");var k=n(a("Vb+q"));a("6ASg");var v=n(a("pKc7"));a("0lkx");var x=n(a("gEKc"));a("M50D");var S,w,C,b=n(a("5Zb7")),N=l(a("PQfD")),K=a("rAnT"),M=(n(a("zYb/")),n(a("GhrY"))),T=n(a("CkN6")),z=n(a("zHco")),D=n(a("G0w1")),A=b.default.Item,P=x.default.TextArea,I=x.default.Search,V=(v.default.Option,k.default.Group,g.default.TreeNode),j=function(e){return Object.keys(e).map(function(t){return e[t]}).join(",")},F={1:"\u542f\u7528",2:"\u505c\u7528"},q=function(e){function t(){var e,a;(0,p.default)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return a=(0,m.default)(this,(e=(0,y.default)(t)).call.apply(e,[this].concat(l))),a.state={autoExpandParent:!0,selectedKeys:[]},a.treeData=[{title:"\u5e73\u53f0\u7ba1\u7406",key:"0-0",children:[{title:"\u89d2\u8272\u7ba1\u7406",key:"0-0-0"},{title:"\u7528\u6237\u7ba1\u7406",key:"0-0-1"}]},{title:"\u57fa\u7840\u8bbe\u7f6e",key:"0-1",children:[{title:"\u57fa\u672c\u4fe1\u606f",key:"0-1-0"},{title:"\u57ce\u5e02\u7ba1\u7406",key:"0-1-1"},{title:"\u7ad9\u70b9\u8bbe\u7f6e",key:"0-1-2"},{title:"\u8f66\u578b\u7ba1\u7406",key:"0-1-3"}]},{title:"\u6c7d\u8f66\u7968",key:"0-2",children:[{title:"\u8ba2\u5355\u7ba1\u7406",key:"0-2-0"}]}],a.onExpand=function(e){console.log("onExpand",e),a.setState({expandedKeys:e,autoExpandParent:!1})},a.onCheck=function(e){console.log("onCheck",e),a.setState({checkedKeys:e})},a.onSelect=function(e,t){console.log("onSelect",t),a.setState({selectedKeys:e})},a.renderTreeNodes=function(e){return e.map(function(e){return e.children?N.default.createElement(V,{title:e.title,key:e.key,dataRef:e},a.renderTreeNodes(e.children)):N.default.createElement(V,e)})},a}return(0,E.default)(t,e),(0,h.default)(t,[{key:"render",value:function(){return N.default.createElement(g.default,{checkable:!0,onExpand:this.onExpand,expandedKeys:this.state.expandedKeys,autoExpandParent:this.state.autoExpandParent,onCheck:this.onCheck,checkedKeys:this.state.checkedKeys,onSelect:this.onSelect,selectedKeys:this.state.selectedKeys},this.renderTreeNodes(this.treeData))}}]),t}(N.PureComponent),G=(S=(0,K.connect)(function(e){var t=e.role,a=e.loading;return{role:t,loading:a.effects["role/fetch"]}}),w=b.default.create(),S(C=w(C=function(e){function t(){var e,a;(0,p.default)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return a=(0,m.default)(this,(e=(0,y.default)(t)).call.apply(e,[this].concat(l))),a.state={isShowModal:!1,formVals:{},pageSize:10,pageNum:1},a.isEdit=!1,a.columns=[{title:"\u7f16\u53f7",dataIndex:"id"},{title:"\u72b6\u6001",dataIndex:"status",filters:[{text:F[1],value:1},{text:F[2],value:2}],filterMultiple:!1,render:function(e){return 1==e?N.default.createElement(f.default,{status:"success",text:F[e]}):2==e?N.default.createElement(f.default,{status:"error",text:F[e]}):void 0}},{title:"\u89d2\u8272\u540d\u79f0",dataIndex:"name"},{title:"\u5907\u6ce8\u4fe1\u606f",dataIndex:"content"},{title:"\u64cd\u4f5c",dataIndex:"operate",width:140,fixed:"right",render:function(e,t,n){return N.default.createElement(N.Fragment,null,N.default.createElement(s.default,{type:"primary",size:"small",className:"f-mr10",onClick:function(){return a.onEdit(t)}},"\u7f16\u8f91"),N.default.createElement(c.default,{title:"\u786e\u5b9a\u8981\u5220\u9664\u8fd9\u6761\u6570\u636e\u5417?",onConfirm:function(){return a.onDelete(t.id,t.delFlag)}},N.default.createElement(s.default,{type:"primary",size:"small",className:"f-bg1"},"\u5220\u9664")))}}],a.fetchData=function(e){var t=a.props.dispatch;t({type:"role/fetch",payload:(0,i.default)({pageNum:a.state.pageNum,pageSize:a.state.pageSize},e)})},a.onTableChange=function(e,t,n){var l=a.state.formVals,r=Object.keys(t).reduce(function(e,a){var n=(0,i.default)({},e);return n[a]=j(t[a]),n},{}),o=(0,i.default)({pageNum:e.current,pageSize:e.pageSize},l,r);a.setState({pageSize:e.pageSize}),n.field&&(o.sorter="".concat(n.field,"_").concat(n.order)),a.fetchData(o)},a.onAdd=function(){var e=a.props.form;e.validateFields(function(e,t){e||(console.log(t),a.setModal(!1))})},a.onShowAddModel=function(){a.isEdit=!1,a.setModal(!0)},a.onEdit=function(e){a.isEdit=!0,a.setState({formVals:e}),a.setModal(!0)},a.onDelete=function(e){},a.setModal=function(e){a.setState({isShowModal:e})},a.onChangeCate=function(){},a.onSearch=function(e){console.log(e)},a.renderForm=function(){var e=a.props.form.getFieldDecorator,t=a.state.formVals;return N.default.createElement(b.default,{layout:"horizontal"},N.default.createElement(A,{label:"\u89d2\u8272\u540d\u79f0",labelCol:{span:4},wrapperCol:{span:20}},e("name",{initialValue:t.name,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u89d2\u8272\u540d\u79f0!"}]})(N.default.createElement(x.default,{placeholder:"\u8bf7\u8f93\u5165\u89d2\u8272\u540d\u79f0"}))),N.default.createElement(A,{label:"\u5907\u6ce8\u4fe1\u606f",labelCol:{span:4},wrapperCol:{span:20}},e("content",{initialValue:t.content})(N.default.createElement(P,{placeholder:"\u8bf7\u8f93\u5165\u5907\u6ce8\u4fe1\u606f"}))),N.default.createElement(A,{label:"\u6743\u9650\u8bbe\u7f6e",labelCol:{span:4},wrapperCol:{span:20}},N.default.createElement(q,null)))},a}return(0,E.default)(t,e),(0,h.default)(t,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"render",value:function(){var e=this,t=this.props,a=t.role,n=t.loading;console.log(M.default);var l={list:a.list,pagination:{total:a.total,showTotal:function(e){return"\u5171"+e+"\u6761\u6570\u636e"}}};return N.default.createElement(z.default,null,N.default.createElement(r.default,{bordered:!1,className:D.default.wrap},N.default.createElement(d.default,{className:"f-mb20"},N.default.createElement(u.default,{span:6},N.default.createElement(s.default,{type:"primary",onClick:function(){return e.onShowAddModel()}},"\u6dfb\u52a0\u89d2\u8272")),N.default.createElement(u.default,{span:10,offset:8,xxl:{span:8,offset:10}},N.default.createElement(I,{placeholder:"\u8bf7\u8f93\u5165\u89d2\u8272\u540d\u79f0",enterButton:!0,onSearch:function(t){return e.onSearch(t)}}))),N.default.createElement(T.default,{bordered:!0,loading:n,data:l,columns:this.columns,rowKey:"id",onChange:this.onTableChange}),N.default.createElement(o.default,{title:this.isEdit?"\u7f16\u8f91\u89d2\u8272":"\u6dfb\u52a0\u89d2\u8272",width:500,visible:this.state.isShowModal,onOk:this.onAdd,onCancel:function(){return e.setModal(!1)},maskClosable:!1,destroyOnClose:!0},this.renderForm())))}}]),t}(N.PureComponent))||C)||C);t.default=G}}]);