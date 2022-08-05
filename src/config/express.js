import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helloWorldRouter from '../routes/hello-worldRoutes.js';
import usuariosRouter from '../routes/usuariosRoutes.js';

const app = express();
const BASE_PATH = '/api';

app.set('port', process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());

app.use(BASE_PATH, helloWorldRouter);
app.use(BASE_PATH, usuariosRouter);

export default app;