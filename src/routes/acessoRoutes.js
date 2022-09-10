import express from 'express';
import authMiddleware from '../middleware/auth.js';

const acessosRouter = express.Router();

import { getAllAcessos, getAcessoByCpf, getAcessoByIdCatraca } from '../controller/acessoController.js';

acessosRouter.get('/acesso/todos', authMiddleware, getAllAcessos);
acessosRouter.get('/acesso/cpf/:cpf', authMiddleware, getAcessoByCpf);
acessosRouter.get('/acesso/idCatraca/:idCatraca', authMiddleware, getAcessoByIdCatraca);

export default acessosRouter;
