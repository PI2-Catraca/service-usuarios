import express from 'express';
const usuariosRouter = express.Router();

import { postUsuario, getUsuarioByCpf, getAllUsuarios } from '../controller/usuarioController.js';

usuariosRouter.post('/usuario/novo', postUsuario);
usuariosRouter.get('/usuario/todos', getAllUsuarios);
usuariosRouter.get('/usuario/cpf/:cpf', getUsuarioByCpf);

export default usuariosRouter;