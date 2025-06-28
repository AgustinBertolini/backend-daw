// src/services/chatbot/index.js
const { responderPregunta } = require("./chatbot");
const { responderAyudaProducto } = require("./ayudaProductoController");

module.exports = { responderPregunta, responderAyudaProducto };
