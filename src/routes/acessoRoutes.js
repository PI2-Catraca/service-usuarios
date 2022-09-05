import express from 'express';
const acessosRouter = express.Router();

import { getAllAcessos, getAcessoByCpf, getAcessoByIdCatraca } from '../controller/acessoController.js';

acessosRouter.get('/acesso/todos', getAllAcessos);
acessosRouter.get('/acesso/cpf/:cpf', getAcessoByCpf);
acessosRouter.get('/acesso/idCatraca/:idCatraca', getAcessoByIdCatraca);

export default acessosRouter;
