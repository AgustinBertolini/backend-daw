// src/services/chatbot/ayudaProductoController.js
const ayuda = require("./ayudaProducto");

async function responderAyudaProducto({ tipo, nombre, categoriaId }) {
  await connectDB();

  switch (tipo) {
    case "descripcion":
      return await ayuda.sugerirDescripcion(nombre, categoriaId);
    case "nombre":
      return await ayuda.sugerirNombre(nombre, categoriaId);
    case "precio":
      return await ayuda.sugerirPrecio(categoriaId);
    case "imagen":
      return ayuda.sugerirImagen();
    case "categoria":
      return await ayuda.sugerirCategoria(nombre);
    case "genero":
      return await ayuda.sugerirGenero(nombre);
    default:
      return "No entiendo la consulta. Podés pedir sugerencias de nombre, descripción, precio, imagen, categoría o género.";
  }
}

function clasificarAyudaProductoInput(input) {
  input = input.toLowerCase();
  // Descripción
  if (
    /descripci[oó]n|cómo describo|qué poner en la descrip|cómo detallo|cómo redacto|cómo explico|cómo presento|cómo escribir/i.test(
      input
    )
  )
    return "descripcion";
  // Nombre
  if (
    /nombre|cómo llamar|cómo titular|qué nombre|cómo lo llamo|cómo se llama|cómo nombrar|cómo ponerle nombre|título/i.test(
      input
    )
  )
    return "nombre";
  // Precio
  if (
    /precio|cu[aá]nto cobrar|valor|cu[aá]nto vale|qué precio|cu[aá]nto cuesta|cu[aá]nto pedir|precio sugerido|precio recomendado|precio ideal|precio promedio/i.test(
      input
    )
  )
    return "precio";
  // Imagen
  if (
    /imagen|foto|fotograf[ií]a|tipo de imagen|foto conviene|qué foto|qué imagen|cómo sacar foto|cómo debe ser la imagen|mejor imagen|mejor foto/i.test(
      input
    )
  )
    return "imagen";
  // Categoría
  if (
    /categor[ií]a|a qu[eé] categor[ií]a|d[oó]nde lo pongo|en qu[eé] categor[ií]a|qué rubro|qué sección|dentro de qu[eé] grupo|dentro de qu[eé] categor[ií]a|cómo clasificar|cómo agrupar/i.test(
      input
    )
  )
    return "categoria";
  // Género
  if (
    /g[eé]nero|a qu[eé] g[eé]nero|corresponde g[eé]nero|qué g[eé]nero|para qu[eé] g[eé]nero|masculino|femenino|unisex|niños|adultos|dama|caballero/i.test(
      input
    )
  )
    return "genero";
  return null;
}

module.exports = { responderAyudaProducto, clasificarAyudaProductoInput };
