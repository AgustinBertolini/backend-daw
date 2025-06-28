const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: Number, required: false },
  activo: { type: Boolean, default: true, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
