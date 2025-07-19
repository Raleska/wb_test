import knex from "#postgres/knex.js";
import { getSheetsClient } from "#auth/sheets_client.js";

import { checkSheetExists } from "./check_sheet_exists.js";
import { updateSheetValues } from "./update_sheet_values.js";
import { applySheetFormatting } from "./apply_sheet_formatting.js";

const SHEET_NAME = "stocks_coefs";

export async function exportTariffsToSheets(): Promise<void> {
    const sheets = await getSheetsClient();
    const spreadsheetIds = await knex("spreadsheets").select("spreadsheet_id");

    if (!spreadsheetIds.length) {
        console.warn("[export] No spreadsheet IDs found — skipping export");
        return;
    }

    const today = new Date().toISOString().slice(0, 10);

    const data = await knex("tariffs")
        .where({ date: today })
        .select("warehouse_name", "delivery_expr", "delivery_base", "delivery_liter", "storage_base", "storage_liter")
        .orderBy("delivery_expr", "asc");

    console.log(`Retrieved ${data.length} rows for date ${today}`);

    if (!data.length) {
        console.warn("[export] No tariff data to export — skipping");
        return;
    }

    const values = [
        ["Имя склада", "Доставка итог", "Базовая доставка", "Литровая доставка", "Базовое хранение", "Литровое хранение"],
        ...data.map((row) => [row.warehouse_name, row.delivery_expr, row.delivery_base, row.delivery_liter, row.storage_base, row.storage_liter]),
    ];

    for (const { spreadsheet_id } of spreadsheetIds) {
        try {
            await checkSheetExists(sheets, spreadsheet_id, SHEET_NAME);
            await updateSheetValues(sheets, spreadsheet_id, SHEET_NAME, values);
            await applySheetFormatting(sheets, spreadsheet_id, SHEET_NAME);
            console.log(`Exported to ${spreadsheet_id}`);
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            console.error(`Failed to export to ${spreadsheet_id}: ${msg}`);
        }
    }
}
