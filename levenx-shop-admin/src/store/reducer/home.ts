import { Action } from './index';
import { HOME_INIT, NEW_ORDER, ACCEPET_ORDER } from '../types';

//仓库管理员，接受action发送的信号，处理返回结果数据
const reducer = (state: any = { overview: { Order: 0, Goods: 0, Classify: 0, AllOrder: 0 }, newOrders: {} }, action: Action) => {
    const { type, payload } = action;
    const { newOrders = {} } = state;
    let newState;
    switch (type) {
        case HOME_INIT:
            newState = Object.assign({}, state, { overview: payload });
            return newState;
        case NEW_ORDER:
            newOrders[payload._id] = payload;
            return Object.assign({}, state, { newOrders });
        case ACCEPET_ORDER:
            delete newOrders[payload._id];
            return Object.assign({}, state, { newOrders });
    }
    return state;
}
export default reducer;
