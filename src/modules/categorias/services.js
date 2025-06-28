const Categoria = require("./models/categoria.model");

async function getAllCategorias() {
  console.log("Fetching all categories");
  const reponse = await Categoria.find();
  console.log("Response from database:", reponse);

  return reponse;
}

async function getCategoriaById(id) {
  return await Categoria.findById(id);
}

async function createCategoria(data) {
  return await Categoria.create(data);
}

async function updateCategoria(id, data) {
  return await Categoria.findByIdAndUpdate(id, data, { new: true });
}

async function deleteCategoria(id) {
  return await Categoria.findByIdAndDelete(id);
}

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
