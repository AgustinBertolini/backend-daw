const jwt = require("jsonwebtoken");
const authService = require("../modules/auth/services");

const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_predeterminada";

/**
 * Middleware para verificar el Bearer Token en el header Authorization y en la base de datos.
 * @param {Object} event - El evento recibido por el controller (AWS Lambda style).
 * @returns {Promise<Object|null>} - Devuelve info del token si es válido, o un objeto de error si no lo es.
 */
async function verifyToken(event) {
  const authHeader =
    event.headers &&
    (event.headers.Authorization || event.headers.authorization);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { statusCode: 401, body: "Token de autenticación requerido" };
  }
  const token = authHeader.split(" ")[1];
  // Validar token en la base de datos
  const result = await authService.verifyTokenInDB(token);
  if (!result.valid) {
    return { statusCode: 401, body: result.message };
  }
  // Si es válido, puedes devolver info del token
  return { userId: result.userId, token };
}

module.exports = verifyToken;
