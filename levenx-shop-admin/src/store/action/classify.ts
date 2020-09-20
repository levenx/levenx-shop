import { Dispatch } from 'redux';
import { CLASSIFY_LIST, CLASSIFY_LIST_LOADING } from '../types';
import * as Api from 'src/services/classify';
export const classifyList = (pageNumber = 0, pageSize = 5) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: CLASSIFY_LIST_LOADING,
            payload: true,
        });
        const result = await Api.classifyList({ pn: pageNumber, ps: pageSize });
        const { pn, ps, count, data } = result;
        dispatch({
            type: CLASSIFY_LIST,
            payload: { pn, ps, count, data }
        })
        dispatch({
            type: CLASSIFY_LIST_LOADING,
            payload: false,
        });
    }
}