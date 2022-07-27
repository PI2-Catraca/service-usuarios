import express from 'express';
const helloWorldRouter = express.Router();

import { printHelloWorld } from '../controller/hello-worldController.js';

helloWorldRouter.get('/hello', printHelloWorld);

export default helloWorldRouter;