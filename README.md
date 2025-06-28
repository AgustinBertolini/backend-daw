# DAW-backend-API

Este proyecto es una API backend desarrollada para la materia DAW (Desarrollo de Aplicaciones Web). Utiliza Node.js y Serverless Framework para desplegar funciones en AWS Lambda. El sistema gestiona usuarios, autenticación, productos, compras, favoritos, géneros, categorías y un chatbot de ayuda.

## Estructura del Proyecto

- `src/` - Código fuente principal
  - `config/` - Configuración de base de datos y autenticación
  - `modules/` - Módulos de negocio (usuarios, productos, compras, etc.)
  - `services/` - Servicios adicionales (ej: chatbot)
- `handler.js` - Punto de entrada para Serverless
- `serverless.yml` - Configuración de Serverless Framework
- `package.json` - Dependencias y scripts

## Dependencias Principales

- **Node.js** (>=14)
- **Serverless Framework**
- **Express**
- **jsonwebtoken**
- **bcryptjs**
- **mongoose**
- **dotenv**

Revisa `package.json` para la lista completa de dependencias.

## Inicialización del Proyecto

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repo>
   cd backend-daw
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz con las variables necesarias (ejemplo: conexión a MongoDB, claves JWT, etc).

4. **Desplegar localmente**

   Si usas Serverless Offline:

   ```bash
   npx serverless offline
   ```

   O para correr con Node.js directamente (si tienes un script de inicio):

   ```bash
   npm start
   ```

5. **Probar la API**

   Puedes usar la colección Postman incluida: `DAW-backend-API.postman_collection.json`

## Notas

- Asegúrate de tener MongoDB disponible y configurado correctamente.
- El despliegue en AWS Lambda requiere credenciales configuradas para Serverless Framework.

---

Para dudas o problemas, contacta al responsable del proyecto o revisa la documentación de cada módulo en la carpeta `src/modules/`.
