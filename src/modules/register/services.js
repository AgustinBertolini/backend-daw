const crypto = require("crypto");
const Usuario = require("../usuarios/models/usuario.model");
const authService = require("../auth/services");

async function register({ email, password, nombre, apellido, ...rest }) {
  // Verificar si el usuario ya existe
  const exists = await Usuario.findOne({ email });
  if (exists) {
    return { statusCode: 409, body: "El email ya está registrado" };
  }
  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  const user = await Usuario.create({
    email,
    password: hashedPassword,
    nombre,
    apellido,
    ...rest,
  });
  const token = await authService.createToken(user._id);
  return { statusCode: 201, body: JSON.stringify({ token, userId: user._id }) };
}

module.exports = { register };
