import { stringify } from 'qs';
import request from '@/utils/request';


export async function queryStationList(params) {
    //console.log(params)
    return request('/api/admin/bus/getStationList',{
        method:'POST',
        body:{
            ...params
        }
    });
}
