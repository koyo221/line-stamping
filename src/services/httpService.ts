import axios from "axios";
import { isLocal } from "./utilityService";


/**
 * FetchLinkageAPI
 * TODO: fix type
 *
 * @returns Promise<any>
 */
export async function fetchLinkage(id: any): Promise<any> {
    return axios.get(`https://9fl5wezq72.execute-api.ap-northeast-1.amazonaws.com/dev/user?id=${id}`)
}

export async function postKotCodes(body: any) {
    return await axios.post(
        `https://9fl5wezq72.execute-api.ap-northeast-1.amazonaws.com/dev/user`,
        body
    )
}
