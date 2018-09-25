import {queryRoleList, saveRole, deleteRole} from '@/services/platform';

export default {
  namespace: 'role',

  state: {
    list: [],
    total: 0,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRoleList, payload);
      console.log(response)
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *update({ payload, callback }, { call, put }){ //编辑&添加
      const response = yield call(saveRole, payload);
      if(callback) callback();

    },
    *delete({ payload, callback }, { call, put }){ //删除
      const res = yield call(deleteRole, payload);
      if(callback) callback(res);
    },
  },

  reducers: {
    save(state, {payload}) {

      return {
        ...state,
        ...payload,
      };
    },
  },
};
