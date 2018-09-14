import { query as queryUsers, queryCurrent, queryAuthority } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    authorityList: []
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchAuthority({payload}, { call, put }) { //获取权限数据
      const response = yield call(queryAuthority, payload);
      //console.log(response)
      yield put({
        type: 'saveAuthority',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    saveAuthority(state, action){ //保存权限数据
      //console.log(action)
      return {
        ...state,
        authorityList:action.payload
      };
    }
  },
};
