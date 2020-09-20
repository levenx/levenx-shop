import { get, post } from 'src/utils/request';
export const classifyList = (data: { pn: number, ps: number } = { pn: 0, ps: 5 }): any => {
    return post("/classify/search", data);
}


export const classifyGoodsRelation = (id: string): any => {
    return get(`/classify/goods/relation/${id}`);
}

export const classifyAdd = (data: any): any => {
    return post("/classify/add", data);
}

export const classifyGoodsAdd = (data: any): any => {
    return post("/classify/goods/add", data);
}

export const classifyDel = (id: string): any => {
    return get(`/classify/del/${id}`);
}