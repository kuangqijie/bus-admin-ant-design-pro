(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{psRr:function(t,e,a){"use strict";var n=a("0ZgE");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(a("U2oY")),s=n(a("0pfo")),c=a("JrP0"),u={namespace:"station",state:{list:[],total:0,cityList:[]},effects:{fetch:s.default.mark(function t(e,a){var n,r,u,i;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=a.call,u=a.put,t.next=4,r(c.queryStationList,n);case 4:return i=t.sent,console.log(i),t.next=8,u({type:"save",payload:i.data});case 8:case"end":return t.stop()}},t,this)}),update:s.default.mark(function t(e,a){var n,r,u;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=e.callback,u=a.call,a.put,t.next=4,u(c.saveStation,n);case 4:t.sent,r&&r();case 6:case"end":return t.stop()}},t,this)}),delete:s.default.mark(function t(e,a){var n,r,u,i;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=e.callback,u=a.call,a.put,t.next=4,u(c.deleteStation,n);case 4:i=t.sent,r&&r(i);case 6:case"end":return t.stop()}},t,this)}),fetchCityList:s.default.mark(function t(e,a){var n,r,u,i;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=a.call,u=a.put,t.next=4,r(c.queryCityList,n);case 4:return i=t.sent,console.log(i),t.next=8,u({type:"saveCityList",payload:i});case 8:case"end":return t.stop()}},t,this)})},reducers:{save:function(t,e){var a=e.payload;return(0,r.default)({},t,a)},saveCityList:function(t,e){var a=e.payload;return(0,r.default)({},t,{cityList:a})}}};e.default=u}}]);