import express from 'express';
const fotosRouter = express.Router();

import { postFotos, getAllFotos, getFotosByCpf } from '../controller/fotosController.js'

fotosRouter.post('/foto/nova', postFotos);
fotosRouter.get('/fotos/todas', getAllFotos);
fotosRouter.get('/fotos/usuario/:cpf', getFotosByCpf);

export default fotosRouter;