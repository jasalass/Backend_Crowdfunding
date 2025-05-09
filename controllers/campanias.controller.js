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

export const obtenerCampanias = async (req, res) => {
  try {
    const campanias = await Campania.find();
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

export const obtenerCampaniaPorId = async (req, res) => {
  try {
    const campania = await Campania.findById(req.params.id);
    if (!campania) {
      return res.status(404).json({ error: 'Campaña no encontrada' });
    }
    res.json(campania);
  } catch (error) {
    console.error("Error al obtener campaña por ID:", error);
    res.status(500).json({ error: 'Error al obtener campaña' });
  }
};


export const eliminarCampania = async (req, res) => {
  try {
    const idCampania = req.params.id;
    const usuarioId = req.usuario.id;

    const campania = await Campania.findById(idCampania);

    if (!campania) return res.status(404).json({ error: "Campaña no encontrada" });

    if (campania.creador.toString() !== usuarioId) {
      return res.status(403).json({ error: "No tienes permisos para eliminar esta campaña" });
    }

    await Campania.findByIdAndDelete(idCampania);
    res.json({ mensaje: "Campaña eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar campaña:", error);
    res.status(500).json({ error: "Error al eliminar la campaña" });
  }
};
