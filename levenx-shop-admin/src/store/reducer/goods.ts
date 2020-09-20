import { Action } from './index';
import { GOODS_LIST, GOODS_LIST_LOADING, GOODS_ALL } from '../types';

//仓库管理员，接受action发送的信号，处理返回结果数据
const reducer = (state: any = [], action: Action) => {
    const { type, payload } = action;
    let newState;
    switch (type) {
        case GOODS_LIST:
            newState = Object.assign({}, state, { list: payload });
            return newState;
        case GOODS_ALL:
            payload && payload.map((goods: any, index: number, arr: any) => {
                arr[index]["key"] = goods._id;
                return goods;
            })
            newState = Object.assign({}, state, { goodsAll: payload });
            return newState;
        case GOODS_LIST_LOADING:
            newState = Object.assign({}, state, { loading: payload });
            return newState;
    }
    return state;
}
export default reducer;
