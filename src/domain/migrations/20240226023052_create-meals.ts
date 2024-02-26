import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meals', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.boolean('in_diet').defaultTo(false).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.integer('user_id').unsigned().notNullable(); //unsigned() para garantir que seja um número positivo
        table.foreign('user_id').references('id').inTable('users');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('meals');
}

