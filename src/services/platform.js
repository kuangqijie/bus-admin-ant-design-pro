import {
  stringify
} from 'qs';
import request from '@/utils/request';


export async function queryRoleList(params) { // 获取所有角色列表
  //console.log(params)
  return request('/api/admin/getRoleList', {
    method: 'POST',
    body: {
      ...params
    }
  });
}
export async function saveRole(params) { // 编辑&添加角色权限信息
  //console.log(params)
  return request('/api/admin/saveRole', {
    method: 'POST',
    body: {
      ...params
    }
  });
}
export async function deleteRole(params) { // 删除角色
  //console.log(params)
  return request('/api/admin/deleteRole', {
    method: 'POST',
    body: {
      ...params
    }
  });
}
