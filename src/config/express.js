import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helloWorldRouter from '../routes/hello-worldRoutes.js';
import usuariosRouter from '../routes/usuariosRoutes.js';
import fotosRouter from '../routes/fotosRoutes.js';
import acessosRouter from '../routes/acessoRoutes.js';

const app = express();
const BASE_PATH = '/api';

app.set('port', process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(BASE_PATH, helloWorldRouter);
app.use(BASE_PATH, usuariosRouter);
app.use(BASE_PATH, fotosRouter);
app.use(BASE_PATH, acessosRouter);

export default app;