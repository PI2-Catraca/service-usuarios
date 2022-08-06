import express from 'express';
const usuariosRouter = express.Router();

import { postUsuario, getUsuarioByCpf } from '../controller/usuarioController.js';

usuariosRouter.post('/usuario/novo', postUsuario);
usuariosRouter.get('/usuario/:cpf', getUsuarioByCpf);


export default usuariosRouter;