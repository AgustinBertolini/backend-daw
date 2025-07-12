const Compra = require("./models/compra.model");
require("../usuarios/models/usuario.model");
require("../productos/models/producto.model");
require("../categorias/models/categoria.model");
require("../generos/models/genero.model");
const Producto = require("../productos/models/producto.model");
const Usuario = require("../usuarios/models/usuario.model");
const { sendCompraConfirmation } = require("../../utils/email");

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
    const productoActualizado = await Producto.findByIdAndUpdate(
      item.producto,
      { $inc: { stock: -item.cantidad } },
      { new: true }
    );
    // Si el stock llega a 0, poner activo en false
    if (productoActualizado && productoActualizado.stock <= 0) {
      await Producto.findByIdAndUpdate(item.producto, { activo: false });
    }
  }
  // Si no viene estado, usar el default del schema
  const compraData = { ...data };
  if (!compraData.estado) delete compraData.estado;
  const compra = await Compra.create(compraData);

  console.log("data usuario", data.usuario);
  // Buscar usuario y enviar email
  const usuario = await Usuario.findById(data.usuario);
  if (usuario && usuario.email) {
    await sendCompraConfirmation(usuario.email, compra);
  }
  return compra;
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
