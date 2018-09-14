import {queryStationList} from '@/services/base';

export default {
  namespace: 'station',

  state: {
    list: [],
    pagination: {
        total: 50,
        showTotal: (t)=> '共'+t+'条数据'
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryStationList, payload);
      //console.log(response)
      yield put({
        type: 'save',
        payload: response,
      });
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
