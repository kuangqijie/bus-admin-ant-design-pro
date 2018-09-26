import { stringify } from 'qs';
import request from '@/utils/request';


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
