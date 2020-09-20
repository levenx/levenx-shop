import { get, post } from 'src/utils/request';
export const goodsList = (data: { pn: number, ps: number } = { pn: 0, ps: 5 }): any => {
    return post("/goods/admin/search", data);
}

export const goodsAll = (): any => {
    return get("/goods/admin/all");
}

export const goodsSave = (data: any): any => {
    return post("/goods/create", data);
}

export const goodsDel = (id: string): any => {
    return get(`/goods/admin/del/${id}`);
}