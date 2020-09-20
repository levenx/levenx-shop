import { Dispatch } from 'redux';
import { GOODS_LIST, GOODS_LIST_LOADING, GOODS_ALL } from '../types';
import * as Api from 'src/services/goods';
export const goodsList = (pageNumber = 0, pageSize = 5) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: GOODS_LIST_LOADING,
            payload: true,
        });
        const result = await Api.goodsList({ pn: pageNumber, ps: pageSize });
        const { pn, ps, count, data } = result;
        dispatch({
            type: GOODS_LIST,
            payload: { pn, ps, count, data }
        })
        dispatch({
            type: GOODS_LIST_LOADING,
            payload: false,
        });
    }
}

export const goodsAll = () => {
    return async (dispatch: Dispatch) => {
        const result = await Api.goodsAll();
        const { data } = result;
        dispatch({
            type: GOODS_ALL,
            payload: data
        })
    }
}