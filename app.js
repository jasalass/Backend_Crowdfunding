//Importar dependencias
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Importar rutas
import authRoutes from './routes/auth.routes.js'
import campaniasRoutes from './routes/campania.routes.js'
import aportesRoutes from './routes/aportes.routes.js'

//Iniciar dotenv
dotenv.config();

//Iniciar Express
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas

app.use('/api/auth',authRoutes);
app.use('/api/campanias', campaniasRoutes);
app.use('/api/aportes', aportesRoutes)

//Conexión a mongoDB

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(process.env.port || 3000, () =>
    console.log(`🚀 Servidor en http://localhost:${process.env.PORT || 3000}`))
})
.catch(err => console.log('❌ Error de conexión:', err))
