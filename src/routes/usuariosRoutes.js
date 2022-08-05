import express from 'express';
const usuariosRouter = express.Router();

import { postUsuario } from '../controller/usuarioController.js';

usuariosRouter.post('/usuario/novo', postUsuario);

export default usuariosRouter;