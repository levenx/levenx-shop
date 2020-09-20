import { get, post } from 'src/utils/request';
export const orderList = (data: { pn: number, ps: number, type?: number } = { pn: 0, ps: 5, type: 2 }): any => {
    return post("/order/admin/list", data);
}

export const orderDel = (id: string): any => {
    return get(`/order/del/${id}`);
}