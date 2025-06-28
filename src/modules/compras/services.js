const Compra = require("./models/compra.model");
require("../usuarios/models/usuario.model");
require("../productos/models/producto.model");
require("../categorias/models/categoria.model");
require("../generos/models/genero.model");
const Producto = require("../productos/models/producto.model");

async function getAllCompras(userId) {
  // Devuelve solo las compras del usuario autenticado, ordenadas de más nuevo a más viejo
  return await Compra.find({ usuario: userId })
    .sort({ fechaCreacion: -1 })
    .populate("usuario")
    .populate({
      path: "productos.producto",
      populate: [{ path: "categoria" }, { path: "genero" }],
    });
}

async function getCompraById(id, userId) {
  // Devuelve solo la compra si pertenece al usuario autenticado
  return await Compra.findOne({ _id: id, usuario: userId })
    .populate("usuario")
    .populate({
      path: "productos.producto",
      populate: [{ path: "categoria" }, { path: "genero" }],
    });
}

async function createCompra(data) {
  // Restar stock de los productos antes de crear la compra
  for (const item of data.productos) {
    await Producto.findByIdAndUpdate(
      item.producto,
      { $inc: { stock: -item.cantidad } },
      { new: true }
    );
  }
  return await Compra.create({ ...data, estado: "" });
}

async function updateCompra(id, data) {
  return await Compra.findByIdAndUpdate(id, data, { new: true });
}

async function deleteCompra(id) {
  return await Compra.findByIdAndDelete(id);
}

module.exports = {
  getAllCompras,
  getCompraById,
  createCompra,
  updateCompra,
  deleteCompra,
};
