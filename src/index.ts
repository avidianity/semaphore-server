import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import knex from 'knex';
import '@avidian/extras';
import { receiverRoutes } from './routes/receiver.routes';
import { resolve } from 'path';
import { viewerRoutes } from './routes/viewer.routes';

(async () => {
    const RECEIVER_PORT = process.env.RECEIVER_PORT || 3535;
    const VIEWER_PORT = process.env.VIEWER_PORT || 8585;

    const db = knex({
        client: 'sqlite3',
        connection: ':memory:',
        useNullAsDefault: true,
        migrations: {
            directory: resolve(__dirname, '../migrations'),
        },
    });

    await db.migrate.latest();

    db.on('query', console.log);

    const receiver = express();

    receiver.use(json());
    receiver.use(cors());
    receiver.use(urlencoded({ extended: true }));
    receiver.use(cookieParser());

    receiver.use(receiverRoutes);

    const viewer = express();

    viewer.use(json());
    viewer.use(cors());
    viewer.use(urlencoded({ extended: true }));
    viewer.use(cookieParser());

    viewer.set('view engine', 'ejs');

    receiver.set('knex', db);
    viewer.set('knex', db);

    viewer.use('/', viewerRoutes);

    receiver.listen(RECEIVER_PORT, () =>
        console.log(`Semaphore Receiver listening at: ${RECEIVER_PORT}`)
    );

    viewer.listen(VIEWER_PORT, () =>
        console.log(`Semaphore Viewer listening at: ${VIEWER_PORT}`)
    );
})();
