/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await knex("spreadsheets")
        .insert([{ spreadsheet_id: "1nEMHJHstR3KDppRp93yXaQpv2J_mpNsNfgxcZnsJp40" }])
        .onConflict(["spreadsheet_id"])
        .ignore();
}
