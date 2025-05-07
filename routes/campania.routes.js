import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import {
  crearCampania,
  obtenerCampanias,
  obtenerCampaniasPorCreador,
  obtenerCampaniaPorId
} from '../controllers/campanias.controller.js';

const router = express.Router();

// Crear nueva campaña
router.post('/', verificarToken, crearCampania);

// Obtener todas las campañas activas
router.get('/', obtenerCampanias);

// Obtener campañas creadas por el usuario autenticado
router.get('/mias', verificarToken, obtenerCampaniasPorCreador);

// Obtener detalle de campaña por ID
router.get('/:id', obtenerCampaniaPorId);

export default router;
