const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genero",
    required: false,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagenBase64: {
    type: String,
    required: false,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  avatarId: {
    type: String,
    required: false,
  },
  activo: {
    type: Boolean,
    default: true,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Producto", productoSchema);
