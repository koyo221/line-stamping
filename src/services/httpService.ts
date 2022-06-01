import axios from "axios";
import { isLocal } from "./utilityService";


/**
 * FetchLinkageAPI
 * TODO: fix type
 *
 * @returns Promise<any>
 */
export async function fetchLinkage(): Promise<any> {
    if (isLocal()) {
        return axios.get("mocks/account-linkage.json");
    }
}
