import Aportes from '../models/Aportes.js';
import Campanias from '../models/Campania.js';

export const realizarAporte = async (req, res) => {
  const { campaniaId, monto } = req.body;
  const usuarioId = req.usuario.id;

  try {
    // Validar campaña
    const campania = await Campanias.findById(campaniaId);
    if (!campania) {
      return res.status(404).json({ error: 'Campaña no encontrada' });
    }

    // Validar monto mínimo
    if (!monto || monto < 1000) {
      return res.status(400).json({ error: 'El aporte debe ser de al menos $1.000' });
    }

    // Crear aporte
    const aporte = new Aporte({
      campaniaId,
      usuarioId,
      monto
    });

    await aporte.save();

    // Actualizar recaudado en campaña
    campania.recaudado += monto;
    await campania.save();

    res.status(201).json({ mensaje: 'Aporte registrado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al procesar el aporte' });
  }
};
