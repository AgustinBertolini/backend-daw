const mongoose = require("mongoose");

const compraProductoSchema = new mongoose.Schema({
  compra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Compra",
    required: true,
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("CompraProducto", compraProductoSchema);
