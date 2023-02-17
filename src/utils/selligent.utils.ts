import axios from "axios"

export async function getSelligentLists(){
    const data = await axios.get("/api/selligent/lists");
    return data.data.lists;
}