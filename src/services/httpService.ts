import axios from "axios";

/**
 * FetchLinkageAPI
 * TODO: fix type
 *
 * @returns Promise<any>
 */
export async function fetchLinkage(id: any, accessToken: any): Promise<any> {
    return axios.get(
        `https://9fl5wezq72.execute-api.ap-northeast-1.amazonaws.com/dev/user?id=${id}`,
        {
            headers: {
                Authorization: accessToken
            }
        }
    )
}

export async function fetchCompanyInfo(id:any, accessToken: any): Promise<any> {
    return axios.get(
        `https://9fl5wezq72.execute-api.ap-northeast-1.amazonaws.com/dev/company?id=${id}`,
        {
            headers: {
                Authorization: accessToken
            }
        }
    )
}
export async function postCompanyInfo(body:any, accessToken: any): Promise<any> {
    return axios.post(
        `https://9fl5wezq72.execute-api.ap-northeast-1.amazonaws.com/dev/company`,
        body,
        {
            headers: {
                Authorization: accessToken
            }
        }
    )
}

export async function postKotCodes(body: any, accessToken: any) {
    return await axios.post(
        `https://9fl5wezq72.execute-api.ap-northeast-1.amazonaws.com/dev/user`,
        body,
        {
            headers: {
                Authorization: accessToken
            }
        }
    )
}
