import mongoose from "mongoose";


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
    }
},
{
    timestamps: true
});


export default mongoose.model('Campania', campaniaSchema);