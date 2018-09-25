import {queryOrderList} from '@/services/bus';

export default {
  namespace: 'busOrder',

  state: {
    list: [],
    total: 0
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload);
      console.log(response)
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
  },

  reducers: {
    save(state, {payload}) {
      console.log(payload)
      return {
        ...state,
        ...payload,
      };
    },
  },
};
