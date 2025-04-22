# 🏃‍♂️ EventoPro – Gestión de Eventos Deportivos

**EventoPro** es una aplicación fullstack construida con **Vite + JavaScript** en el frontend y **Node.js + Express + MongoDB** en el backend. Permite a los usuarios registrarse, iniciar sesión, crear eventos, asistir o cancelar su asistencia, y visualizar eventos disponibles.

---

## 🚀 Tecnologías utilizadas

### 🔧 Backend

- Express
- MongoDB + Mongoose
- Bcrypt
- JSON Web Token (JWT)
- dotenv
- cors
- nodemon

### 🎨 Frontend

- Vite + JavaScript
- SPA con rutas dinámicas
- Cloudinary (para subir imágenes)

---

## ✨ Funcionalidades principales

- Registro e inicio de sesión con token JWT
- Autenticación y rutas protegidas
- Crear nuevos eventos desde el frontend
- Subida de banners de eventos a Cloudinary
- Ver lista de eventos (ordenados por fecha)
- Asistir o cancelar asistencia a eventos
- Página de favoritos con eventos en los que participas
- Diseño responsive y enfoque deportivo
- Feedback visual para el usuario en todas las acciones

---

## 🗂 Estructura del proyecto

```
Proyecto10/
├── Backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middlewares/
│       ├── config/
│       └── app.js
├── Frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       ├── router/
│       └── main.js
```

---

## 🔐 Variables de entorno necesarias

En el archivo `.env` del backend:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

---

## 🔄 Scripts

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 📸 Subida de imágenes

Las imágenes se suben a **Cloudinary** usando un upload preset sin firmar. Solo necesitas:

- `cloud name`: `degsfs6qs`
- `upload preset`: `evento_upload`

---

## 🔗 Enlaces de despliegue

- 🔙 **Backend en Render**: _pendiente_
- 🌐 **Frontend en Vercel**: _pendiente_

---

## 📬 Autor

**Pau Palacios Gordillo**  
💻 Proyecto FullStack – Abril 2025

---
