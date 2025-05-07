import mongoose from "mongoose";

const recompensaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  montoMinimo: {
    type: Number,
    required: true
  }
}, { _id: false });

const campaniaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  meta: {
    type: Number,
    required: true
  },
  fechaLimite: {
    type: Date,
    required: true
  },
  recaudado: {
    type: Number,
    default: 0
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recompensas: {
    type: [recompensaSchema],
    default: []
  },
  estado: {
    type: String,
    enum: ['activa', 'finalizada', 'cancelada'],
    default: 'activa'
  }
}, {
  timestamps: true
});

campaniaSchema.pre('validate', function (next) {
    if (!this.creador) {
      console.trace("⛔ Se intentó validar una Campania sin 'creador':", this);
    }
    next();
  });
  
  export default mongoose.models.Campania || mongoose.model('Campania', campaniaSchema);

