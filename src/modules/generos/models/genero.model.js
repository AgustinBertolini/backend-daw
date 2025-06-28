const mongoose = require("mongoose");

const generoSchema = new mongoose.Schema({
  nombre: {
    type: String,
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

module.exports = mongoose.model("Genero", generoSchema);
