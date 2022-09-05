import express from 'express';
const usuariosRouter = express.Router();

import { postUsuario, getUsuarioByCpf, getAllUsuarios, login } from '../controller/usuarioController.js';

usuariosRouter.post('/usuario/novo', postUsuario);
usuariosRouter.get('/usuario/todos', getAllUsuarios);
usuariosRouter.get('/usuario/cpf/:cpf', getUsuarioByCpf);
usuariosRouter.post('/usuario/login', login);

export default usuariosRouter;