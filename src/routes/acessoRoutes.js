import express from 'express';
const acessosRouter = express.Router();

import { getAllAcessos, getAcessoByCpf } from '../controller/acessoController.js';

acessosRouter.get('/acesso/todos', getAllAcessos);
acessosRouter.get('/acesso/cpf/:cpf', getAcessoByCpf);

export default acessosRouter;
