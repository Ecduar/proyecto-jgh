# Cátedra Dr. José Gregorio Hernández

Aplicación web dedicada al Beato José Gregorio Hernández, desarrollada con HTML, CSS, JavaScript, Node.js, Express y MongoDB.

## Descripción

Sistema web interactivo que permite a los usuarios conocer la vida y obra del Dr. José Gregorio Hernández, participar en encuestas, enviar mensajes de contacto y acceder a contenido educativo sobre el médico de los pobres.

## Características

- Sistema de autenticación con JWT
- Formulario de contacto con validación
- Buscador de contenidos dinámico
- Sistema de encuestas
- Interfaz responsive con animaciones
- Medidas de seguridad implementadas
- Diseño adaptable a dispositivos móviles

## Tecnologías Utilizadas

### Frontend

- HTML5
- CSS3 (Animaciones y Flexbox)
- JavaScript (ES6+)
- Fetch API

### Backend

- Node.js v18+
- Express.js
- MongoDB (NoSQL)
- Mongoose ODM
- JWT para autenticación
- Bcrypt para encriptación

### Seguridad

- Helmet
- CORS
- Express Rate Limit
- Mongo Sanitize

## Instalación

### Prerrequisitos

- Node.js 18.x o superior
- NPM 9.x o superior
- Cuenta en MongoDB Atlas (gratis)

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/ecduar/catedra-jose-gregorio.git
cd catedra-jose-gregorio

---
 ## Uso
Usuarios de Prueba
Administrador:

Email: admin@catedra.com
Password: admin123
Usuario:

Email: usuario@test.com
Password: usuario123
Endpoints Principales
text

POST   /api/auth/registro        - Registrar usuario
POST   /api/auth/login           - Iniciar sesión
GET    /api/contenidos           - Obtener contenidos
GET    /api/contenidos/buscar    - Buscar contenidos
POST   /api/contactos            - Enviar contacto
GET    /api/encuestas            - Obtener encuestas

 ##   Seguridad
Autenticación JWT
Contraseñas encriptadas con bcrypt
Rate limiting (100 req/15min)
Sanitización de datos
Headers de seguridad con Helmet
Control CORS

##    Documentación
Manual Técnico: Ver carpeta docs/
API Docs: http://localhost:5000/api-docs

### Scripts Disponibles
npm start          # Iniciar en producción
npm run dev        # Iniciar en desarrollo
node seed.js       # Poblar base de datos
node test-db.js    # Probar conexión a MongoDB


# Participante

Ecduar Estrada – [@ecduar](https://github.com/Ecduar)
```
