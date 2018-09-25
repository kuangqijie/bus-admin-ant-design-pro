import {queryLineList, saveLine, deleteLine} from '@/services/bus';

export default {
  namespace: 'line',

  state: {
    list: [],
    total: 0,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryLineList, payload);
      console.log(response)
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *update({ payload, callback }, { call, put }){ //编辑&添加
      const response = yield call(saveLine, payload);
      if(callback) callback();

    },
    *delete({ payload, callback }, { call, put }){ //删除
      const res = yield call(deleteLine, payload);
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
