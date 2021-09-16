import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	if (!(await knex.schema.hasTable('users'))) {
		await knex.schema.createTable('users', (table) => {
			table.increments('id');
			table.string('string').nullable();
			table.string('role').nullable();
			table.string('status').nullable();
			table.timestamps(false, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	if (await knex.schema.hasTable('users')) {
		await knex.schema.dropTable('users');
	}
}
