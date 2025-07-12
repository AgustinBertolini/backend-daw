const Producto = require("./models/producto.model");
require("../usuarios/models/usuario.model");
require("../categorias/models/categoria.model");
require("../generos/models/genero.model");

async function getAllProductos() {
  const response = await Producto.find({ activo: true })
    .populate("categoria")
    .populate("usuario")
    .populate("genero");
  console.log("Productos encontrados:", response.length);
  return response;
}

async function getProductoById(id) {
  return await Producto.findById(id)
    .populate("categoria")
    .populate("usuario")
    .populate("genero");
}

async function createProducto(data, userId) {
  return await Producto.create({ ...data, usuario: userId });
}

async function updateProducto(id, data) {
  if (typeof data.stock === "number" && data.stock > 0) {
    data.activo = true;
  }
  return await Producto.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProducto(id) {
  return await Producto.findByIdAndUpdate(id, { activo: false }, { new: true });
}

async function getProductosByUser(userId) {
  return await Producto.find({ usuario: userId })
    .populate("categoria")
    .populate("usuario")
    .populate("genero");
}

module.exports = {
  getAllProductos,
  getProductosByUser,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
