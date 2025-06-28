const Genero = require("./models/genero.model");

async function getAllGeneros() {
  return await Genero.find();
}

async function getGeneroById(id) {
  return await Genero.findById(id);
}

async function createGenero(data) {
  return await Genero.create(data);
}

async function updateGenero(id, data) {
  return await Genero.findByIdAndUpdate(id, data, { new: true });
}

async function deleteGenero(id) {
  return await Genero.findByIdAndDelete(id);
}

module.exports = {
  getAllGeneros,
  getGeneroById,
  createGenero,
  updateGenero,
  deleteGenero,
};
