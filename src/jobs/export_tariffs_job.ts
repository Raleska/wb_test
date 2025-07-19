import cron from "node-cron";
import { exportTariffsToSheets } from "#services/sheets/export_tariffs_to_sheets.js";

export function startExportTariffsJob() {
    console.log("cron job is working");

    cron.schedule("0 * * * *", async () => {
        console.log("Starting hourly export to Google Sheets...");
        try {
            await exportTariffsToSheets();
            console.log("Export finished");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown export error";
            console.error("Export failed:", msg);
        }
    });
}
