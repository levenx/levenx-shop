
import { combineReducers } from 'redux';
import home from './home';
import goods from './goods';
import classify from './classify';
import order from './order';
export interface Action {
    type: string,
    payload: any;
}


//reducer.js
//仓库管理员，接受action发送的信号，处理返回结果数据
const reducer = combineReducers({
    home,
    goods,
    classify,
    order
})
export default reducer;
