import Usuario from  '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registrar = async (req, res) => {
    const {nombre, correo, contrasena, rol } = req.body;

    try {
        const existe = await Usuario.findOne({ correo });
        if (existe) return res.status(400).json({error: 'El correo ya está registrado'});

        const hash = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contrasena: hash,
            rol
        });

        await nuevoUsuario.save();

        res.status(201).json({mensaje: 'Usuario creado exitosamente'});
    } catch (err) {
        res.status(500).json({error: 'Error al registrar usuario'});
    }
}

export const login = async (req, res) => {
    const { correo, contrasena } = req.body;
  
    try {
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  
      const valido = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta' });
  
      const token = jwt.sign(
        { id: usuario._id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
  
      res.json({
        token,
        rol: usuario.rol,
        nombre: usuario.nombre
      });
    } catch (err) {
      res.status(500).json({ error: 'Error en login' });
    }
  };