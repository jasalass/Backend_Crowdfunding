import express from 'express';
import { realizarAporte } from '../controllers/aportes.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', verificarToken, realizarAporte);

export default router;
