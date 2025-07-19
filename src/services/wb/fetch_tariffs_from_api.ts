import axios from "axios";
import env from "#config/env/env.js";

const WB_URL = "https://common-api.wildberries.ru/api/v1/tariffs/box";

export type RawWarehouse = {
    warehouseName: string;
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageLiter: string;
};

export async function fetchTariffsFromApi(date: string): Promise<RawWarehouse[]> {
    const res = await axios.get(WB_URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: env.WB_TOKEN,
        },
        params: { date },
    });

    const list = res.data?.response?.data?.warehouseList;

    if (!Array.isArray(list)) {
        throw new Error("Invalid API response: warehouseList missing or malformed");
    }

    return list;
}
