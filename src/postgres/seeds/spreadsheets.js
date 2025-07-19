/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await knex("spreadsheets")
        .insert([{ spreadsheet_id: "table_id" }])
        .onConflict(["spreadsheet_id"])
        .ignore();
}
