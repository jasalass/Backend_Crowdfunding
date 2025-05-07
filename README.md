# 🧠 Backend Crowdfunding API

Este es el backend del sistema **CrowdfundApp**, una plataforma de financiamiento colaborativo que permite a creadores publicar campañas y a usuarios aportar dinero para apoyar sus ideas.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Dotenv
- CORS
- Bcrypt (si se usa para contraseñas)

---

## 📦 Instalación

```bash
git clone https://github.com/jasalass/Backend_Crowdfunding.git
cd Backend_Crowdfunding
npm install
```

Crea un archivo `.env` en la raíz del proyecto con:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>/<db>
JWT_SECRET=tu_clave_secreta
```

Luego ejecuta el servidor:

```bash
npm run dev
```

---

## 🔐 Autenticación

Se usa JWT. Los endpoints protegidos requieren enviar:

```http
Authorization: Bearer <token>
```

---

## 📘 Rutas principales

### 🔐 Auth

| Método | Ruta               | Descripción              |
|--------|--------------------|--------------------------|
| POST   | /api/auth/login    | Iniciar sesión           |
| POST   | /api/auth/registro | Registrar nuevo usuario  |

---

### 📢 Campañas

| Método | Ruta                    | Descripción                          |
|--------|-------------------------|--------------------------------------|
| GET    | /api/campanias          | Listar campañas activas              |
| GET    | /api/campanias/:id      | Ver detalle de campaña               |
| POST   | /api/campanias          | Crear campaña (requiere token)       |
| GET    | /api/campanias/mias     | Campañas del creador autenticado     |

---

### 💸 Aportes

| Método | Ruta           | Descripción                            |
|--------|----------------|-----------------------------------------|
| POST   | /api/aportes   | Registrar un aporte (requiere token)    |

---

## ✅ Validaciones clave

- Monto mínimo de aporte: $1.000 CLP
- El `recaudado` de la campaña se actualiza automáticamente
- Solo creadores pueden acceder a sus propias campañas

---

## 📂 Estructura del proyecto

```
Backend_Crowdfunding/
├── controllers/
│   ├── auth.controller.js
│   ├── campanias.controller.js
│   └── aportes.controller.js
├── models/
│   ├── Usuario.js
│   ├── Campania.js
│   └── Aportes.js
├── routes/
│   ├── auth.routes.js
│   ├── campanias.routes.js
│   └── aportes.routes.js
├── middlewares/
│   └── auth.middleware.js
├── .env
├── index.js
└── package.json
```

---

## 👤 Autor

**Juan Salas Salas**  
GitHub: [@jasalass](https://github.com/jasalass)

---

## 📝 Licencia

MIT
