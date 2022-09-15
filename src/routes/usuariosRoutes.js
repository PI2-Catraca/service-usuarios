import express from 'express';
import auth from '../middleware/auth.js';
const usuariosRouter = express.Router();

import { postUsuario, getUsuarioByCpf, getAllUsuarios, authUser, deleteUser } from '../controller/usuarioController.js';

usuariosRouter.post('/usuario/novo', postUsuario);
usuariosRouter.get('/usuario/todos', auth, getAllUsuarios);
usuariosRouter.get('/usuario/cpf/:cpf', auth, getUsuarioByCpf);
usuariosRouter.post('/usuario/login', authUser);
usuariosRouter.delete('/usuario/excluir', deleteUser);

export default usuariosRouter;