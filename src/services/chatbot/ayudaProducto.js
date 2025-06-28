// src/services/chatbot/ayudaProducto.js

const productosService = require("../../modules/productos/services");
const categoriasService = require("../../modules/categorias/services");
const generosService = require("../../modules/generos/services");

async function sugerirDescripcion(nombre, categoriaId) {
  await connectDB();

  // Buscar productos similares en la categoría
  const productos = await productosService.getAllProductos();
  const similares = productos.filter(
    (p) =>
      p.categoriaId === categoriaId &&
      p.nombre &&
      nombre &&
      p.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
  if (similares.length > 0 && similares[0].descripcion) {
    return `Podrías usar una descripción similar a: "${similares[0].descripcion}"`;
  }
  return "Incluí detalles claros del producto, su estado, características y beneficios.";
}

async function sugerirNombre(nombre, categoriaId) {
  // Buscar nombres populares en la categoría
  const productos = await productosService.getAllProductos();
  const similares = productos.filter((p) => p.categoriaId === categoriaId);
  if (similares.length > 0) {
    const nombres = similares.map((p) => p.nombre);
    return `Algunos nombres populares en esta categoría: ${nombres
      .slice(0, 3)
      .join(", ")}.`;
  }
  return "Usá un nombre claro, que incluya marca, modelo y características principales.";
}

async function sugerirPrecio(categoriaId) {
  // Sugerir precio promedio en la categoría
  const productos = await productosService.getAllProductos();
  const deCategoria = productos.filter((p) => p.categoriaId === categoriaId);
  if (deCategoria.length > 0) {
    const precios = deCategoria.map((p) => p.precio);
    const promedio = Math.round(
      precios.reduce((a, b) => a + b, 0) / precios.length
    );
    return `El precio promedio en esta categoría es $${promedio}. Podés ajustar tu precio según el estado y características.`;
  }
  return "No hay suficientes datos para sugerir un precio. Elegí uno competitivo.";
}

function sugerirImagen() {
  return "Usá imágenes claras, de buena calidad, fondo neutro y que muestren el producto desde varios ángulos. Evitá marcas de agua.";
}

async function sugerirCategoria(nombre) {
  const categorias = await categoriasService.getAllCategorias();
  const match = categorias.find(
    (c) =>
      nombre &&
      c.nombre &&
      nombre.toLowerCase().includes(c.nombre.toLowerCase())
  );
  if (match) {
    return `La categoría sugerida es: ${match.nombre}`;
  }
  return "Elegí la categoría que mejor describa el producto. Si tenés dudas, buscá productos similares.";
}

async function sugerirGenero(nombre) {
  const generos = await generosService.getAllGeneros();
  const match = generos.find(
    (g) =>
      nombre &&
      g.nombre &&
      nombre.toLowerCase().includes(g.nombre.toLowerCase())
  );
  if (match) {
    return `El género sugerido es: ${match.nombre}`;
  }
  return "Asigná el género que mejor corresponda al producto. Si no aplica, podés dejarlo sin género.";
}

module.exports = {
  sugerirDescripcion,
  sugerirNombre,
  sugerirPrecio,
  sugerirImagen,
  sugerirCategoria,
  sugerirGenero,
};
