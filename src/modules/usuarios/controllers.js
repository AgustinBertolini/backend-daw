const connectDB = require("../../config/db");
const usuarioService = require("./services");
const verifyToken = require("../../config/auth");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
};

exports.main = async (event, context) => {
  await connectDB();
  const { httpMethod, pathParameters, body } = event;

  // Solo requiere autenticación para métodos distintos de POST
  if (httpMethod !== "POST") {
    const authResult = await verifyToken(event);
    if (authResult && authResult.statusCode)
      return { ...authResult, headers: corsHeaders };
  }

  try {
    switch (httpMethod) {
      case "GET":
        if (pathParameters && pathParameters.id) {
          const usuario = await usuarioService.getUsuarioById(
            pathParameters.id
          );
          if (!usuario)
            return {
              statusCode: 404,
              body: "No encontrado",
              headers: corsHeaders,
            };
          return {
            statusCode: 200,
            body: JSON.stringify(usuario),
            headers: corsHeaders,
          };
        } else {
          const usuarios = await usuarioService.getAllUsuarios();
          return {
            statusCode: 200,
            body: JSON.stringify(usuarios),
            headers: corsHeaders,
          };
        }
      case "POST":
        const nuevo = await usuarioService.createUsuario(JSON.parse(body));
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
        const actualizado = await usuarioService.updateUsuario(
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
        const eliminado = await usuarioService.deleteUsuario(pathParameters.id);
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
