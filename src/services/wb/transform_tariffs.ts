import { RawWarehouse } from "./fetch_tariffs_from_api.js";

export type TariffRow = {
    date: string;
    warehouse_name: string;
    delivery_expr: number;
    delivery_base: number;
    delivery_liter: number;
    storage_base: number;
    storage_liter: number;
};

function parse(input: string): number {
    return parseFloat(input.replace(",", ".").trim()) || 0;
}

export function transformTariffs(date: string, raw: RawWarehouse[]): TariffRow[] {
    return raw.map((item) => ({
        date,
        warehouse_name: item.warehouseName,
        delivery_expr: parse(item.boxDeliveryAndStorageExpr),
        delivery_base: parse(item.boxDeliveryBase),
        delivery_liter: parse(item.boxDeliveryLiter),
        storage_base: parse(item.boxStorageBase),
        storage_liter: parse(item.boxStorageLiter),
    }));
}
