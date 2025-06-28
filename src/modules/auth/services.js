const jwt = require("jsonwebtoken");
const AuthToken = require("./token.model");

const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_predeterminada";
const TOKEN_EXPIRATION = "1h";

// Crea un JWT, lo guarda en MongoDB y retorna el token
async function createToken(userId) {
  const token = jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRATION,
  });
  await AuthToken.create({ token, userId });
  return token;
}

// Verifica si el token existe en la base y no está expirado, retorna userId si es válido
async function verifyTokenInDB(token) {
  const record = await AuthToken.findOne({ token });
  if (!record)
    return { valid: false, statusCode: 401, message: "Token no encontrado" };
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return { valid: true, userId: payload.userId };
  } catch (err) {
    return {
      valid: false,
      statusCode: 401,
      message: "Token inválido o expirado",
    };
  }
}

// Solo verifica si el token es válido (sin consultar la base)
function verifyToken(token) {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return { valid: true, userId: payload.userId };
  } catch (err) {
    return {
      valid: false,
      statusCode: 401,
      message: "Token inválido o expirado",
    };
  }
}

module.exports = {
  createToken,
  verifyTokenInDB,
  verifyToken,
};
