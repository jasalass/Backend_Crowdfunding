import Campania from '../models/Campania.js';

// Crear una nueva campaña
export const crearCampania = async (req, res) => {
  const { titulo, descripcion, meta, fechaLimite, recompensas } = req.body;

  if (!req.usuario?.id) {
    return res.status(401).json({ error: "No autorizado. Token inválido o faltante." });
  }

  try {
    const nueva = new Campania({
      titulo,
      descripcion,
      meta,
      fechaLimite,
      creador: req.usuario.id,
      recaudado: 0,
      recompensas
    });

    const campaniaGuardada = await nueva.save();

    res.status(201).json({
      mensaje: "Campaña creada exitosamente",
      campania: campaniaGuardada
    });
  } catch (error) {
    console.error("Error al crear campaña:", error);
    res.status(500).json({ error: "Error al crear la campaña" });
  }
};

// Obtener todas las campañas activas
export const obtenerCampanias = async (req, res) => {
  try {
    const campanias = await Campania.find({ estado: 'activa' }).populate('creador', 'nombre correo');
    res.json(campanias);
  } catch (error) {
    console.error("Error al obtener campañas:", error);
    res.status(500).json({ error: "Error al obtener campañas" });
  }
};

// Obtener campañas creadas por el usuario autenticado
export const obtenerCampaniasPorCreador = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const campanias = await Campania.find({ creador: usuarioId });
    res.json(campanias);
  } catch (error) {
    console.error("Error al obtener campañas del creador:", error);
    res.status(500).json({ error: "Error al obtener campañas del creador" });
  }
};

// (Opcional) Obtener detalle de una campaña específica
export const obtenerCampaniaPorId = async (req, res) => {
  try {
    const campania = await Campania.findById(req.params.id).populate('creador', 'nombre correo');
    if (!campania) return res.status(404).json({ mensaje: "Campaña no encontrada" });
    res.json(campania);
  } catch (error) {
    console.error("Error al obtener campaña por ID:", error);
    res.status(500).json({ error: "Error al obtener campaña" });
  }
};
