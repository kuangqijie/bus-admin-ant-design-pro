import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryOrderDetail(params) {
    //console.log(params)
    return request('/api/admin/bus/getOrderDetail', {
        method: 'POST',
        body: {
            ...params,
        },
    });
}

export async function queryOrderList(params) {
    console.log(params)
    return request('/api/admin/bus/getOrderList', {
        method: 'POST',
        body: {
            ...params,
        },
    });
}