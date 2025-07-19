import knex from "#postgres/knex.js";

type TariffInput = {
    date: string;
    warehouse_name: string;
    delivery_expr: number;
    delivery_base: number;
    delivery_liter: number;
    storage_base: number;
    storage_liter: number;
};

export async function saveTariffsToDb(tariffs: TariffInput[]): Promise<number> {
    let count = 0;

    for (const tariff of tariffs) {
        await knex("tariffs")
            .insert({
                ...tariff,
                updated_at: new Date(),
            })
            .onConflict(["date", "warehouse_name"])
            .merge(["delivery_expr", "delivery_base", "delivery_liter", "storage_base", "storage_liter", "updated_at"]);

        count++;
    }

    return count;
}
