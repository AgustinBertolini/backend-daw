const Usuario = require("./models/usuario.model");
const crypto = require("crypto");

async function getAllUsuarios() {
  return await Usuario.find();
}

async function getUsuarioById(id) {
  return await Usuario.findById(id);
}

async function createUsuario(data) {
  console.log("Creando usuario con datos:", data);
  if (data.password) {
    data.password = crypto
      .createHash("md5")
      .update(data.password)
      .digest("hex");
  }

  if (!data.activo) {
    data.activo = true;
  }
  if (!data.fechaCreacion) {
    data.fechaCreacion = new Date();
  }
  if (!data.fechaActualizacion) {
    data.fechaActualizacion = new Date();
  }

  return await Usuario.create(data);
}

async function updateUsuario(id, data) {
  return await Usuario.findByIdAndUpdate(id, data, { new: true });
}

async function deleteUsuario(id) {
  return await Usuario.findByIdAndDelete(id);
}

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
