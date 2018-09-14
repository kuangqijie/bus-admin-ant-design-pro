import mockjs from 'mockjs';

const order = {
    list: [
        { key: 1, orderTime: '1536552942236', lineId: '007', lineName: '深圳线路', startTime: '1536552962236', getOnStation: '大新地铁站', getOffStation: '罗湖火车站', mobile: '18713246588', ticketNum: 1, orderAmount: 200, payAmount: 200, orderStatus: '已支付' },
        { key: 2, orderTime: '1536552942236', lineId: '007', lineName: '深圳线路', startTime: '1536552962236', getOnStation: '大新地铁站', getOffStation: '罗湖火车站', mobile: '18713246588', ticketNum: 1, orderAmount: 200, payAmount: 200, orderStatus: '已支付' }
    ],
    total: 50
}

const orderDet = {
    orderInfo: [
        { key: '订单状态', val: '已成交' },
        { key: '出发日期', val: '2018-05-20' },
        { key: '出发时间', val: '09:30' },
        { key: '出发站', val: '北京' },
        { key: '到达站', val: '上海' },
        { key: '支付总金额', val: '156.00' },
        { key: '票价总金额', val: '180.00' },
        { key: '差额退款', val: '0' },
        { key: '第三方订单号', val: '03456430045687' },
        { key: '乘客', val: '' },
        { key: '退票状态', val: '未退票' },
        { key: '取票状态', val: '未取票' },
    ],
    stationInfo: [
        { key: '车站名', val: '罗湖汽车站' },
        { key: '车站地址', val: '罗湖汽车站' },
        { key: '联系电话', val: '0755-4567652' },
    ]
}

export default {
    '/api/admin/bus/getOrderList': order,
    '/api/order/detail': orderDet,
}