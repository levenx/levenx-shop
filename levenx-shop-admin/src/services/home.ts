import { get } from 'src/utils/request';
export const homeInit = () => {
    return get("/home/admin");
}