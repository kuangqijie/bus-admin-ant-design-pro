import {queryStationList} from '@/services/base';

export default {
  namespace: 'station',

  state: {
    list: [],
    total: 0
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryStationList, payload);
      //console.log(response)
      yield put({
        type: 'save',
        payload: response.data,
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
