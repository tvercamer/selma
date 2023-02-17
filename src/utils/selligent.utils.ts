import axios from "axios";

interface IParams {
    organization?: string;
}

export async function getSelligentLists(params: IParams){
    const lists = await axios.request({
        method: "GET",
        baseURL:"/api/selligent/lists/list-information",
        params
    });
    return lists.data;
}

export async function fetchData(URL: string, options: any){
    const repsonse = await axios.get(URL, options);
    return await repsonse.data;
}

export function getAllData(URLs: string[], options: any){
    return Promise.all(URLs.map(URL => fetchData(URL, options)))
}