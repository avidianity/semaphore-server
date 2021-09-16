import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	if (!(await knex.schema.hasTable('messages'))) {
		await knex.schema.createTable('messages', (table) => {
			table.increments('id');
			table.bigInteger('user_id').index().nullable();
			table.string('user').nullable();
			table.bigInteger('account_id').index().nullable();
			table.string('account').nullable();
			table.string('recipient').nullable();
			table.string('message').nullable();
			table.string('sender_name').nullable();
			table.string('network').nullable();
			table.enum('status', ['Queued', 'Pending', 'Sent', 'Failed', 'Refunded']).nullable();
			table.string('type').nullable();
			table.string('source').nullable();
			table.timestamps(false, true);
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	if (await knex.schema.hasTable('messages')) {
		await knex.schema.dropTable('messages');
	}
}
