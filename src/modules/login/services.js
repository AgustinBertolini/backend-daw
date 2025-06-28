const mongoose = require("mongoose");
const crypto = require("crypto");
const Usuario = require("../usuarios/models/usuario.model");
const authService = require("../auth/services");

async function login(email, password) {
  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  const user = await Usuario.findOne({ email, password: hashedPassword });
  if (!user) {
    return { statusCode: 401, body: "Email o contraseña incorrectos" };
  }
  const token = await authService.createToken(user._id);
  return { statusCode: 200, body: JSON.stringify({ token, userId: user._id }) };
}

async function refreshToken(oldToken) {
  const result = await authService.verifyTokenInDB(oldToken);
  if (!result.valid) {
    return { statusCode: 401, body: result.message };
  }
  // Verificar si el token está expirado
  const jwt = require("jsonwebtoken");
  const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_predeterminada";
  try {
    jwt.verify(oldToken, SECRET_KEY);
    // Si no lanza error, el token aún es válido, no se debe refrescar
    return {
      statusCode: 400,
      body: "El token aún es válido, no se puede refrescar",
    };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // Token expirado, crear uno nuevo
      const newToken = await authService.createToken(result.userId);
      return {
        statusCode: 200,
        body: JSON.stringify({ token: newToken, userId: result.userId }),
      };
    }
    return { statusCode: 401, body: "Token inválido" };
  }
}

module.exports = { login, refreshToken };
