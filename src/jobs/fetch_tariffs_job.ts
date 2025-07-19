import cron from "node-cron";
import { fetchAndStoreTariffs } from "#services/wb/fetch_and_store_tariffs.js";

export function startTariffCronJob() {
    cron.schedule("0 * * * *", async () => {
        const date = new Date().toISOString().slice(0, 10);

        try {
            const count = await fetchAndStoreTariffs(date);
            console.log(`[${new Date().toISOString()}] Tariffs updated: ${count}`);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Unknown error occurred";
            console.error(`[${new Date().toISOString()}] Tariff update failed:`, message);
        }
    });
}
