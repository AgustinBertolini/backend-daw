const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Categoria", categoriaSchema);
