const Producto = require("./models/producto.model");
require("../usuarios/models/usuario.model");
require("../categorias/models/categoria.model");
require("../generos/models/genero.model");

async function getAllProductos() {
  // Devuelve los productos con info de categoria, usuario y genero
  const response = await Producto.find()
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
  // Asigna el usuario autenticado al producto
  return await Producto.create({ ...data, usuario: userId });
}

async function updateProducto(id, data) {
  return await Producto.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProducto(id) {
  return await Producto.findByIdAndDelete(id);
}

async function getProductosByUser(userId) {
  console.log("Obteniendo productos del usuario:", userId);
  // Devuelve los productos creados por el usuario autenticado
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
