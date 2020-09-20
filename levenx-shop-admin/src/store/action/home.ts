import { Dispatch } from 'redux';
import { HOME_INIT, NEW_ORDER, ACCEPET_ORDER } from '../types';
import * as Api from 'src/services/home';
export const homeInit = () => {
    return async (dispatch: Dispatch) => {
        let result = await Api.homeInit();
        dispatch({
            type: HOME_INIT,
            payload: result.data
        })
    }
}

export const newOrders = (order: any) => {
    return {
        type: NEW_ORDER,
        payload: order
    }
}

export const acceptOrders = (order: any) => {
    return {
        type: ACCEPET_ORDER,
        payload: order
    }
}