import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("tariffs", (table) => {
        table.increments("id").primary();
        table.date("date").notNullable().index();
        table.string("warehouse_name").notNullable();
        table.decimal("delivery_expr", 10, 2).notNullable();
        table.decimal("delivery_base", 10, 2).notNullable();
        table.decimal("delivery_liter", 10, 2).notNullable();
        table.decimal("storage_base", 10, 2).notNullable();
        table.decimal("storage_liter", 10, 2).notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.unique(["date", "warehouse_name"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tariffs");
}
