const Favorito = require("./models/favorito.model");
require("../usuarios/models/usuario.model");
require("../productos/models/producto.model");
require("../categorias/models/categoria.model");
require("../generos/models/genero.model");

async function getAllFavoritos(userId) {
  // Trae solo los favoritos del usuario autenticado y popula producto, categoria y genero
  return await Favorito.find({ usuario: userId })
    .populate("usuario")
    .populate({
      path: "producto",
      populate: [{ path: "categoria" }, { path: "genero" }],
    });
}

async function getFavoritoById(id, userId) {
  // Trae solo el favorito si pertenece al usuario autenticado y popula producto, categoria y genero
  return await Favorito.findOne({ _id: id, usuario: userId })
    .populate("usuario")
    .populate({
      path: "producto",
      populate: [{ path: "categoria" }, { path: "genero" }],
    });
}

async function createFavorito(data) {
  return await Favorito.create(data);
}

async function updateFavorito(id, data) {
  return await Favorito.findByIdAndUpdate(id, data, { new: true });
}

async function deleteFavorito(id) {
  return await Favorito.findByIdAndDelete(id);
}

module.exports = {
  getAllFavoritos,
  getFavoritoById,
  createFavorito,
  updateFavorito,
  deleteFavorito,
};
