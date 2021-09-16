import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	if (!(await knex.schema.hasTable('accounts'))) {
		await knex.schema.createTable('accounts', (table) => {
			table.increments('id');
			table.string('name').nullable();
			table.string('status').nullable();
			table.bigInteger('credit_balance').nullable();
			table.timestamps(false, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	if (await knex.schema.hasTable('accounts')) {
		await knex.schema.dropTable('accounts');
	}
}
