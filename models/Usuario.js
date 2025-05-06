import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['creador', 'usuario'],
        required: true
    }
});

export default mongoose.model('Usuario', usuarioSchema);