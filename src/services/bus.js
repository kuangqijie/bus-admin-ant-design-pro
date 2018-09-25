import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryLineList(params) { //线路列表
  //console.log(params)
  return request('/api/admin/bus/getCustomLineList', {
      method: 'POST',
      body: {
          ...params,
      },
  });
}
export async function saveLine(params) { //添加&编辑线路
  //console.log(params)
  return request('/api/admin/bus/saveCustomLine', {
      method: 'POST',
      body: {
          ...params,
      },
  });
}

export async function queryOrderDetail(params) { //订单详情
    //console.log(params)
    return request('/api/admin/bus/getOrderDetail', {
        method: 'POST',
        body: {
            ...params,
        },
    });
}
export async function queryOrderList(params) { //订单列表
    //console.log(params)
    return request('/api/admin/bus/getOrderList', {
        method: 'POST',
        body: {
            ...params,
        },
    });
}
