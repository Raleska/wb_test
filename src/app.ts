import knex, { migrate, seed } from "#postgres/knex.js";
import { startTariffCronJob } from "#jobs/fetch_tariffs_job.js";
import { startExportTariffsJob } from "#jobs/export_tariffs_job.js";

await migrate.latest();
await seed.run();

startTariffCronJob();
startExportTariffsJob();

console.log("All migrations, seeds, and jobs are initialized.");
