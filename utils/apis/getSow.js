import { getWithAuth } from "../../src/provider/helper/axios"
import { SOWLIST } from "../constants/urls"

export const getSow = async (id) =>{
    const response = getWithAuth(SOWLIST(id))
    const data = await response
    // console.log(data);
    return data
}