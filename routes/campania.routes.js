import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { crearCampania } from '../controllers/campanias.controller.js';

const router = express.Router();

router.post('/', verificarToken, crearCampania);

export default router;
