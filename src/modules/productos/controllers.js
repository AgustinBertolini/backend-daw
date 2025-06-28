const connectDB = require("../../config/db");
const productoService = require("./services");
const verifyToken = require("../../config/auth");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

// Para Serverless, el handler debe ser una función exportada como 'handler' o 'main'.
exports.main = async (event, context) => {
  await connectDB();
  // Verificar autenticación antes de cualquier acción
  const authResult = await verifyToken(event);
  if (authResult && authResult.statusCode)
    return { ...authResult, headers: corsHeaders };

  console.log("Conectando a la base de datos y verificando token...");

  const { httpMethod, pathParameters, body } = event;
  try {
    switch (httpMethod) {
      case "GET":
        if (pathParameters && pathParameters.id) {
          const producto = await productoService.getProductoById(
            pathParameters.id
          );
          if (!producto)
            return {
              statusCode: 404,
              body: "No encontrado",
              headers: corsHeaders,
            };
          return {
            statusCode: 200,
            body: JSON.stringify(producto),
            headers: corsHeaders,
          };
        } else if (
          event.queryStringParameters &&
          event.queryStringParameters.mine === "true"
        ) {
          // Endpoint para ver solo los productos del usuario logeado
          const productos = await productoService.getProductosByUser(
            authResult.userId
          );
          return {
            statusCode: 200,
            body: JSON.stringify(productos),
            headers: corsHeaders,
          };
        } else {
          console.log("Obteniendo todos los productos");
          const productos = await productoService.getAllProductos();
          return {
            statusCode: 200,
            body: JSON.stringify(productos),
            headers: corsHeaders,
          };
        }
      case "POST":
        const nuevo = await productoService.createProducto(
          JSON.parse(body),
          authResult.userId
        );
        return {
          statusCode: 201,
          body: JSON.stringify(nuevo),
          headers: corsHeaders,
        };
      case "PUT":
        if (!pathParameters || !pathParameters.id)
          return {
            statusCode: 400,
            body: "ID requerido",
            headers: corsHeaders,
          };
        const actualizado = await productoService.updateProducto(
          pathParameters.id,
          JSON.parse(body)
        );
        if (!actualizado)
          return {
            statusCode: 404,
            body: "No encontrado",
            headers: corsHeaders,
          };
        return {
          statusCode: 200,
          body: JSON.stringify(actualizado),
          headers: corsHeaders,
        };
      case "DELETE":
        if (!pathParameters || !pathParameters.id)
          return {
            statusCode: 400,
            body: "ID requerido",
            headers: corsHeaders,
          };
        const eliminado = await productoService.deleteProducto(
          pathParameters.id
        );
        if (!eliminado)
          return {
            statusCode: 404,
            body: "No encontrado",
            headers: corsHeaders,
          };
        return { statusCode: 204, headers: corsHeaders };
      case "OPTIONS":
        return { statusCode: 200, headers: corsHeaders };
      default:
        return {
          statusCode: 405,
          body: "Método no permitido",
          headers: corsHeaders,
        };
    }
  } catch (err) {
    return { statusCode: 500, body: err.message, headers: corsHeaders };
  }
};
