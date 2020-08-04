import logger from './helpers/logger';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import Singleton from './QueueHandler';

const { PORT } = config;
const app = express();
const queueHandler = Singleton.getInstance();
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

app.post('/generate', (req, res) => {
    const json: string = req.body.json;
    const name: string = JSON.parse(json).apikey;
    queueHandler.addJob({ json, name: `${name}_${Math.random() * 100}` });
    res.sendStatus(200);
});

export const server = app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});

export default app;
