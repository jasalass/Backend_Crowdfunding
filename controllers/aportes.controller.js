import Aportes from '../models/Aportes.js';
import Campanias from '../models/Campania.js';

export const realizarAporte = async (req, res) => {
  const { campaniaId, monto } = req.body;
  const usuarioId = req.usuario.id;

  try {
    // Validar que exista la campaña
    const campania = await Campanias.findById(campaniaId);
    if (!campania) {
      return res.status(404).json({ error: 'Campaña no encontrada' });
    }

    // Validar monto mínimo
    if (!monto || monto < 1000) {
      return res.status(400).json({ error: 'El aporte debe ser de al menos $1.000' });
    }

    // Crear el documento de aporte
    const nuevoAporte = new Aportes({
      campaniaId,
      usuarioId,
      monto
    });

    await nuevoAporte.save();

    // Actualizar recaudado en la campaña
    campania.recaudado += monto;
    await campania.save();

    res.status(201).json({ mensaje: 'Aporte registrado exitosamente' });
  } catch (err) {
    console.error("Error al registrar aporte:", err);
    res.status(500).json({ error: 'Error al procesar el aporte' });
  }
};
