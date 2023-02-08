import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("todos")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("task", "TEXT", (col) => col.notNull())
    .addColumn("completed", "BOOLEAN", (col) => col.defaultTo(false))
    .execute();

    await db
    .insertInto("todos")
    .values({
      id: 1,
      task: "clean",
      completed: false,
    })
    .execute();

}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("todos").execute();
}