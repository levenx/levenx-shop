
import { Action } from './index';
import { CLASSIFY_LIST, CLASSIFY_LIST_LOADING } from '../types';

//仓库管理员，接受action发送的信号，处理返回结果数据
const reducer = (state: any = [], action: Action) => {
    const { type, payload } = action;
    let newState;
    switch (type) {
        case CLASSIFY_LIST:
            newState = Object.assign({}, state, { list: payload });
            return newState;
        case CLASSIFY_LIST_LOADING:
            newState = Object.assign({}, state, { loading: payload });
            return newState;
    }
    return state;
}
export default reducer;
