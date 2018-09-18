import {queryOrderDetail} from '@/services/bus';

export default {
  namespace: 'busOrderDetail',

  state: {
    orderInfo: [],
    stationInfo: [],
    messageList:['2018年5月16号9:00, 罗湖汽车站1张出票成功','2018年5月18号9:00, 罗湖汽车站1张取票成功'],
    insuranceInfo:[

    ],
    basicProgress: [
      {
        key: '1',
        time: '2017-10-01 14:10',
        rate: '联系客户',
        status: 'processing',
        operator: '取货员 ID1234',
        cost: '5mins',
      },
      {
        key: '2',
        time: '2017-10-01 14:05',
        rate: '取货员出发',
        status: 'success',
        operator: '取货员 ID1234',
        cost: '1h',
      },
    ]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrderDetail, payload);
      //console.log(response)
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
