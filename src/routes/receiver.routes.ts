import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import faker from 'faker';
import { Knex } from 'knex';
import { Account, SenderName } from '../contracts';

const router = Router();

router.post('/account', (_, res) => {
	return res.json({
		account_id: faker.datatype.number(1000),
		account_name: faker.random.words(faker.datatype.number(5)),
		status: faker.random.words(faker.datatype.number(5)),
		credit_balance: faker.datatype.number(1000),
	});
});

router.post(
	'/messages',
	[body('message').isString().notEmpty(), body('number').isString().notEmpty(), body('sendername').isString().notEmpty()],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const knex: Knex = req.app.get('knex');

		const data = {
			user_id: faker.datatype.number(1000),
			user: faker.random.words(faker.datatype.number(5)),
			account_id: faker.datatype.number(1000),
			account: faker.random.words(faker.datatype.number(5)),
			recipient: `${req.body.number}`,
			sender_name: req.body.sendername,
			network: faker.random.words(1),
			status: 'Sent',
			type: faker.random.words(faker.datatype.number(5)),
			source: faker.random.words(faker.datatype.number(5)),
			message: req.body.message,
		};

		const [id] = await knex('messages').insert(data);

		const messages = await knex('messages').select('*').where('id', id).limit(1);

		return res.json([messages.first()]);
	}
);

router.get('/messages/:id', async (req, res) => {
	const knex: Knex = req.app.get('knex');

	const messages = await knex('messages').select('*').where('id', req.params.id).limit(1);

	if (messages.length === 0) {
		return res.status(404).json({ message: 'Message does not exist.' });
	}

	return res.json(messages.first());
});

router.get('/messages', async (req, res) => {
	const knex: Knex = req.app.get('knex');

	const messages = await knex('messages').select('*');

	return res.json(messages);
});

router.get('/account', async (_, res) => {
	return res.json({
		account_id: faker.datatype.number(1000),
		account_name: faker.random.words(faker.datatype.number(5)),
		status: faker.random.words(faker.datatype.number(5)),
		credit_balance: faker.datatype.number(1000),
	});
});

router.get('/users', async (req, res) => {
	const knex: Knex = req.app.get('knex');

	const users = await knex('users').select('*');

	return res.json(users);
});

router.get('/account/sendernames', async (_, res) => {
	const names: SenderName[] = [];

	for (let x = 0; x <= faker.datatype.number(30); x++) {
		names.push({
			name: faker.random.words(faker.datatype.number(5)),
			status: faker.random.words(faker.datatype.number(5)),
			created_at: new Date().toJSON(),
		});
	}

	return res.json(names);
});

router.get('/account/transactions', async (_, res) => {
	const names: Account[] = [];

	for (let x = 0; x <= faker.datatype.number(30); x++) {
		names.push({
			account_id: faker.datatype.number(1000),
			account_name: faker.random.words(faker.datatype.number(5)),
			status: faker.random.words(faker.datatype.number(5)),
			credit_balance: faker.datatype.number(1000),
		});
	}

	return res.json(names);
});

export const receiverRoutes = router;
