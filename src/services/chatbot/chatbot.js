// src/services/chatbot/chatbot.js

const connectDB = require("../../config/db");
const productosService = require("../../modules/productos/services");
const categoriasService = require("../../modules/categorias/services");

async function responderPregunta(input) {
  input = input.toLowerCase();
  console.log(
    input.match(
      /((producto|art[ií]culo|item) )?m[aá]s barato de (la|el)? ?([\wáéíóúñ]+)/i
    )
  );
  // Buscar si pregunta por el producto más barato de una categoría
  const matchBarato = input.match(
    /((producto|art[ií]culo|item) )?m[aá]s barato de (la|el)? ?([\wáéíóúñ]+)/i
  );

  if (matchBarato) {
    const categoria = matchBarato[4];
    // Buscar la categoría
    const categorias = await categoriasService.getAllCategorias();
    const cat = categorias.find(
      (c) => c.nombre.toLowerCase() === categoria.toLowerCase()
    );
    if (!cat) {
      return `No encontré la categoría "${categoria}". ¿Podés intentar con otro nombre?`;
    }
    // Buscar el producto más barato
    const productos = await productosService.getAllProductos();
    const productosCat = productos.filter(
      (p) => p.categoria && p.categoria.toString() === cat._id.toString()
    );
    if (!productosCat.length) {
      return `No hay productos en la categoría "${cat.nombre}".`;
    }
    const masBarato = productosCat.reduce(
      (min, p) => (p.precio < min.precio ? p : min),
      productosCat[0]
    );
    return `El producto más barato de la categoría "${cat.nombre}" es "${masBarato.nombre}" a $${masBarato.precio}.`;
  }

  // Buscar si pregunta dónde encontrar un producto
  const matchDonde = input.match(
    /d[oó]nde (puedo )?(encontrar|comprar|ver) (el|la|los|las)? ?([\wáéíóúñ ]+)/i
  );
  if (matchDonde) {
    const productoBuscado = matchDonde[4].trim();
    // Buscar productos que coincidan
    const productos = await productosService.getAllProductos();
    const encontrados = productos.filter(
      (p) =>
        p.nombre &&
        p.nombre.toLowerCase().includes(productoBuscado.toLowerCase())
    );
    if (!encontrados.length) {
      return `No encontré productos que coincidan con "${productoBuscado}".`;
    }
    // Simular navegación Mercado Libre
    const p = encontrados[0];
    // Buscar la categoría del producto para mostrar el nombre
    let categoriaNombre = "correspondiente";
    if (p.categoria) {
      const categorias = await categoriasService.getAllCategorias();
      const cat = categorias.find(
        (c) => c._id.toString() === p.categoria.toString()
      );
      if (cat) categoriaNombre = cat.nombre;
    }
    return `Para encontrar "${p.nombre}", seguí estos pasos:\n1. Ingresá a la página principal.\n2. Seleccioná la categoría "${categoriaNombre}".\n3. Buscá el producto por nombre o filtrá por precio.\n4. ¡Listo! Podés ver más detalles y comprar el producto desde ahí.`;
  }

  // Consulta sobre medios de pago
  const matchPago = input.match(
    /(medios|formas) de pago|mercado pago|tarjeta de (cr[eé]dito|d[eé]bito)/i
  );
  if (matchPago) {
    return "Podés pagar con Mercado Pago, tarjeta de crédito o débito. Seleccioná el método que prefieras al finalizar tu compra, igual que en Mercado Libre.";
  }

  return "¡Hola! Podés preguntarme dónde encontrar un producto o cuál es el más barato de una categoría.";
}

exports.main = async (event, context) => {
  try {
    await connectDB();
    const { input } = JSON.parse(event.body || "{}");
    if (!input) {
      return { statusCode: 400, body: "Falta el campo input" };
    }
    const respuesta = await responderPregunta(input);
    return { statusCode: 200, body: JSON.stringify({ respuesta }) };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
