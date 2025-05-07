import Aportes from '../models/Aportes.js';
import Campanias from '../models/Campania.js';

export const realizarAporte = async (req, res) => {
  const { campaniaId, monto } = req.body;
  const usuarioId = req.usuario.id;

  try {
    // Validar que exista la campaña
const campania = await Campanias.findById(campaniaId).lean();
if (!campania) {
  return res.status(404).json({ error: 'Campaña no encontrada' });
}

// Validar monto mínimo
if (!monto || monto < 1000) {
  return res.status(400).json({ error: 'El aporte debe ser de al menos $1.000' });
}

// Crear aporte
const aporte = new Aportes({
  campaniaId,
  usuarioId,
  monto
});

await aporte.save();

// Actualizar recaudado usando $inc
await Campanias.updateOne(
  { _id: campaniaId },
  { $inc: { recaudado: monto } }
);

res.status(201).json({ mensaje: 'Aporte registrado exitosamente' });

  } catch (err) {
    console.error("Error al registrar aporte:", err.message);
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Error al procesar el aporte' });
  }
  
};
