import { Dispatch } from 'redux';
import { ORDER_LIST, ORDER_LIST_LOADING } from '../types';
import * as Api from 'src/services/order';
export const orderList = (pageNumber = 0, pageSize = 10) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ORDER_LIST_LOADING,
            payload: true,
        });
        const result = await Api.orderList({ pn: pageNumber, ps: pageSize });
        const { pn, ps, count, data } = result;
        dispatch({
            type: ORDER_LIST,
            payload: { pn, ps, count, data }
        })
        dispatch({
            type: ORDER_LIST_LOADING,
            payload: false,
        });
    }
}