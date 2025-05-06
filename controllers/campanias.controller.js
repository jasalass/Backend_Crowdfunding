import Campania from '../models/Campania.js';

export const crearCampania = async (req, res) => {
  const { titulo, descripcion, meta, fechaLimite } = req.body;

  try {
    const nueva = new Campania({
      titulo,
      descripcion,
      meta,
      fechaLimite,
      creador: req.usuario.id,
      recaudado: 0
    });

    await nueva.save();

    res.status(201).json({ mensaje: "Campaña creada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la campaña" });
  }
};
