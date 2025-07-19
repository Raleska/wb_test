import { fetchTariffsFromApi } from "./fetch_tariffs_from_api.js";
import { transformTariffs } from "./transform_tariffs.js";
import { saveTariffsToDb } from "./save_tariffs_to_db.js";

export async function fetchAndStoreTariffs(date: string): Promise<number> {
    const raw = await fetchTariffsFromApi(date);
    const transformed = transformTariffs(date, raw);
    const count = await saveTariffsToDb(transformed);
    return count;
}
