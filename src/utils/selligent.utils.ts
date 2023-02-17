import axios from "axios";

interface IParams {
    organization?: string;
}

export const SelligentRequestOptions = {
    headers: {
      Accept: "application/json",
      "X-ApiKey": `${process.env.SELLIGENT_API_KEY}:${process.env.SELLIGENT_API_SECRET}`,
    },
  };

async function fetchSelligentData(URL: string){
    const response = await axios.get(URL, SelligentRequestOptions);
    return response.data;
}

export function getAllData(URLs: string[]){
    return Promise.all(URLs.map(URL => fetchSelligentData(URL)))
}

export async function getSelligentLists(params: IParams){
    const lists = await axios.request({
        method: "GET",
        baseURL:"/api/selligent/lists",
        params
    });
    return lists.data;
}