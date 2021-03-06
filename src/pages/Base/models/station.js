import {queryStationList, saveStation, queryCityList, deleteStation} from '@/services/base';

export default {
  namespace: 'station',

  state: {
    list: [],
    total: 0,
    cityList:[]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryStationList, payload);
      console.log(response)
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *update({ payload, callback }, { call, put }){ //编辑&添加
      const response = yield call(saveStation, payload);
      if(callback) callback();
      
    },
    *delete({ payload, callback }, { call, put }){ //删除
      const res = yield call(deleteStation, payload);
      if(callback) callback(res);
    },
    *fetchCityList({ payload }, { call, put }){ //获取城市列表
      const response = yield call(queryCityList, payload);
      console.log(response)
      yield put({
        type: 'saveCityList',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, {payload}) {

      return {
        ...state,
        ...payload,
      };
    },
    saveCityList(state, {payload}){
      return {
        ...state,
        cityList: payload
      }
    }
  },
};
