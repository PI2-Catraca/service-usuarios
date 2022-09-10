import express from 'express';
import authMiddleware from '../middleware/auth.js';

const fotosRouter = express.Router();

import { postFotos, getAllFotos, getFotosByCpf } from '../controller/fotosController.js'

fotosRouter.post('/fotos/nova', authMiddleware, postFotos);
fotosRouter.get('/fotos/todas', authMiddleware, getAllFotos);
fotosRouter.get('/fotos/usuario/:cpf', authMiddleware, getFotosByCpf);

export default fotosRouter;