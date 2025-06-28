const mongoose = require("mongoose");

const compraSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  envio: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ["Pendiente", "En camino", "Completada", "Cancelada"],
    default: "Pendiente",
  },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Compra", compraSchema);
