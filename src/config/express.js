import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helloWorldRouter from '../routes/hello-worldRoutes.js';
import usuariosRouter from '../routes/usuariosRoutes.js';
import fotosRouter from '../routes/fotosRoutes.js';
import acessosRouter from '../routes/acessoRoutes.js';

const app = express();
const BASE_PATH = '/api';
const urlOrigin = 'http://localhost:3000'
let corsOptions = {
  origin: urlOrigin,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.set('port', process.env.PORT || 5000);
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(BASE_PATH, helloWorldRouter);
app.use(BASE_PATH, usuariosRouter);
app.use(BASE_PATH, fotosRouter);
app.use(BASE_PATH, acessosRouter);

export default app;