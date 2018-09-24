import { stringify } from 'qs';
import request from '@/utils/request';


export async function queryStaffsList(params) { // 获取工作人员列表
    //console.log(params)
    return request('/api/admin/bus/getStaffs', {
        method: 'POST',
        body: {
            ...params
        }
    });
}
export async function saveStaffs(params) { // 添加&编辑工作人员
    //console.log(params)
    return request('/api/admin/bus/saveStaff', {
        method: 'POST',
        body: {
            ...params
        }
    });
}
export async function deleteStaffs(params) { // 删除工作人员
    //console.log(params)
    return request('/api/admin/bus/deleteStaff', {
        method: 'POST',
        body: {
            ...params
        }
    });
}

// 获取车型列表
export async function queryCarModelList(params) {
    //console.log(params)
    return request('/api/admin/bus/getVehicles', {
        method: 'POST',
        body: {
            ...params
        }
    });
}

// 添加车型
export async function saveCarModel(params) {
    //console.log(params)
    return request('/api/admin/bus/saveVehicle', {
        method: 'POST',
        body: {
            ...params
        }
    });
}

// 获取站点列表
export async function queryStationList(params) {
    //console.log(params)
    return request('/api/admin/bus/getStationList', {
        method: 'POST',
        body: {
            ...params
        }
    });
}
//添加、编辑站点
export async function saveStation(params) {
    //console.log(params)
    return request('/api/admin/bus/saveStation', {
        method: 'POST',
        body: {
            ...params
        }
    });
}
//获取城市列表
export async function queryCityList(params) {
    return request('/api/admin/getStartCityList', {
        method: 'POST',
        body: {
            ...params
        }
    });
}
//删除站点
export async function deleteStation(params) {
    //console.log(params)
    return request('/api/admin/bus/deleteStation',{
        method:'POST',
        body:{
            ...params
        }
    });
  }

