const connectDB = require("../../config/db");
const compraService = require("./services");
const verifyToken = require("../../config/auth");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

exports.main = async (event, context) => {
  await connectDB();
  // Verificar autenticación antes de cualquier acción
  const authResult = await verifyToken(event);
  if (authResult && authResult.statusCode)
    return { ...authResult, headers: corsHeaders };
  const userId = authResult.userId;

  const { httpMethod, pathParameters, body } = event;
  try {
    switch (httpMethod) {
      case "GET":
        if (pathParameters && pathParameters.id) {
          const compra = await compraService.getCompraById(
            pathParameters.id,
            userId
          );
          if (!compra)
            return {
              statusCode: 404,
              body: "No encontrado",
              headers: corsHeaders,
            };
          return {
            statusCode: 200,
            body: JSON.stringify(compra),
            headers: corsHeaders,
          };
        } else {
          const compras = await compraService.getAllCompras(userId);
          return {
            statusCode: 200,
            body: JSON.stringify(compras),
            headers: corsHeaders,
          };
        }
      case "POST":
        const nuevo = await compraService.createCompra(JSON.parse(body));
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
        const actualizado = await compraService.updateCompra(
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
        const eliminado = await compraService.deleteCompra(pathParameters.id);
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
