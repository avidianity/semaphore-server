import { Router } from 'express';
import { Knex } from 'knex';

const router = Router();

router.get('/', async (req, res) => {
	const knex: Knex = req.app.get('knex');

	const messages = await knex('messages').select('*').orderBy('created_at', 'desc');

	return res.render('pages/index', { messages });
});

router.post('/api/messages/:id/delete', async (req, res) => {
	const knex: Knex = req.app.get('knex');

	const messages = await knex('messages').select('*').where('id', req.params.id).limit(1);

	const message = messages.first();

	if (!message) {
		return res.status(404).json({ message: 'Message does not exist.' });
	}

	await knex('messages').delete().where('id', req.params.id);

	return res.sendStatus(204);
});

export const viewerRoutes = router;
