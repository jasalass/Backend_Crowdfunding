import mongoose from "mongoose";

const aportesSchema = new mongoose.Schema({
    campaniaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campania',
        required: true
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    monto: {
        type: Number,
        required: true,
        min: 1000
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Aportes', aportesSchema);

